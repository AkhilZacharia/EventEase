import React, { useState, useEffect } from 'react';
import { Grid2, Paper, Typography, Button, Box } from '@mui/material';
import axiosInstance from '../interceptor/axiosInterceptor';
import './ApproveEvent.css'; 

const ApproveEvent = () => {
  const [events, setEvents] = useState([]);
  const [approvedUsers, setApprovedEvents] = useState([]); 
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);

  useEffect(() => {
    Load();
  }, []);

function Load() {
  axiosInstance.get('/events/').then((res) => {
    const { EventA, EventUn } = res.data;
    setEvents(EventUn); 
    setApprovedEvents(EventA);
    setPendingCount(EventUn.length);
    setApprovedCount(EventA.length);
    // console.log(EventUn);
    // console.log(EventA);
    })
    .catch((error) => {
      console.log(error);
      
      alert('Failed to fetch events');
    });
}
  const handleApprove = (eventId) => {
    axiosInstance.get(`/approve-event/${eventId}`)
      .then((res) => {
        alert(`Event with ID: ${eventId} has been approved`);
        Load(); 
      })
      .catch((error) => {
        alert('Failed to approve event');
      });
  };

  const handleDelete = (eventId) => {
    axiosInstance.delete(`/delete/${eventId}`)
      .then((res) => {
        alert(`Event with ID: ${eventId} has been deleted`);
        Load(); 
      })
      .catch((error) => {
        alert('Failed to delete event');
      });
  };
  const handleBlock = (eventId) => {
    axiosInstance.get(`/block-event/${eventId}`)
      .then((res) => {
        alert(`Event with ID: ${eventId} has been blocked`);
        Load(); 
      })
      .catch((error) => {
        alert('Failed to Block event');
      });
  };

  return (
    <>
    <Grid2 container spacing={1} justifyContent="center" className="event-Grid2">
      {events.map((event) => (
        <Grid2 item xs={12} sm={6} md={4} key={event._id}>
          <Paper className="event-card">
            <Box className="event-header">
              <Typography variant="h6" className="event-title">{event.title}</Typography>
              <Typography variant="body2" className="event-date">{new Date(event.date).toLocaleDateString()}</Typography>
              <Typography variant="body2" className="event-location">{event.location}</Typography>
              <Box className="event-status">
                {event.approved ? 'Approved' : 'Pending'}
              </Box>
            </Box>

            <Typography variant="body1" className="event-details" paragraph>
              {event.details}
            </Typography>

            <Typography variant="body2" className="event-details">
              <strong>Total Tickets:</strong> {event.totalTickets}
            </Typography>
            <Typography variant="body2" className="event-details">
              <strong>Ticket Price:</strong> ${event.ticketPrice}
            </Typography>

            <Box className="event-buttons">
              <Button
                variant="contained"
                className="approve-button"
                onClick={() => handleApprove(event._id)}
                disabled={event.approved}
              >
                Approve
              </Button>
              <Button
                variant="outlined"
                className="delete-button"
                onClick={() => handleDelete(event._id)}
              >
                Delete
              </Button>
            </Box>
          </Paper>
        </Grid2>
      ))}
    </Grid2>
    {/*************************************************/ }
    <h3>Approved Events</h3>
    <Grid2 container spacing={1} justifyContent="center" className="event-Grid2">
      {approvedUsers.map((event) => (
        <Grid2 item xs={12} sm={6} md={4} key={event._id}>
          <Paper className="event-card">
            <Box className="event-header">
              <Typography variant="h6" className="event-title">{event.title}</Typography>
              <Typography variant="body2" className="event-date">{new Date(event.date).toLocaleDateString()}</Typography>
              <Typography variant="body2" className="event-location">{event.location}</Typography>
              <Box className="event-status">
                {event.approved ? 'Approved' : 'Pending'}
              </Box>
            </Box>

            <Typography variant="body1" className="event-details" paragraph>
              {event.details}
            </Typography>

            <Typography variant="body2" className="event-details">
              <strong>Total Tickets:</strong> {event.totalTickets}
            </Typography>
            <Typography variant="body2" className="event-details">
              <strong>Ticket Price:</strong> ${event.ticketPrice}
            </Typography>

            <Box className="event-buttons">
              <Button
                variant="outlined"
                className="block-button"
                onClick={() => handleBlock(event._id)}
              >
                Block
              </Button>
            </Box>
          </Paper>
        </Grid2>
      ))}
    </Grid2>
    </>
  );
};

export default ApproveEvent;
