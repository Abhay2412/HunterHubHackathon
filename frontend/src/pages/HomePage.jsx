import { Box, Button, Typography } from '@mui/material';

import { APPLICATION_COLORS } from '../utils/constants';
import CustomTypeAnimation from '../components/typingAnimation';
import { Link } from "react-router-dom";
import React from 'react';
import { motion } from 'framer-motion'

export default function HomePage() {
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <BackgroundImage />
      <MainTitle />
      <ActionButtons />
    </Box>
  );
};

const BackgroundImage = () => {
  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    opacity: 0.6, 
  };

  return (
    <img
      src="https://assets-global.website-files.com/60abcbf13c9af64a88390582/6230f5f37b84136a6985b3df_899889.jpg"
      alt="Background"
      style={backgroundStyle}
    />
  );
}

const MainTitle = () => (
  <>
    <CustomTypeAnimation />
    <Typography variant="h2" align="center" sx={{fontFamily: "inherit", fontStyle: "italic", fontWeight: "lighter"}} gutterBottom>
      With <span style={{fontFamily: "cursive", color: APPLICATION_COLORS.KEPPEL, fontWeight: "bold"}}>Scholarly</span>
    </Typography>
  </>
);

const ActionButtons = () => {
  const bounceAnimation = {
    y: [0, -4, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
    },
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
      <motion.div animate={bounceAnimation}>
        <Link to={"/upload"}>
          <Button variant="contained" sx={{ mb: 1, borderRadius: 2, fontSize: '1.4rem', backgroundColor: APPLICATION_COLORS.KEPPEL, color: "white", textTransform: "none"}}>
            Get Started! <span>&#x2192;</span>
          </Button>
        </Link>
      </motion.div>
    </Box>
  );
};