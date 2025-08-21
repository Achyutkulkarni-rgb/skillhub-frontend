import React, { useState } from "react";
import axios from "axios";

function AddAgent({ token }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAddAgent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://skillhub-backend-m6he.onrender.com/api/agents/add",
        { name, email, mobile, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setError("");
      setName("");
      setEmail("");
      setMobile("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add agent");
      setMessage("");
    }
  };

  return (
    <div className="container">
      <h2>Add Agent</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <form onSubmit={handleAddAgent}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mobile (+country code)"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Add Agent</button>
      </form>
    </div>
  );
}

export default AddAgent;
