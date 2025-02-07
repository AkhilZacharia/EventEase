import React, { useState, useEffect } from 'react';
import axiosInstance from '../interceptor/axiosInterceptor';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [events, setEvents] = useState([]);
    const [bookings, setBookings] = useState([]);
  
    useEffect(() => {
      axiosInstance.get('/user/home/').then((res) => {  
        console.log(res.data);
        setEvents(res.data); 
        //  console.log(events);
      }).catch((error) => {
        alert('Failed to fetch events');
      });
  
    //   axiosInstance.get('/org/booking/').then((res) => {
    //     setBookings(res.data);  
    //   }).catch((error) => {
    //     alert('Failed to fetch bookings');
    //   });
    }, []);
  
    const book = (eventId) => {
      const event = events.find((event) => event._id === eventId);
      navigate('/eventbook', {state: { data:event }});
    };
  return (
    <div className="event-container">
        <h2 className="event-title">Upcoming Events</h2>
        <div className="event-banners">
          {events.map((event, index) => (
            <div key={index} className="event-banner">
              <img src={event.imageUrl} alt={event.name} className="event-banner-img" />
              <div className="event-banner-info">
                <h3>{event.name}</h3>
                <p>Date: {event.date}</p>
                <p>Total Tickets: {event.totalTickets}</p>
                <p>Remaining Tickets: {event.remainingTickets}</p>
                <button className="book-btn" onClick={() => book(event._id)}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Home