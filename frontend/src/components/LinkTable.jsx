import React from "react";
import { Link } from "react-router-dom";

export default function LinkTable({ links, onDelete }) {
  return (
    <table
      width="100%"
      cellPadding="12"
      style={{
        borderCollapse: "collapse",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      <thead>
        <tr style={{ background: "#e2e8f0", textAlign: "left" }}>
          <th>Code</th>
          <th>Target</th>
          <th>Clicks</th>
          <th>Last Clicked</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {links.length === 0 && (
          <tr>
            <td colSpan="5" style={{ textAlign: "center", padding: 20 }}>
              No links added yet.
            </td>
          </tr>
        )}

        {links.map((l) => (
          <tr
            key={l.code}
            style={{ borderBottom: "1px solid #e2e8f0" }}
          >
            <td>
              <a
                href={`/${l.code}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#1e40af", fontWeight: "bold" }}
              >
                {l.code}
              </a>
            </td>

            <td
              style={{
                maxWidth: 380,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {l.target}
            </td>

            <td>{l.clicks}</td>

            <td>
              {l.lastClicked
                ? new Date(l.lastClicked).toLocaleString()
                : "-"}
            </td>

            <td>
              <Link
                to={`/code/${l.code}`}
                style={{
                  marginRight: "10px",
                  color: "#1e40af",
                  textDecoration: "none",
                }}
              >
                Stats
              </Link>

              <button
                onClick={() => onDelete(l.code)}
                style={{
                  padding: "5px 12px",
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
