const IMGBB_API_KEY = "eda81cb1f9007c7c706b52672a231770";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return data.data.url; // Returns the full resolution URL
    } else {
      throw new Error(data.error.message || 'Image upload failed');
    }
  } catch (error) {
    console.error('ImgBB Upload Error:', error);
    throw error;
  }
};
