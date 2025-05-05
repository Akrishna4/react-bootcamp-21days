import React, { useState } from "react";
import "./App.css";
import FileInput from "./components/FileInput";
import ImageCropper from "./components/ImageCropper";

const App = () => {
  const [image, setImage] = useState("");
  const [currentPage, setCurrentPage] = useState("choose-img");
  const [imgAfterCrop, setImgAfterCrop] = useState("");

  const onImageSelected = (selectedImg) => {
    setImage(selectedImg);
    setCurrentPage("crop-img");
  };

  const onCropDone = (imgCroppedArea) => {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext("2d");

    let imageObj1 = new Image();
    imageObj1.src = image;
    imageObj1.onload = () => {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );
      const dataURL = canvasEle.toDataURL("image/jpeg");
      setImgAfterCrop(dataURL);
      setCurrentPage("img-cropped");
    };
  };

  const onCropCancel = () => {
    setCurrentPage("choose-img");
    setImage("");
  };

  return (
    <div className="container">
      {currentPage === "choose-img" ? (
        <FileInput onImageSelected={onImageSelected} />
      ) : currentPage === "crop-img" ? (
        <ImageCropper
          image={image}
          onCropDone={onCropDone}
          onCropCancel={onCropCancel}
        />
      ) : (
        <div className="result-container">
          <div className="result-image">
            <img src={imgAfterCrop} className="cropped-img" alt="Cropped" />
          </div>
          <div className="btn-group">
            <button onClick={() => setCurrentPage("crop-img")} className="btn">
              Re-crop
            </button>
            <button
              onClick={() => {
                setCurrentPage("choose-img");
                setImgAfterCrop("");
              }}
              className="btn"
            >
              New Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
