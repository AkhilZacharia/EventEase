import React, { useState } from 'react'
import { FaMusic, FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';
import './EventBook.css';
import { useLocation, useNavigate } from 'react-router-dom';
const EventBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.data;
  // console.log(message);
  
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [numTickets, setNumTickets] = useState(1);
    
    const ticketPrice = message.ticketPrice; 
    
    const handleTicketChange = (event) => {
      setNumTickets(event.target.value);
    };
  
    const calculateTotalPrice = () => {
      return numTickets * ticketPrice;
    };
    
    const goToPayment = () => {
      const detail = {
        amount:calculateTotalPrice(),
        tickets: numTickets,
        event_id:message._id,
        event:message.title
      }
      console.log('home',detail);
      navigate('/payment', { state: detail });
    };

   return (
    <div className="event-page">
      {!showBookingForm ? ( <>
        <div className="content">
          <div className="image-container">
            <img src="/img/5457716.jpg" alt="Event" />
          </div>

          <div className="event-info">
            <div className="event-details">
              <div className="banner">
            <h3>{message.title}</h3>
              </div>
              <div className="event-item">
                <FaMusic className="event-icon" />
                <span>{message.category}</span>
              </div>

              <div className="event-item">
                <FaCalendarAlt className="event-icon" />
                <span>{message.date} | {message.time}</span>
              </div>

              <div className="event-item">
                <FaMapMarkerAlt className="event-icon" />
                <span>{message.title}</span>
              </div>

              <hr />

              <div className="ticket-price">
                <span>From ₹ {message.ticketPrice} onwards</span>
              </div>

              <button className="buy-now" onClick={() => setShowBookingForm(true)}>
                BOOK NOW
              </button>
            </div>
          </div>
          
        </div>
        <div className="event-description">
        <h3>Event Details</h3>
        <p>
        {message.details}
        </p>
      </div>
        </>
      ) : (
        <div className="booking-form">
          <h2>Booking Details</h2>

          <div className="form-group">
            <label htmlFor="ticket-count">Number of Tickets:</label>
            <input
              type="number"
              id="ticket-count"
              value={numTickets}
              min="1"
              onChange={handleTicketChange}
            />
          </div>

          <div className="form-group">
            <h3>Total Price: ₹{calculateTotalPrice()}</h3>
          </div>

          <button className="back-button" onClick={() => setShowBookingForm(false)}>
            BACK
          </button>

          <button className="confirm-booking" onClick={() => goToPayment()}>Confirm Booking</button>
        </div>
      )}

    </div>
  );
};

export default EventBook