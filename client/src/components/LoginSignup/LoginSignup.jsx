import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import './LoginSignup.css';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState({ show: false, success: true, message: "" });

  const navigate = useNavigate();

  // ✅ UPDATED: read isAuthenticated
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  // ✅ NEW: redirect after Auth0 login
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const showModal = (success, message) => {
    setModal({ show: true, success, message });
    setTimeout(() => setModal({ show: false, success: true, message: "" }), 2000);
  };

  const handleSignup = async () => {
    if (!email || !password || !name) {
      showModal(false, "All fields are required");
      return;
    }

    try {
      const res = await fetch("https://login-signup-users.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      res.ok ? showModal(true, "Registration successful") : showModal(false, data.error);
      setAction("Login");
    } catch {
      showModal(false, "Registration failed");
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showModal(false, "Please fill all fields");
      return;
    }

    try {
      const res = await fetch("https://login-signup-users.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        showModal(true, "Login successful");
        localStorage.setItem("user_token", JSON.stringify(data));
        setTimeout(() => navigate("/home"), 1200);
      } else {
        showModal(false, data.error);
      }
    } catch {
      showModal(false, "Login failed");
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="Container glass">
          <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>

          <div className="inputs">
            {action === "Sign Up" && (
              <div className="input">
                <img src={user_icon} alt="user" />
                <input
                  placeholder="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            )}

            <div className="input">
              <img src={email_icon} alt="email" />
              <input
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="input password-field">
              <img src={password_icon} alt="password" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="unregistered-user">
            {action === "Login"
              ? <>Not registered? <span onClick={() => setAction("Sign Up")}>Click here</span></>
              : <>Already have an account? <span onClick={() => setAction("Login")}>Back to Login</span></>
            }
          </div>

          <div className="submit-container">
            <div
              className={`submit ${action === "Login" ? "gray" : ""}`}
              onClick={handleSignup}
            >
              Sign Up
            </div>

            <div
              className={`submit ${action === "Sign Up" ? "gray" : ""}`}
              onClick={handleLogin}
            >
              Login
            </div>
          </div>

          {/* AUTH0 LOGIN */}
          <button
            className="auth0-btn"
            onClick={() => loginWithRedirect()}
          >
            Continue with Google
          </button>
        </div>
      </div>

      {modal.show && (
        <div className="modal-overlay">
          <div className={`modal ${modal.success ? "success" : "error"}`}>
            {modal.success ? <FaCheckCircle /> : <FaTimesCircle />}
            <p>{modal.message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignup;
