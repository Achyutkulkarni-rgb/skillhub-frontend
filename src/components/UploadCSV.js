import React, { useState } from "react";
import axios from "axios";

function UploadCSV({ token }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://skillhub-backend-m6he.onrender.com/api/csv/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(res.data.message);
      setError("");
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
      setMessage("");
    }
  };

  return (
    <div className="container">
      <h2>Upload CSV</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadCSV;
