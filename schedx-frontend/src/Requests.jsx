import React, { useEffect, useState } from "react";
import axios from "axios";

function Requests() {
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/swap", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;
      setIncoming(data.incoming || []);
      setOutgoing(data.outgoing || []);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  const respondToRequest = async (id, accept) => {
    try {
      await axios.post(
        `http://localhost:5000/api/swap/response/${id}`,
        { accept },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(accept ? "Swap Accepted ✅" : "Swap Rejected ❌");
      fetchRequests();
    } catch (err) {
      console.error("Error responding to swap:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Swap Requests</h2>

      <div>
        <h3>Incoming Requests</h3>
        {incoming.length === 0 ? (
          <p>No incoming requests.</p>
        ) : (
          incoming.map((req) => (
            <div
              key={req._id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "8px",
              }}
            >
              <p>
                <b>{req.fromUser?.name}</b> wants to swap{" "}
                <i>{req.theirSlot?.title}</i> with your <i>{req.mySlot?.title}</i>
              </p>
              <button
                onClick={() => respondToRequest(req._id, true)}
                style={{ marginRight: "10px", background: "green", color: "white", padding: "5px" }}
              >
                Accept
              </button>
              <button
                onClick={() => respondToRequest(req._id, false)}
                style={{ background: "red", color: "white", padding: "5px" }}
              >
                Reject
              </button>
            </div>
          ))
        )}
      </div>

      <div>
        <h3>Outgoing Requests</h3>
        {outgoing.length === 0 ? (
          <p>No outgoing requests.</p>
        ) : (
          outgoing.map((req) => (
            <div
              key={req._id}
              style={{
                border: "1px solid gray",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "8px",
              }}
            >
              <p>
                You requested <i>{req.theirSlot?.title}</i> from{" "}
                <b>{req.toUser?.name}</b> (Status: {req.status})
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Requests;
