import imageCompression from 'browser-image-compression';

const IMGBB_API_KEY = "eda81cb1f9007c7c706b52672a231770";

/**
 * Uploads an image to ImgBB with smart compression and progress tracking.
 * @param {File} file - The image file to upload.
 * @param {Function} onProgress - Callback for upload progress (0 to 100).
 */
export const uploadImage = async (file, onProgress) => {
  let fileToUpload = file;

  // Smart Compression Logic
  // If file > 5MB, we compress it to ensure "smooth" upload and avoid ImgBB errors
  if (file.size > 5 * 1024 * 1024) {
    const options = {
      maxSizeMB: 4, // Target max size
      maxWidthOrHeight: 4096, // Keep high resolution
      useWebWorker: true,
      fileType: file.type // Try to preserve original type (PNG stays PNG)
    };
    try {
      fileToUpload = await imageCompression(file, options);
    } catch (error) {
      console.warn('Compression failed, uploading original file:', error);
    }
  }

  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('image', fileToUpload);

    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        const percentComplete = Math.round((e.loaded / e.total) * 100);
        onProgress(percentComplete);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          if (response.success) {
            resolve(response.data.url);
          } else {
            reject(new Error(response.error.message || 'Upload failed'));
          }
        } catch (err) {
          reject(new Error('Invalid response from server'));
        }
      } else {
        reject(new Error(`Server returned status ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => reject(new Error('Network error')));
    xhr.open('POST', `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`);
    xhr.send(formData);
  });
};
