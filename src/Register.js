import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";
import { FaUserPlus } from "react-icons/fa";
import config from './config';

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [notification, setNotification] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  async function register(event) {
    event.preventDefault();
    setNotification("");
    setSuccessMessage("");

    if (!userName.trim()) {
      setNotification("Username is required.");
      return;
    }

    if (!email.trim()) {
      setNotification("Email is required.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setNotification(
        "Email format is invalid. It should contain '@' and end with '.com'."
      );
      return;
    }

    if (!password.trim()) {
      setNotification("Password is required.");
      return;
    }

    if (!/^\d{4}$/.test(password)) {
      setNotification("Password should be exactly 4 digits.");
      return;
    }

    if (!agreeToTerms) {
      setNotification("You must agree to our terms and policies.");
      return;
    }

    try {
      await axios.post(`${config.apiBaseUrl}/api/user/registeruser`, {
        userName: userName,
        email: email,
        password: password,
        gender: gender,
      });
      setSuccessMessage("User registered successfully");
      setNotification("");
      navigate("/login");
    } catch (err) {
      console.error("Error: " + err.message);
      setNotification("An error occurred during registration.");
    }
  }

  return (
    <div>
      <div className="registerPage">
        <div className="register-container">
          <h2>
            {" "}
            <FaUserPlus /> User Registration
          </h2>

          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          <form onSubmit={register}>
            {notification && (
              <div className="alert alert-danger">{notification}</div>
            )}
            <div className="mb-3">
              <div className="form-label">
                <label htmlFor="username">
                  <strong>Username</strong>
                </label>
              </div>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter your name"
                value={userName}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
              <div className="form-label">
                <label htmlFor="email">
                  <strong>Email</strong>
                </label>
              </div>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3 gender-style">
              <div className="form-label">
                <label htmlFor="gender">
                  <strong>Gender &nbsp;&nbsp;&nbsp;</strong>
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  id="male"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(event) => {
                    setGender(event.target.value);
                  }}
                  required
                />
                <label
                  className="form-check-label gender-label"
                  htmlFor="male"
                >
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(event) => {
                    setGender(event.target.value);
                  }}
                  required
                />
                <label
                  className="form-check-label gender-label"
                  htmlFor="female"
                >
                  Female
                </label>
              </div>
            </div>
            <div className="mb-3">
              <div className="form-label">
                <label htmlFor="password">
                  <strong>Password</strong>
                </label>
              </div>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password (4 digits)"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="agreeToTerms"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
              />
              <label className="form-check-label" htmlFor="agreeToTerms">
                You agree to our terms and policies.
              </label>
            </div>
            <button type="submit" className="btn btn-primary mt-4">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
