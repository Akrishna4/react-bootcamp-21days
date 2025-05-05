import React, { useState } from "react";

const App = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [errorMsg, setErrorMsg] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const validateSelectedFile = () => {
    const MIN_FILE_SIZE = 1024; // 1MB in KB
    const MAX_FILE_SIZE = 5120; // 5MB in KB

    if (!selectedFile) {
      setErrorMsg("Please choose a file");
      setIsSuccess(false);
      return;
    }

    const fileSizeByKiloBytes = selectedFile.size / 1024;

    if (fileSizeByKiloBytes < MIN_FILE_SIZE) {
      setErrorMsg("File size is less than minimum limit");
      setIsSuccess(false);
      return;
    }

    if (fileSizeByKiloBytes > MAX_FILE_SIZE) {
      setErrorMsg("File size is greater than maximum limit");
      setIsSuccess(false);
      return;
    }

    setErrorMsg("");
    setIsSuccess(true);
  };

  return (
    <div className="App-container">
      <div className="card">
        <div className="card-header">
          <h4 className="title">File Size Validation</h4>
        </div>
        <div className="card-body">
          <p className="label">Choose File</p>

          <input type="file" name="file" onChange={handleFileChange} />
          <div className="space-between">
            <p className="info-message">Min Size: 1MB</p>
            <p className="info-message">Max Size: 5MB</p>
          </div>

          {isSuccess ? (
            <p className="success-message">Validation Successful</p>
          ) : null}

          <p className="error-message">{errorMsg}</p>

          <button className="btn" onClick={validateSelectedFile}>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
