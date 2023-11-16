// PDFUploadPage.jsx
import React from 'react';
import PDFUploadComponent from '../components/PDFUploadComponent';

const PDFUploadPage = ({ onFileSelect }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <PDFUploadComponent onPDFUpload={onFileSelect} />
    </div>
  );
};

export default PDFUploadPage;
