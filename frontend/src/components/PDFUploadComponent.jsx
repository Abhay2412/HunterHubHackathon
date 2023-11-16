// PDFUploadComponent.jsx
import React from 'react';

const PDFUploadComponent = ({ onPDFUpload }) => {

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onPDFUpload(file);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <input
        type="file"
        onChange={handleFileChange}
        accept="application/pdf"
        style={{ display: 'block', marginBottom: '10px' }}
      />
    </div>
  );
};

export default PDFUploadComponent;