import React, { useEffect, useRef, useState } from "react";
import "./ImageZoomInOut.css";

const ImageZoomInOut = ({ imageUrl }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 3)); // Limit max zoom to 3x
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5)); // Limit min zoom to 0.5x
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (scale === 1) return; // No need to drag if not zoomed
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    document.body.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDragging || scale === 1) return;

    const newX = e.clientX - startPos.x;
    const newY = e.clientY - startPos.y;

    // Calculate boundaries to prevent dragging image out of view
    const containerRect = containerRef.current.getBoundingClientRect();
    const imageRect = imageRef.current.getBoundingClientRect();

    const maxX = (imageRect.width * scale - containerRect.width) / 2;
    const maxY = (imageRect.height * scale - containerRect.height) / 2;

    setPosition({
      x: Math.max(Math.min(newX, maxX), -maxX),
      y: Math.max(Math.min(newY, maxY), -maxY),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = "";
  };

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseUp);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [isDragging, startPos, scale]);

  return (
    <div
      ref={containerRef}
      className="zoom-container"
      onMouseDown={handleMouseDown}
    >
      <div className="controls">
        <button onClick={handleZoomIn} className="zoom-btn">
          <span>+</span>
        </button>
        <button onClick={handleZoomOut} className="zoom-btn">
          <span>-</span>
        </button>
        <button onClick={handleReset} className="zoom-btn">
          <span>Reset</span>
        </button>
      </div>
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Zoomable content"
        className="zoom-image"
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          cursor: scale > 1 ? "grab" : "default",
        }}
        draggable={false}
      />
    </div>
  );
};

export default ImageZoomInOut;
