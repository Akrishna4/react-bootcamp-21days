import React from "react";
import TEST_IMG from "./images/test-image.webp";
import ImageZoomInOut from "./components/ImageZoomInOut";

const App = () => {
  return (
    <div className="app-container">
      <ImageZoomInOut imageUrl={TEST_IMG} />
    </div>
  );
};

export default App;
