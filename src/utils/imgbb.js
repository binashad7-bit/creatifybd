const IMGBB_API_KEY = "eda81cb1f9007c7c706b52672a231770";

/**
 * Uploads an image to ImgBB with progress tracking.
 * @param {File} file - The image file to upload.
 * @param {Function} onProgress - Callback for upload progress (0 to 100).
 */
export const uploadImage = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('image', file);

    const xhr = new XMLHttpRequest();
    
    // Track upload progress
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
    xhr.addEventListener('abort', () => reject(new Error('Upload aborted')));

    xhr.open('POST', `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`);
    xhr.send(formData);
  });
};
