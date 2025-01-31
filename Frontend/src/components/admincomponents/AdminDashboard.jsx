import React, { useState } from "react";
import "../css/AdminDashboard.css";

const AdminDashboard = () => {
  const [verifiedUsers, setVerifiedUsers] = useState(25);
  const [totalBookings, setTotalBookings] = useState(120);
  const [eventDetails, setEventDetails] = useState([
    { name: "Concert", date: "2025-02-15", location: "Stadium", ticketsSold: 50 },
    { name: "Theater", date: "2025-03-05", location: "Grand Hall", ticketsSold: 70 },
  ]);

  const handleVerifyUser = () => {
    // Simulate user verification logic
    setVerifiedUsers(verifiedUsers + 1);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
        </header>

        <section className="stats-section">
          <div className="stats-card">
            <h2>Verified Users</h2>
            <p>{verifiedUsers}</p>
            <button onClick={handleVerifyUser}>Verify New User</button>
          </div>

          <div className="stats-card">
            <h2>Total Bookings</h2>
            <p>{totalBookings}</p>
          </div>

          <div className="stats-card">
            <h2>Upcoming Events</h2>
            <ul>
              {eventDetails.map((event, index) => (
                <li key={index}>
                  <strong>{event.name}</strong><br />
                  Date: {event.date} <br />
                  Location: {event.location} <br />
                  Tickets Sold: {event.ticketsSold}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="booking-status">
          <h2>Booking Status</h2>
          <div className="status-card">
            <p>Upcoming Events: {eventDetails.length}</p>
            <p>Total Tickets Sold: {totalBookings}</p>
            <p>Available Seats: {500 - totalBookings}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
