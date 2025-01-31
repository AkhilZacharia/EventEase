import React, { useState } from 'react';
import './App.css'
// import AdminDashboard from './components/admincomponents/AdminDashboard';
import EventPage from './components/usercomponents/Sample';
// import SeatSelection from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { Route, Routes } from 'react-router-dom'

// import AdminDashboard from './components/AdminDashboard';

function App() {

  return (
    <>
      {/* <SeatSelection totalSeats={30} /> */}
      {/* <Login/>
      <Register /> */}
      {/* <AdminDashboard /> */}
      <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/home' element={ <EventPage />}></Route>
      </Routes>
     
    </>
  )
}

export default App
