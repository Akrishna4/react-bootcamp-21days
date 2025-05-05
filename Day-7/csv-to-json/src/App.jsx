import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState("");

  const convertCSVToJSON = (csvData) => {
    try {
      const lines = csvData.split("\n").filter((line) => line.trim() !== "");
      if (lines.length < 2) {
        throw new Error("CSV file must contain at least one data row");
      }

      const headers = lines[0].split(",").map((header) => header.trim());
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        const currentline = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); // Handles quoted values
        const obj = {};

        if (currentline.length !== headers.length) {
          console.warn(
            `Row ${i} has ${currentline.length} columns, expected ${headers.length}`
          );
          continue;
        }

        for (let j = 0; j < headers.length; j++) {
          let value = currentline[j].trim();
          // Remove surrounding quotes if present
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
          }
          obj[headers[j]] = value;
        }
        result.push(obj);
      }

      return result;
    } catch (err) {
      setError(`Error parsing CSV: ${err.message}`);
      return null;
    }
  };

  const handleCSVInputChange = (event) => {
    setError(null);
    const file = event.target.files[0];

    if (!file) return;

    setFileName(file.name);

    if (!file.name.endsWith(".csv")) {
      setError("Please select a .csv file");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const csvData = e.target.result;
        const jsonData = convertCSVToJSON(csvData);
        if (jsonData) {
          setJsonData(jsonData);
        }
      } catch (err) {
        setError(`Error processing file: ${err.message}`);
      }
    };

    reader.onerror = () => {
      setError("Error reading file");
    };

    reader.readAsText(file);
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(jsonData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = fileName.replace(".csv", ".json");

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="container">
      <div className="card">
        <h2>CSV to JSON Converter</h2>

        <div className="file-input-container">
          <label htmlFor="csv-upload" className="file-input-label">
            Choose CSV File
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleCSVInputChange}
              className="file-input"
            />
          </label>
          {fileName && <p className="file-name">Selected: {fileName}</p>}
        </div>

        {error && <div className="error-message">{error}</div>}

        {jsonData ? (
          <div className="results-container">
            <div className="json-container">
              <pre>{JSON.stringify(jsonData, null, 2)}</pre>
            </div>
            <button onClick={downloadJSON} className="download-btn">
              Download JSON
            </button>
          </div>
        ) : (
          <p className="placeholder-text">
            Please select a CSV file to convert
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
