import React from "react";
import "./App.css";
import CustomAccordion from "./CustomAccordion/CustomAccordion";
import { DATA_LIST } from "./utils/data";

const App = () => {
  return (
    <div className="container">
      <h1 className="accordion-title">FAQ Accordion</h1>
      <div className="accordion-wrapper">
        {DATA_LIST.map((item) => (
          <CustomAccordion
            title={item.title}
            key={item.id}
            id={`accordion-${item.id}`}
          >
            <div className="accordion-content-text">{item.description}</div>
          </CustomAccordion>
        ))}
      </div>
    </div>
  );
};

export default App;
