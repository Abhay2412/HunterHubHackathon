// GPTPrompt.jsx

import React, { useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import useFetchData from '../utils/useFetchData';

const GPTPrompt = ({ steps, triggerNextStep, candidateResume, apiUrl }) => {
  const [trigger, setTrigger] = useState(false);
  const scholarshipUrl = steps.url.value;
  const message = steps.msg ? steps.msg.value : "";

  const { loading, result } = useFetchData(apiUrl, {
    candidate_resume: candidateResume,
    scholarship_url: scholarshipUrl,
    message: message,
  });

  const renderText = (inputText) => {
    return inputText.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const handleTriggerNext = () => {
    setTrigger(true);
    triggerNextStep();
  };

  return (
    <div className="GPTPrompt" style={{ textAlign: "left", padding: "0 20px" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {renderText(result)}
          <div style={{ textAlign: "center", marginTop: 20 }}>
            {!trigger && <button onClick={handleTriggerNext}>Ask Again</button>}
          </div>
        </>
      )}
    </div>
  );
};

export default GPTPrompt