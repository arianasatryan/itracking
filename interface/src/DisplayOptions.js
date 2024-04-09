import React, { useState, useEffect } from 'react';
import './assets/styles/options.css'; 

const DisplayOptions = ({ setActiveOptions }) => {
  // State variables for checkboxes
  const [showBoxes, setShowBoxes] = useState(true);
  const [showKeypoints, setShowKeypoints] = useState(true);

  // Function to handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    if (id === 'BoxesCheckbox') {
      setShowBoxes(checked);
    } else if (id === 'KeypointsCheckbox') {
      setShowKeypoints(checked);
    }
  };

  // Update active options when checkboxes change
  useEffect(() => {
    const options = [];
    if (showBoxes) options.push('Boxes');
    if (showKeypoints) options.push('Keypoints');
    setActiveOptions(options);
  }, [showBoxes, showKeypoints, setActiveOptions]);

  return (
    <div className="display-options">
      <h3>Options</h3>
      <div className="option">
        <input 
          type="checkbox" 
          id="BoxesCheckbox" 
          className="option-checkbox" 
          checked={showBoxes}
          onChange={handleCheckboxChange} 
        />
        <label htmlFor="BoxesCheckbox" className="form-control">Boxes</label>
      </div>
      <div className="option">
        <input 
          type="checkbox" 
          id="KeypointsCheckbox" 
          className="option-checkbox" 
          checked={showKeypoints}
          onChange={handleCheckboxChange} 
        />
        <label htmlFor="KeypointsCheckbox" className="form-control">Keypoints</label>
      </div>
    </div>
  );
}

export default DisplayOptions;
