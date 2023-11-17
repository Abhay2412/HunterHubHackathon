import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'
import CustomTypeAnimation from '../components/typingAnimation';

function HomePage() {
  
  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    opacity: 0.6, // Set the opacity to 80%
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >

      <img
        src="https://assets-global.website-files.com/60abcbf13c9af64a88390582/6230f5f37b84136a6985b3df_899889.jpg"
        alt="Background"
        style={backgroundStyle}
      />

      {/* Main title */}
      <CustomTypeAnimation/>

      <Typography variant="h2" align="center" sx={{fontFamily: "inherit", fontStyle: "italic", fontWeight: "lighter"}} gutterBottom>
        With {" "} <span style={{fontFamily: "cursive", color: "#3EB489", fontWeight: "bold"}}>Scholarly</span>
      </Typography>

      {/* Buttons stacked on top of each other */}
      <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
        <motion.div whileHover={{ scale: 1.1 }}>
        <Button variant="contained" style={{ marginBottom: '10px', borderRadius: '15px', fontSize: '1.4rem', backgroundColor: "#3EB489", color: "white", textTransform: "none"}}>
          Upload & Start Learning! <span>&#x2192;</span>
        </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }}>
        <Button variant="outlined" style={{ marginBottom: '10px', borderRadius: '15px', fontSize: '1.4rem', border: "2px solid black", color: "black", textTransform: "none"}}>
          Write Scholarship Applications <span>&#x2192;</span>
        </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default HomePage;