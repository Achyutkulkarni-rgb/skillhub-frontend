// src/components/AgentLists.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function AgentLists({ token }) {
  const [agentsLists, setAgentsLists] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAgentsAndLists = async () => {
      try {
        // Fetch all agents
        const agentsRes = await axios.get("http://localhost:5000/api/agents", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const agents = agentsRes.data;

        const tempLists = {};

        // Fetch distributed CSV items for each agent
        for (const agent of agents) {
          const res = await axios.get(`http://localhost:5000/api/csv/agent/${agent._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          tempLists[agent.name] = res.data; // store items by agent name
        }

        setAgentsLists(tempLists);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch agent lists");
        setLoading(false);
      }
    };

    fetchAgentsAndLists();
  }, [token]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto" }}>
      <h2>Distributed Lists for Each Agent</h2>
      {Object.keys(agentsLists).length === 0 ? (
        <p>No agents or items found.</p>
      ) : (
        Object.keys(agentsLists).map((agentName) => (
          <div key={agentName} style={{ marginBottom: "30px" }}>
            <h3>{agentName}</h3>
            {agentsLists[agentName].length === 0 ? (
              <p>No items assigned yet.</p>
            ) : (
              <table
                border="1"
                cellPadding="8"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Phone</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {agentsLists[agentName].map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.FirstName}</td>
                      <td>{item.Phone}</td>
                      <td>{item.Notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AgentLists;
