// FileUploadHandler.jsx
import { useNavigate } from 'react-router-dom';
import PDFUploadPage from '../pages/NotesPDFUploadPage';

const NotesFileUploadHandler = ({ onFileSelect, url }) => {
    const navigate = useNavigate();

    const handleFileSelect = (selectedFile) => {
        onFileSelect(selectedFile);
        navigate(url);
    };

    return (
        <PDFUploadPage onFileSelect={handleFileSelect} />
    );
};

export default NotesFileUploadHandler;
