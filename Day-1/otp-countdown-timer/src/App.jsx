import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  // state variables to manage OTP input, minutes and seconds
  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);

  const resendOTP = () => {
    setMinutes(0);
    setSeconds(10);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);
  return (
    <div className="container">
      <div className="card">
        <h4>Verify OTP</h4>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          maxLength={6}
        />

        <div className="countdown-text">
          <p>
            Time Remaining:{" "}
            <span style={{ fontWeight: 600 }}>
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </p>

          <button
            disabled={seconds > 0 || minutes > 0}
            style={{
              color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
            }}
            onClick={resendOTP}
          >
            Resend OTP
          </button>
        </div>
        <button className="submit-btn">SUBMIT</button>
      </div>
    </div>
  );
};

export default App;
