import React, { useState } from "react";
import Cropper from "react-easy-crop";

const ImageCropper = ({ image, onCropDone, onCropCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onAspectRatioChange = (event) => {
    setAspectRatio(Number(event.target.value));
  };

  return (
    <div className="cropper-container">
      <div className="cropper-wrapper">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          cropShape="rect"
        />
      </div>
      <div className="controls">
        <div className="aspect-ratios">
          <label>
            <input
              type="radio"
              value={1 / 1}
              name="ratio"
              checked={aspectRatio === 1 / 1}
              onChange={onAspectRatioChange}
            />
            1:1
          </label>
          <label>
            <input
              type="radio"
              value={4 / 3}
              name="ratio"
              checked={aspectRatio === 4 / 3}
              onChange={onAspectRatioChange}
            />
            4:3
          </label>
          <label>
            <input
              type="radio"
              value={16 / 9}
              name="ratio"
              checked={aspectRatio === 16 / 9}
              onChange={onAspectRatioChange}
            />
            16:9
          </label>
          <label>
            <input
              type="radio"
              value={3 / 2}
              name="ratio"
              checked={aspectRatio === 3 / 2}
              onChange={onAspectRatioChange}
            />
            3:2
          </label>
        </div>
        <div className="btn-group">
          <button className="btn btn-cancel" onClick={onCropCancel}>
            Cancel
          </button>
          <button
            className="btn btn-apply"
            onClick={() => onCropDone(croppedArea)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
