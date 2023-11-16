import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from "react-router-dom";
import videoSrc from "../media/production_ID_4253147.mp4";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <video src={videoSrc} autoPlay loop muted/>
      <div className='info'>
        <Typography variant="h1">On The House</Typography>
        <Typography variant="h4" sx={{fontStyle: "italic", fontFamily: "Georgia"}}>Find Your Next Meal Today.</Typography>
        <div>
          {/* <Button component={Link} to="/dashboard" variant="contained" color="warning" sx={{ fontStyle: "oblique", mr: 1 }}>View Recipes</Button> */}
          {/* <Button component={Link} to="/#" variant="contained" color="success" sx={{ mr: 1 }}>Log In!</Button>
          <Button component={Link} to="/#" variant="contained" color="info">Sign Up!</Button> */}
          {/* <Button component={Link} to="/login" variant="contained" color="success" sx={{ mr: 1 }}>Log In!</Button>
          <Button component={Link} to="/signup" variant="contained" color="info">Sign Up!</Button> */}
          <Button component={Link} to="/scholarships" variant="contained" color="info" sx={{ mr: 1 }}>Apply for Scholarships</Button>
          <Button component={Link} to="/summarizer" variant="contained" color="info" sx={{ mr: 1 }}>Summarize Notes</Button>
        </div>
      </div>
    </>
  );
};

export default HomePage;