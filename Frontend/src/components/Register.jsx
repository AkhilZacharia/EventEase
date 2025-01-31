import React, { useState } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, Grid2, Box } from '@mui/material';
import './Register.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const[form,setForm]=useState({  
    Name: '',
    Email: '',
    Password: '',
    Role: 'User',
  }) 
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  
   const navigate=useNavigate();

  // function validate()   {
  //   let isValid = true;
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   if (!emailRegex.test(form.Email)) {
  //     setEmailError('Please enter a valid email.');
  //     isValid = false;
  //   } else {
  //     setEmailError('');
  //   }
  //   const passwordRegex = /^(?=.*\d).{5,}$/;
  //   if (!passwordRegex.test(form.Password)) {
  //     setPasswordError('Password must be at least 5 characters long and contain at least one number.');
  //     isValid = false;
  //   } else {
  //     setPasswordError('');
  //   }
  //   const nameRegex = /^[A-Z][a-zA-Z]{1,}$/;
  //   if (!nameRegex.test(form.Name)) {
  //     setNameError('Name must start with a capital letter and be at least 2 characters long');
  //     isValid = false;
  //   } else {
  //     setNameError('');
  //   }
  //   const phoneRegex = /^(?=.*\d).{6,}$/;
  //   if (!phoneRegex.test(form.Phone)) {
  //     setPhoneError('Phone no must be at least 6 digits.');
  //     isValid = false;
  //   } else {
  //     setPhoneError('');
  //   }
  //   return isValid;
  // };

  // const register = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     registerValue()
  //   }
  // };

  function registerValue(){
    console.log(form);
    axios.post('http://localhost:3000/login/add/',form).then((res)=>{
     alert(res.data.message);
        navigate('/');
    }).catch((error)=>{
     alert('Failed');
    })
   }
   /**************************************************/
 
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = (e) => {

  //   let validationErrors = {};

  //   if (!formData.name) validationErrors.name = 'Name is required';
  //   if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) validationErrors.email = 'Valid email is required';
  //   if (!formData.password || formData.password.length < 6) validationErrors.password = 'Password must be at least 6 characters';

  //   setErrors(validationErrors);

  //   if (Object.keys(validationErrors).length === 0) {
  //     console.log('Form Submitted:', formData);
  //     // Add form submission logic here (e.g., API call)
  //   }
  // };

  return (
    <div className="register-container">
      <Grid2 container spacing={2} justifyContent="center">
        <Grid2 item xs={12} sm={6} md={6} className="form-box">
          <h2>Create an Account</h2>
            <TextField
              fullWidth
              name="Name"
              value={form.Name}
              onChange={handleChange}
              label="Name"
              variant="outlined"
              margin="normal"
              error={Boolean(errors.name)}
              helperText={errors.name}
            />

            <TextField
              fullWidth
              name="Email"
              value={form.Email}
              onChange={handleChange}
              label="Email"
              variant="outlined"
              margin="normal"
              error={Boolean(errors.email)}
              helperText={errors.email}
            />

            <TextField
              fullWidth
              name="Password"
              value={form.Password}
              onChange={handleChange}
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              error={Boolean(errors.password)}
              helperText={errors.password}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                name="Role"
                value={form.Role}
                onChange={handleChange}
                label="Role"
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Organizer">Organizer</MenuItem>
              </Select>
            </FormControl>

            <Button onClick={registerValue} variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
        </Grid2>

        <Grid2 item xs={12} sm={6} md={6} className="description">
          <h3>Welcome to Our Platform</h3>
          <p>Join us today to enjoy a seamless experience for event booking and enjoying the awesomr experience.</p>
          {/* You can add an image here if desired */}
          {/* <img src="your-image-url.jpg" alt="Description" /> */}
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Register;
