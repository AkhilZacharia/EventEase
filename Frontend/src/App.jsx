import React, { useState } from 'react';
import './App.css'
// import AdminDashboard from './components/admincomponents/AdminDashboard';
import EventPage from './components/usercomponents/Sample';
// import SeatSelection from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { Route, Routes } from 'react-router-dom'
import EventForm from './components/organizercomponents/Addevent';
import NavbarOrganizer from './components/organizercomponents/NavbarOrganizer';
import Myevents from './components/organizercomponents/Myevents';
import AdminNavbar from './components/admincomponents/AdminNavbar';
import ApproveEvent from './components/admincomponents/ApproveEvent';
import ApproveUser from './components/admincomponents/ApproveUser';
import AdminRoutes from './components/protect/AdminRoutes';
import UserRoutes from './components/protect/UserRoutes';
import OrganizerRoutes from './components/protect/OrganizerRoutes';
import Payment from './components/payment/Payment';
import Navbar from './components/usercomponents/Navbar';
import EventBook from './components/usercomponents/EventBook';
import Home from './components/usercomponents/Home';
// import AdminDashboard from './components/AdminDashboard';

function App() {

  return (
    <>
      {/* <SeatSelection totalSeats={30} /> */}
      {/* <AdminDashboard /> */}
      {/* {<NavbarOrganizer /> */}
    {/*<EventForm /> */}
    {/* <Myevents /> */}
    {/* <AdminNavbar/> */}
      <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        
          <Route element={<AdminRoutes/>}>
            <Route path='/approveUser' element={<AdminNavbar child={ <ApproveUser />}/>}></Route>
            <Route path='/approveEvent' element={<AdminNavbar child={ <ApproveEvent />}/>}></Route>
          </Route>

          <Route element={<OrganizerRoutes />}>
            <Route path='/myevents' element={<NavbarOrganizer child={  <Myevents />}/>}></Route>
            <Route path='/eventform' element={<NavbarOrganizer child={ <EventForm />}/>}></Route>
          </Route>

          <Route element={<UserRoutes/>}>
            <Route path='/home' element={<Navbar child={ <EventPage />}/>}></Route>
            <Route path='/home2' element={<Navbar child={ <Home />}/>}></Route>
            <Route path='/eventbook' element={<Navbar child={<EventBook/>}/>}></Route>
            <Route path='/payment' element={ <Payment/>}></Route>
          </Route>
          
      </Routes>
     
    </>
  )
}

export default App
