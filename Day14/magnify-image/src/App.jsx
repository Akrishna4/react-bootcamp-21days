import React from "react";
import "./App.css";
import ImageMagnifier from "./components/ImageMagnifier";
import flowerImage from "./images/close-up-shot-beautiful-flower-nature_574545-10014.webp"; // Import the image

const App = () => {
  return (
    <div className="container">
      <ImageMagnifier imageUrl={flowerImage} />
    </div>
  );
};

export default App;
