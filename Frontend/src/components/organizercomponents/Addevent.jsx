import React, { useState } from 'react';
import { TextField, Button, Grid2, Box, Input, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axiosInstance from '../interceptor/axiosInterceptor';

import './Addevnt.css';

const EventForm = () => {
  const[form,setForm]=useState({  
    title: '',
    date: "",
    category: "",
    time: "",
    duration: "",
    details:"",
    location: "",
    totalTickets: 0,
    ticketPrice: 0,
    poster: ""
  }) 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const navigate=useNavigate();

  function addevent(){
    console.log(form);
    axiosInstance.post('/org/addevent/',form).then((res)=>{
     alert(res.data.message);
        navigate('/myevents');
    }).catch((error)=>{
     alert('Failed');
    })
   }

  return (
    <Box className="container">
      <Typography variant="h3" className="title">
        Add Event
      </Typography>
      <Box className="formContainer">
        <Grid2 container spacing={2}>
          <Grid2 item xs={12} sm={6} md={4}>
            <TextField label="Event Title" variant="outlined" name="title" value={form.title} onChange={handleChange} fullWidth className="input" />
          </Grid2>

          <Grid2 item xs={12} sm={6} md={4}>
            <TextField label="Category" variant="outlined" name="category" value={form.category} onChange={handleChange} fullWidth className="input" />
          </Grid2>

          <Grid2 item xs={12} sm={6} md={4}>
            <TextField label="Date" type="date" variant="outlined" name="date" value={form.date} onChange={handleChange} fullWidth className="input" InputLabelProps={{ shrink: true }} />
          </Grid2>

          <Grid2 item xs={12} sm={6} md={4}>
            <TextField label="Time" type="time" variant="outlined" name="time" value={form.time} onChange={handleChange} fullWidth className="input" InputLabelProps={{ shrink: true }} />
          </Grid2>

          <Grid2 item xs={12} sm={6} md={4}>
            <TextField label="Duration" variant="outlined" name="duration" value={form.duration} onChange={handleChange} fullWidth className="input" />
          </Grid2>

          <Grid2 item xs={12} sm={6} md={4}>
            <TextField label="Location" variant="outlined" name="location" value={form.location} onChange={handleChange} fullWidth className="input" />
          </Grid2>

          <Grid2 item xs={12} sm={6} md={4}>
            <TextField label="Total Tickets" type="number" name="totalTickets" value={form.totalTickets} onChange={handleChange} variant="outlined" fullWidth className="input" />
          </Grid2>

          <Grid2 item xs={12} sm={6} md={4}>
            <TextField label="Ticket Price" type="number" variant="outlined" name="ticketPrice" value={form.ticketPrice} onChange={handleChange} fullWidth className="input" />
          </Grid2>

          <Grid2 item xs={12} sm={6} md={4}>
            <Typography variant="body1" className="posterLabel">
              Upload Event Poster
            </Typography>
            <Input type="file" name="poster" value={form.poster} onChange={handleChange} className="posterInput" />
          </Grid2>

          <Grid2 item xs={12}>
            <TextField
              label="Details"
              variant="outlined"
              fullWidth
              multiline
              rows={6}
              name="details" value={form.details} onChange={handleChange}
              className="textArea"
            />
          </Grid2>

          <Grid2 item xs={12}>
            <Button variant="contained" color="primary" fullWidth className="submitButton" onClick={addevent}>
              Submit Event
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default EventForm;
