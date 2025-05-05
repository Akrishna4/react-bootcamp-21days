import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [file, setFile] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setIsSuccess(false);
    setIsError(false);

    if (!selectedFile) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setIsError(true);
      setErrorMsg(
        "Invalid file type. Please upload a JPEG, PNG, or GIF image."
      );
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!file) {
      setIsError(true);
      setErrorMsg("Please select a file.");
      setIsSuccess(false);
      return;
    }

    setIsError(false);
    setIsSuccess(true);
    setErrorMsg("");
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="title">Validate File Type</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="file-input-container">
              <input
                type="file"
                onChange={handleFileChange}
                className="file-input"
                accept="image/jpeg, image/png, image/gif"
              />
              <div className="file-info">
                {file && <span>{file.name}</span>}
              </div>
            </div>

            {isError && <div className="error-text">{errorMsg}</div>}
            {isSuccess && (
              <div className="success-text">Valid File Type: {file.name}</div>
            )}

            <button type="submit" className="submit-btn">
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
