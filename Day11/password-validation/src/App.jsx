import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const getActiveColor = (type) => {
    if (type === "Strong") return "#3fbb60";
    if (type === "Medium") return "#fe804d";
    return "#ff0054";
  };

  const handlePassword = (passwordValue) => {
    const strengthChecks = {
      length: 0,
      hasUpperCase: false,
      hasLowerCase: false,
      hasDigit: false,
      hasSpecialChar: false,
    };
    strengthChecks.length = passwordValue.length >= 8 ? true : false;
    strengthChecks.hasUpperCase = /[A-Z]+/.test(passwordValue);
    strengthChecks.hasLowerCase = /[a-z]+/.test(passwordValue);
    strengthChecks.hasDigit = /[0-9]+/.test(passwordValue);
    strengthChecks.hasSpecialChar = /[^A-Za-z0-9]+/.test(passwordValue);

    let verifiedList = Object.values(strengthChecks).filter((item) => item);
    let strength =
      verifiedList.length === 5
        ? "Strong"
        : verifiedList.length >= 2
          ? "Medium"
          : "Weak";

    setPassword(passwordValue);
    setProgress(`${(verifiedList.length / 5) * 100}%`);
    setMessage(strength);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="title">Password Validation</h2>
        </div>
        <div className="card-body">
          <div className="input-container">
            <div className="input-box">
              <input
                value={password}
                onChange={({ target }) => {
                  handlePassword(target.value);
                }}
                type={hidePassword ? "password" : "text"}
                placeholder="Enter your password"
                className="input"
              />

              <a
                href="#"
                className="toggle-btn"
                onClick={() => setHidePassword(!hidePassword)}
              >
                <span
                  className="material-icons eye-icon"
                  style={{ color: hidePassword ? "#1364FF" : "#c3c3c3" }}
                >
                  visibility
                </span>
              </a>
            </div>
            <div
              className="progress"
              style={{
                width: progress,
                backgroundColor: getActiveColor(message),
              }}
            ></div>
          </div>
        </div>
        {password.length !== 0 ? (
          <p className="message" style={{ color: getActiveColor(message) }}>
            Your password is {message}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default App;
