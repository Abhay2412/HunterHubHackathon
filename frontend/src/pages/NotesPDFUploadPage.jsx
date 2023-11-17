// PDFUploadPage.jsx
import React from 'react';
import PDFUploadComponent from '../components/PDFUploadComponent';

const PDFUploadPage = ({ onFileSelect, onSummarizerClick, onScholarshipClick }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <PDFUploadComponent onPDFUpload={onFileSelect} onSummarizerClick={onSummarizerClick} onScholarshipClick={onScholarshipClick} />
    </div>
  );
};

export default PDFUploadPage;
