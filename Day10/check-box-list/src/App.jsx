import React, { useState } from "react";
import "./App.css";

const LIST_DATA = [
  { id: "1", value: "Item 1" },
  { id: "2", value: "Item 2" },
  { id: "3", value: "Item 3" },
  { id: "4", value: "Item 4" },
  { id: "5", value: "Item 5" },
  { id: "6", value: "Item 6" },
  { id: "7", value: "Item 7" },
];

const App = () => {
  const [checkedList, setCheckedList] = useState([]);

  const handleSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    setCheckedList((prev) => {
      if (isChecked) {
        return [...prev, value];
      } else {
        return prev.filter((item) => item !== value);
      }
    });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <p className="title">Check Box List</p>
        </div>

        <div className="selection-preview">
          <label>You Selected:</label>
          <div className="chips-container">
            {checkedList.length > 0 ? (
              checkedList.map((item, index) => (
                <div key={index} className="chip">
                  <p className="chip-label">{item}</p>
                </div>
              ))
            ) : (
              <p className="empty-message">No items selected</p>
            )}
          </div>
        </div>

        <div className="card-body">
          {LIST_DATA.map((item) => (
            <div key={item.id} className="checkbox-container">
              <input
                type="checkbox"
                name="checkbox"
                id={item.id}
                value={item.value}
                checked={checkedList.includes(item.value)}
                onChange={handleSelect}
              />
              <label htmlFor={item.id}>{item.value}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
