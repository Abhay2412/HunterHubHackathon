// UploadPage.jsx
import React from 'react';
import { Typography, Button } from '@mui/material';
import { motion } from 'framer-motion'
import { useNavigate, Link } from "react-router-dom";

const UploadPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = React.useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSummarizerClick = () => {
    if (file) {
      navigate('/summarizer', { state: { file } });
    } 
  };
  const handleScholarshipClick = () => {
    navigate('/recommended-scholarships');
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <div
          className="background-image"
          style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1483546416237-76fd26bbcdd1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Add the URL of your background image
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.8,
          zIndex: -1
          }}
        />
      <Typography variant="h2" align="center" sx={{fontFamily: "inherit", fontStyle: "italic", fontWeight: "lighter"}} gutterBottom>
        Upload Your File & {" "} <span style={{fontFamily: "cursive", color: "#3EB489", fontWeight: "bold"}}>Succeed</span>
      </Typography>
      <input
        type="file"
        onChange={handleFileChange}
        accept="application/pdf"
        style={{ display: 'block', marginBottom: '20px' }}
      />
       <motion.div whileHover={{ scale: 1.1 }}>
          <Button variant="contained" onClick={handleSummarizerClick} style={{ marginBottom: '10px', borderRadius: '15px', fontSize: '1.4rem', backgroundColor: "#3EB489", color: "white", textTransform: "none"}}>
            Summarize & Learn! <span>&#x2192;</span>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Button variant="outlined" onClick={handleScholarshipClick} style={{ marginBottom: '10px', borderRadius: '15px', fontSize: '1.4rem', border: "2px solid black", color: "black", textTransform: "none"}}>
            Scholarship Application Help <span>&#x2192;</span>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }}>
        <Link to={"/"}>
          <Button color='primary' variant="contained" style={{ marginBottom: '10px', borderRadius: '15px', fontSize: '1.4rem', textTransform: "none"}}>
          <span>&#x2190;</span> Back Home
          </Button>
        </Link>
        </motion.div>
    </div>
    </div>
  );
};

export default UploadPage;
