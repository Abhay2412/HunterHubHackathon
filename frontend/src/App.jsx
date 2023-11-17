import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GPTPromptPage from './pages/GPTPromptPage';
import RecommendedPage from './pages/RecommendedPage';
import ParsePage from './pages/ParsePage';
import SummarizerPage from './pages/SummarizerPage';
import FileUploadHandler from './components/NotesFileUploadHandler'; 
import ScholarshipHelpPage from './pages/ScholarshipHelpPage';

import './App.css';

function App() {
    const [file, setNoteSummarizerFile] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);

    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/prompt" element={<GPTPromptPage />} />
                    <Route path="/scholarship-help" element={<ScholarshipHelpPage file={resumeFile}/>} />
                    <Route path="/recommended-scholarships" element={<RecommendedPage />} />
                    <Route path="/parse" element={<ParsePage />} />
                    <Route path="/summarizer" element={<SummarizerPage file={file} />} />
                    <Route path="/upload-notes" element={<FileUploadHandler onFileSelect={setNoteSummarizerFile} url='/summarizer' />} />
                    <Route path="/upload-resume" element={<FileUploadHandler onFileSelect={setResumeFile} url='/scholarship-help' />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
