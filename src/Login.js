import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { FaSignInAlt } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [notification, setNotification] = useState("");
  
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();

    setNotification("");

    if (!email.trim()) {
      setNotification("Email is required.");
      return;
    }

    if (!password.trim()) {
      setNotification("Password is required.");
      return;
    }

    if (!agreeToTerms) {
      setNotification("You must agree to our terms and policies.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/loginuser",
        {
          email: email,
          password: password,
        }
      );

      const { data } = response;

      if (data.message === "Email not exist") {
        setNotification("Email does not exist.");
      } else if (data.message === "Login Successfull") {
        navigate("/dashboard/userhome");
      } else {
        setNotification("Incorrect Email or password.");
      }
    } catch (err) {
      console.error(err);
      setNotification("An error occurred during login.");
    }
  }

  return (
    <div className="loginPage">
      <div className="login-container">
        <h2>User Login Form <FaSignInAlt/></h2>
        <form onSubmit={login}>
          {notification && (
            <div className="alert alert-danger">{notification}</div>
          )}
          <div className="mb-3">
            <div className="form-label">
              <label htmlFor="email" >
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
              placeholder="Enter your password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
          </div>

          <div className="form-check mb-3">
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

          <button type="submit" className="btn btn-success">
            <strong>Login</strong>
          </button>
          <br />
          <br />
          <Link className="btn btn-default" to="/register">
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
