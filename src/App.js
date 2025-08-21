import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import UploadCSV from "./components/UploadCSV";
import AgentLists from "./components/AgentLists";
import AddAgent from "./components/AppAgent"; // Ensure this is AddAgent.js
import './style.css';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    if (token && !user) {
      fetchUser();
      fetchAgents();
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Failed to fetch user", err);
      handleLogout();
    }
  };

  const fetchAgents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/agents", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAgents(data);
    } catch (err) {
      console.error("Failed to fetch agents", err);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div>
        {/* Top bar */}
        {user && (
          <div className="top-bar">
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}

        {/* Navigation */}
        {user && (
          <nav className="nav-bar">
            <Link to="/add-agent">Add Agent</Link>
            <Link to="/upload">Upload CSV</Link>
            <Link to="/agents">All Agents</Link>
          </nav>
        )}

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/upload" /> : <AuthPage setUser={setUser} setToken={setToken} />}
          />
          <Route
            path="/add-agent"
            element={user ? <AddAgent token={token} /> : <Navigate to="/" />}
          />
          <Route
            path="/upload"
            element={user ? <UploadCSV token={token} /> : <Navigate to="/" />}
          />
          <Route
            path="/agents"
            element={user ? <AgentLists token={token} /> : <Navigate to="/" />}
          />
          <Route
            path="/agent/:id"
            element={user ? <AgentLists token={token} /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
