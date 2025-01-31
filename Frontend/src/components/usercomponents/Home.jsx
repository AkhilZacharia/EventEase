import React, { useState } from 'react';
import './css/home.css'

const SeatSelection = ({ totalSeats }) => {
  // Let's assume totalSeats is an array of seat objects
  const rows = 5;  // For example, 5 rows of seats
  const cols = totalSeats / rows;  // The number of columns based on totalSeats

  // Initialize state for selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Function to toggle seat selection
  const toggleSeatSelection = (seatId) => {
    setSelectedSeats((prevSelected) => {
      // Check if seat is already selected
      if (prevSelected.includes(seatId)) {
        return prevSelected.filter((id) => id !== seatId);  // Remove if already selected
      } else {
        return [...prevSelected, seatId];  // Add if not selected
      }
    });
  };

  // Render rows and seats
  const renderSeats = () => {
    let seatId = 1; // Seat ID for tracking selection

    const seats = [];
    for (let row = 0; row < rows; row++) {
      const seatRow = [];
      for (let col = 0; col < cols; col++) {
        const isSelected = selectedSeats.includes(seatId);  // Check if the seat is selected
        seatRow.push(
          <button
            key={seatId}
            className={`seat ${isSelected ? 'selected' : ''}`}
            onClick={() => toggleSeatSelection(seatId)}
          >
            {seatId}
          </button>
        );
        seatId++; // Increment seat ID
      }
      seats.push(
        <div key={row} className="seat-row">
          {seatRow}
        </div>
      );
    }
    return seats;
  };

  return (
    <div className="theater">
      <h2>Select Your Seats</h2>
      <div className="seats-container">
        {renderSeats()}
      </div>
      <div className="selected-seats">
        <p>Selected Seats: {selectedSeats.join(', ')}</p>
      </div>
    </div>
  );
};

export default SeatSelection;
