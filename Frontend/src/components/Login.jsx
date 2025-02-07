import React, { useState} from 'react';
import { TextField, Button, Container, Typography, Box, Grid2, Paper, CssBaseline } from '@mui/material';
import './Login.css';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const[form,setForm]=useState({
    Email:'',
    Password:''
  }) 
  const navigate=useNavigate();

  function validate()   {
    let isValid = true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.Email)) {
      setEmailError('Please enter a valid email.');
      isValid = false;
    } else {
      setEmailError('');
    }
    const passwordRegex = /^(?=.*\d).{5,}$/;
    if (!passwordRegex.test(form.Password)) {
      setPasswordError('Password must be at least 5 characters long and contain at least one number.');
      isValid = false;
    } else {
      setPasswordError('');
    }
    return isValid;
  };

  const login = (e) => {
    e.preventDefault();
    if (validate()) {
      loginValue()
    }
  };

  function loginValue(){
     console.log(form);
    axios.post('http://localhost:3000/login/',form).then((res)=>{
     alert(res.data.message);
     if(res.data.key){
       sessionStorage.setItem('logintoken',res.data.key); 
        const decoded = jwtDecode(res.data.key);
          // console.log(decoded);  
       if(decoded.Role=='Admin') {
        console.log('Admin');
          navigate('/approveuser');
       }
       else if(decoded.Role =="Organizer") {
        console.log("organizer");
          navigate('/myevents');
        }
        else if(decoded.Role =="User"){
          console.log('User');
           navigate('/home');
        }
        }else {
            navigate('/');
        }
        
    }).catch((error)=>{
      console.log(error);
      
     alert('Invalid Login');
    })
   }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Paper elevation={6} className="login-box">
        <Grid2 container>
          <Grid2 item xs={12} sm={6} className="image-container">
            <img src="https://soco-images.s3.ap-south-1.amazonaws.com/e5bf77f8711723873988b959e2051dc0.jpeg" alt="Event" className="login-image" />
            <h1 className="text-overlay">EventEase</h1>
          </Grid2>
          <Grid2 item xs={12} sm={6} className="form-containerlogin ">
            <Box
              component="form"
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 3 }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                Login
              </Typography>
              <TextField label="Email" name="Email" type="email"  required onChange={(e)=>{
          setForm({...form,Email:e.target.value})                     
        }}/><p style={{color:'maroon'}}>{emailError}</p>
              <TextField label="Password" name="Password" type="password"   required onChange={(e)=>{
          setForm({...form,Password:e.target.value})                    
        }} /><p style={{color:'maroon'}}>{passwordError}</p> 
              <Button variant="contained" color="primary" onClick={login}> Login </Button> 
              <Button variant="outlined" color="secondary" type="button" fullWidth href='/register'>
                Register
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
}

export default Login;
