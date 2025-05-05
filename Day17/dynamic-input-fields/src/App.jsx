import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [inputFields, setInputFields] = useState([{ value: "" }]);

  const handleValueChange = (index, event) => {
    const values = [...inputFields];
    values[index].value = event.target.value;
    setInputFields(values);
  };

  const handleAddInput = () => {
    setInputFields([...inputFields, { value: "" }]);
  };

  const handleRemoveInput = (index) => {
    if (inputFields.length > 1) {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    }
  };

  return (
    <div className="container">
      <h2>Dynamic Input Fields</h2>
      <div className="inputs-wrapper">
        {inputFields.map((inputField, index) => (
          <div className="input-group" key={index}>
            <input
              type="text"
              placeholder="Enter text"
              value={inputField.value}
              onChange={(e) => handleValueChange(index, e)}
              className="form-input"
            />
            {inputFields.length > 1 && (
              <button
                type="button"
                className="delete-btn"
                onClick={() => handleRemoveInput(index)}
                aria-label="Remove input"
              >
                <span className="material-icons">delete</span>
              </button>
            )}
          </div>
        ))}
      </div>
      <button type="button" className="add-btn" onClick={handleAddInput}>
        <span className="material-icons">add</span>
        Add Input
      </button>
    </div>
  );
};

export default App;
