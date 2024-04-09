import React from 'react';
import './assets/styles/options.css'; 

const ModelOptions = ({ selectedModel, handleModelChange }) => {
  return (
    <div className="model-options">
      <h3>Model</h3>
      <div className="option">
        <span>Face Model</span>
        <input 
          type="radio" 
          id="FaceRadio" 
          name="model" 
          className="switch-radio" 
          value="Face" 
          checked={selectedModel === 'Face'} 
          onChange={handleModelChange} 
        />
        <label htmlFor="FaceRadio" className="switch-label"></label>
      </div>
      <div className="option">
        <span>Pose Model</span>
        <input 
          type="radio" 
          id="PoseRadio" 
          name="model" 
          className="switch-radio" 
          value="Pose" 
          checked={selectedModel === 'Pose'} 
          onChange={handleModelChange} 
        />
        <label htmlFor="PoseRadio" className="switch-label"></label>
      </div>
    </div>
  );
}

export default ModelOptions;
