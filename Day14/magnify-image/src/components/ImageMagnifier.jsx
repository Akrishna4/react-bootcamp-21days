import React, { useState, useRef } from "react";
import "./ImageMagnifier.css";

const ImageMagnifier = ({ imageUrl }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const handleMouseHover = (e) => {
    if (!imgRef.current) return;

    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    // Ensure position stays within image bounds
    const boundedX = Math.min(100, Math.max(0, x));
    const boundedY = Math.min(100, Math.max(0, y));

    setPosition({ x: boundedX, y: boundedY });
    setCursorPosition({ x: e.clientX - left, y: e.clientY - top });
  };

  return (
    <div className="magnifier-wrapper">
      <div
        className="img-magnifier-container"
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
        onMouseMove={handleMouseHover}
      >
        <img
          ref={imgRef}
          className="img-magnifier"
          src={imageUrl}
          alt="Magnified view"
        />

        {showMagnifier && (
          <div
            className="magnifier-glass"
            style={{
              left: `${cursorPosition.x - 100}px`,
              top: `${cursorPosition.y - 100}px`,
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: `${position.x}% ${position.y}%`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ImageMagnifier;
