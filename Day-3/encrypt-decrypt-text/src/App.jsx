import React from "react";
import "./App.css";
import CryptoJS from "crypto-js";

const SECRET_PASS = "XkhZG4fW2t2W";

const App = () => {
  const [screen, setScreen] = React.useState("encrypt");
  const [text, setText] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [resultText, setResultText] = React.useState("");

  const switchScreen = (type) => {
    setScreen(type);
    setText("");
    setResultText("");
    setErrorMessage("");
  };

  const encryptData = () => {
    try {
      const data = CryptoJS.AES.encrypt(text, SECRET_PASS).toString();
      setResultText(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Encryption failed. Please try again.");
    }
  };

  const decryptData = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(text, SECRET_PASS);
      const data = bytes.toString(CryptoJS.enc.Utf8);
      if (!data) {
        throw new Error("Invalid encrypted text");
      }
      setResultText(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Decryption failed. Please check the text.");
    }
  };

  const handleClick = () => {
    if (!text.trim()) {
      setErrorMessage("Please enter some text");
      return;
    }
    if (screen === "encrypt") {
      encryptData();
    } else {
      decryptData();
    }
  };

  return (
    <div className="container">
      <div className="button-group">
        <button
          className={`btn btn-left ${screen === "encrypt" ? "active" : ""}`}
          onClick={() => switchScreen("encrypt")}
        >
          Encrypt
        </button>
        <button
          className={`btn btn-right ${screen === "decrypt" ? "active" : ""}`}
          onClick={() => switchScreen("decrypt")}
        >
          Decrypt
        </button>
      </div>

      <div className="card">
        <textarea
          value={text}
          onChange={({ target }) => setText(target.value)}
          placeholder={
            screen === "encrypt"
              ? "Enter text to encrypt"
              : "Enter encrypted text to decrypt"
          }
        />
        {errorMessage && <div className="error">{errorMessage}</div>}
        <button
          className={`submit-btn ${
            screen === "encrypt" ? "encrypt-btn" : "decrypt-btn"
          }`}
          onClick={handleClick}
        >
          {screen === "encrypt" ? "Encrypt" : "Decrypt"}
        </button>
      </div>

      {resultText && (
        <div className="content">
          <label>
            {screen === "encrypt" ? "ENCRYPTED DATA" : "DECRYPTED DATA"}
          </label>
          <p>{resultText}</p>
        </div>
      )}
    </div>
  );
};

export default App;
