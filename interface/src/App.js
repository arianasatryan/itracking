import React, { useState } from 'react';
import './assets/styles/index.css'; 
import './assets/styles/player.css'; 
import ImageUploader from './ImageUploader';
import VideoUploader from './VideoUploader';
import ModelOptions from './ModelOptions';
import DisplayOptions from './DisplayOptions';

function App() {
  // State variables for active model and options
  const [activeModel, setActiveModel] = useState('Face'); // Set default model to 'Face'
  const [activeOptions, setActiveOptions] = useState(['Boxes', 'Keypoints']); // Set both options checked by default
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleModelChange = (event) => {
    setActiveModel(event.target.value);
  };

  return (
    <div className="container">
      <div className="uploaders">
        <ImageUploader activeModel={activeModel} activeOptions={activeOptions} setUploadedImage={setUploadedImage} />
        <VideoUploader activeModel={activeModel} activeOptions={activeOptions} />
        <div className="configurations">
          <ModelOptions selectedModel={activeModel} handleModelChange={handleModelChange} />
          <DisplayOptions setActiveOptions={setActiveOptions} />
        </div>
      </div>
      {uploadedImage && (
        <div className="uploaded-image-container">
          <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />
        </div>
      )}
    </div>
  );
}

export default App;