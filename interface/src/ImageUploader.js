// ImageUploader.js
import React, { useState } from 'react';

const ImageUploader = ({ activeModel, activeOptions, setUploadedImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('activeModel', activeModel);
      activeOptions.forEach(option => {
        formData.append('activeOptions', option);
      });

      const response = await fetch('http://localhost:8000/upload/image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.blob();
        const imageUrl = URL.createObjectURL(responseData);
        setUploadedImage(imageUrl);
      } else {
        // Handle error response
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-card">
      <h3>Upload an Image</h3>
      <div className="drop_box">
        <header>
          <h4>Select Image here</h4>
        </header>
        <p>Formats: bmp, dng, jpeg, jpg, mpo, png, tif, tiff, webp, pfm</p>
        <input type="file" accept=".bmp, .dng, .jpeg, .jpg, .mpo, .png, .tif, .tiff, .webp, .pfm" id="imageFileInput" style={{ display: 'none' }} onChange={handleFileChange} />
        <label htmlFor="imageFileInput" className="custom-file-upload" id="chooseImageButton">Choose Image</label>
      </div>
    </div>
  );
}

export default ImageUploader;
