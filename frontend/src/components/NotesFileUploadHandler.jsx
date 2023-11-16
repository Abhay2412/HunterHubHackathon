// FileUploadHandler.jsx
import { useNavigate } from 'react-router-dom';
import PDFUploadPage from '../pages/PDFUploadPage';

const FileUploadHandler = ({ onFileSelect }) => {
    const navigate = useNavigate();

    const handleFileSelect = (selectedFile) => {
        onFileSelect(selectedFile);
        navigate('/summarizer');
    };

    return (
        <PDFUploadPage onFileSelect={handleFileSelect} />
    );
};

export default FileUploadHandler;
