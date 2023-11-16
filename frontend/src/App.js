import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import GPTPromptPage from './pages/GPTPromptPage';
import RecommendedPage from './pages/RecommendedPage';
import ParsePage from './pages/ParsePage';
import SummarizerPage from './pages/SummarizerPage';


import './App.css';

function App() {

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/prompt" element={<GPTPromptPage />} />
          <Route path="/scholarships" element={<RecommendedPage />} />
          <Route path="/parse" element={<ParsePage />} />
          <Route path="/summarizer" element={<SummarizerPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
