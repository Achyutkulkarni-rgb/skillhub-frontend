// Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard({ token }) {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get(
          "https://skillhub-backend-m6he.onrender.com/api/agents",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAgents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAgents();
  }, [token]);

  return (
    <div>
      <h2>Agents</h2>
      <ul>
        {agents.map((agent) => (
          <li key={agent._id}>
            {agent.name} - 
            <Link to={`/agent/${agent._id}`}> View Lists </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
