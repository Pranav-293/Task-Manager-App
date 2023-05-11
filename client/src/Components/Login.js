import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  async function handleLogin() {
    try {
      const res = await fetch("/auth-api/login", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "ok") {
        setMessage("");
        navigate("/");
      }
    } catch (e) {
      setMessage("Invalid Credentials");
      console.log(e);
    }
  }
  return (
    <div className="loginPage">
      <div className="login">
        <div className="loginContainer">
          <div className="title">
            <h1>Login</h1>
            Hey, Enter your details
          </div>

          <div className="loginInput">
            <div className="label">
              <label>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter you email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
            </div>
            <div className="label">
              <label>Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter you password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="message">{message}</div>

          <button onClick={() => handleLogin()}> Login </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
