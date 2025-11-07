// file: src/Marketplace.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Marketplace() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token"); // token must exist

  const fetchMarketplace = async () => {
    try {
      console.log("🔎 Calling marketplace API…");
      const res = await axios.get("http://localhost:5000/api/events/marketplace", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("✅ Marketplace response:", res.data);
      setSlots(res.data || []);
    } catch (err) {
      console.error("❌ Error fetching marketplace:", err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketplace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!token) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Marketplace</h2>
        <p>You are not logged in. <a href="/login">Go to Login</a></p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Marketplace</h2>
      {loading ? (
        <p>Loading…</p>
      ) : slots.length === 0 ? (
        <p>No swappable slots found.</p>
      ) : (
        slots.map((s) => (
          <div key={s._id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8, margin: "10px 0" }}>
            <div><b>{s.title}</b> — <i>{s.status}</i></div>
            <div>{new Date(s.startTime).toLocaleString()} → {new Date(s.endTime).toLocaleString()}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>owner: {s.userId}</div>
          </div>
        ))
      )}
    </div>
  );
}
