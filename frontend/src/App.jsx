import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";

export default function App() {
  return (
    <BrowserRouter>

      {/* HEADER */}
      <div
        style={{
          width: "100%",
          padding: "15px 20px",
          background: "#1e40af",
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        TinyLink – URL Shortener
      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          padding: "20px",
          minHeight: "80vh",
          maxWidth: "1100px",
          margin: "0 auto",
          background: "#f8fafc",
          borderRadius: "8px",
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/code/:code" element={<Stats />} />
        </Routes>
      </div>

      {/* FOOTER */}
      <div
        style={{
          width: "100%",
          padding: "12px",
          background: "#f1f5f9",
          textAlign: "center",
          borderTop: "1px solid #e2e8f0",
          color: "#475569",
          fontSize: "14px",
          marginTop: "20px",
        }}
      >
        © {new Date().getFullYear()} TinyLink | Built by Aman Verma
      </div>
    </BrowserRouter>
  );
}
