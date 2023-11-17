// FileUploadHandler.jsx
import { useNavigate } from 'react-router-dom';
import PDFUploadPage from '../pages/NotesPDFUploadPage';

const NotesFileUploadHandler = ({ onFileSelect }) => {
  const navigate = useNavigate();

  const handleFileSelect = (selectedFile) => {
    onFileSelect(selectedFile);
  };

  const handleSummarizerClick = () => {
    navigate('/summarizer');
  };

  const handleScholarshipClick = () => {
    navigate('/recommended-scholarships');
  };

  return (
    <PDFUploadPage onFileSelect={handleFileSelect} onSummarizerClick={handleSummarizerClick} onScholarshipClick={handleScholarshipClick} />
  );
};

export default NotesFileUploadHandler;

