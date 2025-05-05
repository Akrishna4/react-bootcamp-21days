import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    successMsg: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
    // Clear error when user starts typing
    setFormError({
      ...formError,
      [name]: "",
    });
  };

  const validateFormInput = (event) => {
    event.preventDefault();
    let inputError = {
      email: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;

    // Email validation
    if (!formInput.email) {
      inputError.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formInput.email)) {
      inputError.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!formInput.password) {
      inputError.password = "Password is required";
      isValid = false;
    } else if (formInput.password.length < 6) {
      inputError.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Confirm Password validation
    if (!formInput.confirmPassword) {
      inputError.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formInput.confirmPassword !== formInput.password) {
      inputError.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setFormError(inputError);

    if (isValid) {
      setFormInput({
        email: "",
        password: "",
        confirmPassword: "",
        successMsg: "Form submitted successfully!",
      });
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h4 className="title">Sign Up</h4>
        </div>
        <div className="card-body">
          <form onSubmit={validateFormInput}>
            <div className="form-group">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                value={formInput.email}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value);
                }}
                className={`input ${formError.email ? "error" : ""}`}
                placeholder="Enter your email"
              />
              {formError.email && (
                <p className="error-message">{formError.email}</p>
              )}
            </div>

            <div className="form-group">
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                value={formInput.password}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value);
                }}
                className={`input ${formError.password ? "error" : ""}`}
                placeholder="Enter your password"
              />
              {formError.password && (
                <p className="error-message">{formError.password}</p>
              )}
            </div>

            <div className="form-group">
              <label className="label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formInput.confirmPassword}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value);
                }}
                className={`input ${formError.confirmPassword ? "error" : ""}`}
                placeholder="Confirm your password"
              />
              {formError.confirmPassword && (
                <p className="error-message">{formError.confirmPassword}</p>
              )}
            </div>

            {formInput.successMsg && (
              <p className="success-message">{formInput.successMsg}</p>
            )}

            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
