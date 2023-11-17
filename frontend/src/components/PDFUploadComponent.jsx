// PDFUploadComponent.jsx
import React from 'react';
import { Typography, Button } from '@mui/material';
import { motion } from 'framer-motion'

const PDFUploadComponent = ({ onPDFUpload, onSummarizerClick, onScholarshipClick }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onPDFUpload(file);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <Typography variant="h2" align="center" sx={{fontFamily: "inherit", fontStyle: "italic", fontWeight: "lighter"}} gutterBottom>
        Upload Your File & {" "} <span style={{fontFamily: "cursive", color: "#3EB489", fontWeight: "bold"}}>Succeed</span>
      </Typography>
      <input
        type="file"
        onChange={handleFileChange}
        accept="application/pdf"
        style={{ display: 'block', marginBottom: '10px' }}
      />
       <motion.div whileHover={{ scale: 1.1 }}>
        <Button variant="contained" style={{ marginBottom: '10px', borderRadius: '15px', fontSize: '1.4rem', backgroundColor: "#3EB489", color: "white", textTransform: "none"}}>
          Summarize & Learn! <span>&#x2192;</span>
        </Button>
        </motion.div>
      <button onClick={onScholarshipClick}>Scholarship</button>
    </div>
  );
};

export default PDFUploadComponent;