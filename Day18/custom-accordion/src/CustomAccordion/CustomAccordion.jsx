import React, { useState, useRef } from "react";
import "./CustomAccordion.css";

const CustomAccordion = ({ title, children, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("0px");

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    setContentHeight(isOpen ? "0px" : `${contentRef.current.scrollHeight}px`);
  };

  return (
    <div className="accordion" id={id}>
      <button
        className={`accordion-header ${isOpen ? "active" : ""}`}
        onClick={toggleAccordion}
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
      >
        <h3 className="accordion-title">{title}</h3>
        <span className={`material-icons arrow-icon ${isOpen ? "active" : ""}`}>
          {isOpen ? "expand_less" : "expand_more"}
        </span>
      </button>
      <div
        id={`${id}-content`}
        ref={contentRef}
        className="accordion-content"
        style={{ maxHeight: `${contentHeight}` }}
        aria-hidden={!isOpen}
      >
        <div className="accordion-inner">{children}</div>
      </div>
    </div>
  );
};

export default CustomAccordion;
