import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleLogin() {
    try{
      const res = await fetch("/login", {
        method: "POST",
        body: JSON.stringify({ email: email, password : password }),
        headers: {
          "Content-Type" : "application/json",
        }
      });
      const data = await res.json();
      console.log(data);
      if(data.status==='ok'){
        navigate("/");
      }
    }
    catch(e){
      console.log(e)
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <label>Email
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter you email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required = {true}
      />
      </label>
      <label>Password
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter you password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      </label>
      <button onClick={() => handleLogin()}> Login </button>
    </div>
  );
}

export default Login;
