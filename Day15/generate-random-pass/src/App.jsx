import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [options, setOptions] = useState({
    length: 10,
    uppercase: false,
    lowercase: false,
    number: false,
    symbols: false,
  });
  const [isError, setIsError] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const generateRandomPassword = () => {
    if (
      !options.uppercase &&
      !options.lowercase &&
      !options.number &&
      !options.symbols
    ) {
      setIsError(true);
      return;
    }
    setIsError(false);

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let passwordChars = "";
    let password = "";

    if (options.uppercase) passwordChars += uppercaseChars;
    if (options.lowercase) passwordChars += lowercaseChars;
    if (options.number) passwordChars += numberChars;
    if (options.symbols) passwordChars += symbolChars;

    for (let i = 0; i < options.length; i++) {
      const randomIndex = Math.floor(Math.random() * passwordChars.length);
      password += passwordChars[randomIndex];
    }

    setGeneratedPassword(password);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="title">Generate Random Password</h2>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label>Password length</label>
            <input
              value={options.length}
              onChange={({ target }) => {
                setOptions({
                  ...options,
                  length: Math.max(4, Math.min(32, target.value)), // Limit between 4-32
                });
              }}
              type="number"
              min="4"
              max="32"
              className="form-control"
            />
          </div>

          <div className="options-grid">
            <div className="option">
              <input
                type="checkbox"
                id="uppercase"
                checked={options.uppercase}
                onChange={() => {
                  setOptions({
                    ...options,
                    uppercase: !options.uppercase,
                  });
                }}
              />
              <label htmlFor="uppercase">Uppercase Letters</label>
            </div>

            <div className="option">
              <input
                type="checkbox"
                id="lowercase"
                checked={options.lowercase}
                onChange={() => {
                  setOptions({
                    ...options,
                    lowercase: !options.lowercase,
                  });
                }}
              />
              <label htmlFor="lowercase">Lowercase Letters</label>
            </div>

            <div className="option">
              <input
                type="checkbox"
                id="numbers"
                checked={options.number}
                onChange={() => {
                  setOptions({
                    ...options,
                    number: !options.number,
                  });
                }}
              />
              <label htmlFor="numbers">Numbers</label>
            </div>

            <div className="option">
              <input
                type="checkbox"
                id="symbols"
                checked={options.symbols}
                onChange={() => {
                  setOptions({
                    ...options,
                    symbols: !options.symbols,
                  });
                }}
              />
              <label htmlFor="symbols">Symbols</label>
            </div>
          </div>

          {isError && (
            <div className="error-message">
              Please select at least one option
            </div>
          )}

          <button className="generate-btn" onClick={generateRandomPassword}>
            Generate Password
          </button>

          {generatedPassword && (
            <div className="password-result">
              <h3>Your Password:</h3>
              <div className="password-display">{generatedPassword}</div>
              <button
                className="copy-btn"
                onClick={() => navigator.clipboard.writeText(generatedPassword)}
              >
                Copy to Clipboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
