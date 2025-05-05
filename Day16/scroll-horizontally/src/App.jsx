import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import { SAMPLE_DATA } from "./utils/data";

const ITEM_WIDTH = 200;

const App = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      setMaxScroll(
        containerRef.current.scrollWidth - containerRef.current.clientWidth
      );
    }
  }, []);

  const handleScroll = (scrollAmount) => {
    const newScrollPosition = scrollPosition + scrollAmount;
    const boundedPosition = Math.max(0, Math.min(newScrollPosition, maxScroll));
    setScrollPosition(boundedPosition);
    containerRef.current.scrollTo({
      left: boundedPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="app-container">
      <h1>Horizontal Scroller</h1>

      <div className="scroll-container">
        <div ref={containerRef} className="scroll-wrapper">
          <div className="content-box">
            {SAMPLE_DATA.map((item) => (
              <div
                key={item.id}
                className="card"
                style={{ backgroundColor: item.color }}
              >
                <p className="card-id">{item.id}</p>
                <p className="card-label">{item.label || `Item ${item.id}`}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          className="scroll-btn left"
          onClick={() => handleScroll(-ITEM_WIDTH)}
          disabled={scrollPosition <= 0}
        >
          &lt;
        </button>
        <button
          className="scroll-btn right"
          onClick={() => handleScroll(ITEM_WIDTH)}
          disabled={scrollPosition >= maxScroll}
        >
          &gt;
        </button>
      </div>

      <div className="scroll-position">
        Scroll Position: {scrollPosition}px / Max: {maxScroll}px
      </div>
    </div>
  );
};

export default App;
