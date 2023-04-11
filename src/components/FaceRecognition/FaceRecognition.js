import React from 'react';

const FaceRecognition = ({ imageUrl, box }) => {
  console.log('FaceRecognition component rendering'); // add this line
  return (
    <div className="center ma">
      <div className="absolute mt2">
        {imageUrl && <img id="inputimage" alt="" src={imageUrl} width="500px" height="auto" />}
        {box && (
          <div
            className="bounding-box"
          />
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
