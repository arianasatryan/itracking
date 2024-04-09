// ParentComponent.js
import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import VideoUploader from './VideoUploader';

const ParentComponent = () => {
  const [activeModel, setActiveModel] = useState('face');
  const [activeOptions, setActiveOptions] = useState(['boxes', 'keypoints']);

  const handleModelChange = (newModel) => {
    setActiveModel(newModel);
  };

  const handleOptionChange = (optionId, checked) => {
    if (checked) {
      setActiveOptions([...activeOptions, optionId]);
    } else {
      setActiveOptions(activeOptions.filter(option => option !== optionId));
    }
  };

  return (
    <div>
      <ImageUploader activeModel={activeModel} activeOptions={activeOptions} onModelChange={handleModelChange} onOptionChange={handleOptionChange} />
      <VideoUploader activeModel={activeModel} activeOptions={activeOptions} onModelChange={handleModelChange} onOptionChange={handleOptionChange} />
    </div>
  );
}

export default ParentComponent;
