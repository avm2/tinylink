import React, { useState } from "react";

export default function AddLinkForm({ onAdd }) {
  const [target, setTarget] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const res = await onAdd({ target, code: code || undefined });

    setLoading(false);

    if (res.ok) {
      setTarget("");
      setCode("");
      setMessage("Created!");
    } else {
      setMessage(res.message || "Error");
    }
  };

  return (
    <form
      onSubmit={submit}
      style={{
        marginBottom: 20,
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <div>
        <label style={{ fontWeight: "bold" }}>Long URL</label>
        <br />
        <input
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #cbd5e1",
            borderRadius: "6px",
            marginTop: "6px",
          }}
        />
      </div>

      <div style={{ marginTop: 15 }}>
        <label style={{ fontWeight: "bold" }}>Custom Code (optional)</label>
        <br />
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{
            width: "250px",
            padding: "10px",
            border: "1px solid #cbd5e1",
            borderRadius: "6px",
            marginTop: "6px",
          }}
        />
      </div>

      <button
        disabled={loading}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          background: "#1e40af",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {loading ? "Adding..." : "Add Link"}
      </button>

      {message && (
        <p style={{ color: "green", marginTop: "10px" }}>{message}</p>
      )}
    </form>
  );
}
