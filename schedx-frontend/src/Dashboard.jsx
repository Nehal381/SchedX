import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchEvents();
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const createEvent = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/events",
        { title, startTime, endTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchEvents();
      setTitle("");
      setStartTime("");
      setEndTime("");
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };

  const makeSwappable = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/events/${id}`,
        { status: "SWAPPABLE" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchEvents();
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Dashboard</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Create New Event</h3>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <button onClick={createEvent}>Add Event</button>
      </div>

      <h3>Your Events</h3>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((e) => (
          <div
            key={e._id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "8px",
            }}
          >
            <p>
              <b>{e.title}</b> — <i>{e.status}</i>
            </p>
            <p>
              {new Date(e.startTime).toLocaleString()} →{" "}
              {new Date(e.endTime).toLocaleString()}
            </p>
            {e.status === "BUSY" && (
              <button onClick={() => makeSwappable(e._id)}>
                Make Swappable
              </button>
            )}
          </div>
        ))
      )}

      <button
        onClick={logout}
        style={{
          marginTop: "20px",
          backgroundColor: "#e74c3c",
          color: "white",
          padding: "8px 15px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
