
import './NavbarOzr.css';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const NavbarOrganizer = () => {
  return (
    <AppBar position="sticky" className="appBar">
      <Toolbar className="toolbar">
        <Box className="leftSection">
          <img src="/path/to/logo.png" alt="Logo" className="logo" />
          <Typography variant="h6" className="organizerText">
            Organizer
          </Typography>
        </Box>

        <Box className="rightSection">
          <Button className="navButton">Events</Button>
          <Button className="navButton">My Event</Button>
          <Button className="navButton">Add Event</Button>
          <Button className="navButton">Log Out</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarOrganizer;
