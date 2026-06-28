import imageCompression from 'browser-image-compression';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase/config';

/**
 * Uploads an image to Firebase Storage with smart compression and progress tracking.
 * @param {File} file - The image file to upload.
 * @param {Function} onProgress - Callback for upload progress (0 to 100).
 */
export const uploadImage = async (file, onProgress) => {
  let fileToUpload = file;

  // Smart Compression Logic
  // If file > 5MB, we compress it to ensure "smooth" upload and avoid ImgBB errors
  if (file.size > 5 * 1024 * 1024) {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 2400,
      useWebWorker: true,
      fileType: file.type
    };
    try {
      fileToUpload = await imageCompression(file, options);
    } catch (error) {
      console.warn('Compression failed, uploading original file:', error);
    }
  }

  const extension = fileToUpload.name.split('.').pop() || 'jpg';
  const safeName = fileToUpload.name
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9-_]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase() || 'image';
  const uniqueId = `${Date.now()}-${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}`;
  const storageRef = ref(storage, `uploads/${uniqueId}-${safeName}.${extension}`);

  return new Promise((resolve, reject) => {
    const task = uploadBytesResumable(storageRef, fileToUpload, {
      contentType: fileToUpload.type || 'image/jpeg',
      customMetadata: {
        originalName: file.name
      }
    });

    task.on(
      'state_changed',
      (snapshot) => {
        if (onProgress) {
          const percentComplete = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          onProgress(percentComplete);
        }
      },
      (error) => reject(error),
      async () => {
        try {
          resolve(await getDownloadURL(task.snapshot.ref));
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};
