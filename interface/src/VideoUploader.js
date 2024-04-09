// VideoUploader.js
import React, { useState } from 'react';
import './assets/styles/cards.css'; 

const VideoUploader = ({ activeModel, activeOptions }) => {
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

      const response = await fetch('/upload/video', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.blob();
        // Handle successful response
      } else {
        // Handle error response
      }
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="video-card">
      <h3>Upload a Video</h3>
      <div className="drop_box">
        <header>
          <h4>Select Video here</h4>
        </header>
        <p>Formats: asf, avi, m4v, mkv, mov, mp4, mpeg, mpg, ts, wmv, webm</p>
        <input type="file" accept=".asf, .avi, .m4v, .mkv, .mov, .mp4, .mpeg, .mpg, .ts, .wmv, .webm" id="videoFileInput" style={{ display: 'none' }} onChange={handleFileChange} />
        <label htmlFor="videoFileInput" className="custom-file-upload" id="chooseVideoButton">Choose Video</label>
      </div>
    </div>
  );
}

export default VideoUploader;
