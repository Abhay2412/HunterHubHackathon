import './App.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import GPTPromptPage from './pages/GPTPromptPage';
import HomePage from './pages/HomePage';
import ParsePage from './pages/ParsePage';
import React from 'react';
import RecommendedPage from './pages/RecommendedPage';
import ScholarshipHelpPage from './pages/ScholarshipHelpPage';
import SummarizerPage from './pages/SummarizerPage';
import UploadPage from './pages/UploadPage';

function App() {

    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/prompt" element={<GPTPromptPage />} />
                    <Route path="/scholarship-help" element={<ScholarshipHelpPage/>} />
                    <Route path="/recommended-scholarships" element={<RecommendedPage />} />
                    <Route path="/parse" element={<ParsePage />} />
                    <Route path="/summarizer" element={<SummarizerPage/>} />
                    <Route path="/upload" element={<UploadPage/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
