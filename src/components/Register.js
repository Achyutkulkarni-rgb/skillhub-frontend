import React, { useState } from "react";
import axios from "axios";

function Register({ setUser, setToken }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post("https://skillhub-backend-m6he.onrender.com/api/auth/register", {
        name,
        email,
        password,
      });

      setMessage(res.data.message);
      setError("");
      
      // Optionally, log in the user automatically after registration
      const loginRes = await axios.post("https://skillhub-backend-m6he.onrender.com/api/auth/login", {
        email,
        password,
      });
      setUser(loginRes.data.user);
      setToken(loginRes.data.token);
      localStorage.setItem("token", loginRes.data.token);

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Register</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>Register</button>
      </form>
    </div>
  );
}

export default Register;
