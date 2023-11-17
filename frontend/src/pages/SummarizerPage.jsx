import React, { useEffect, useState } from "react";
import { ThemeProvider } from 'styled-components';
import ChatBot from "react-simple-chatbot";
import FlashCard from "../components/FlashCard";
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";

const dummyFlashCards = [
    { questionContent: "What is an ecosystem?", answerContent: "A community of living organisms and their environment." },
    { questionContent: "How do ecosystems maintain balance?", answerContent: "Through interactions among plants, animals, and their surroundings." },
    { questionContent: "Define biodiversity in an ecosystem.", answerContent: "The variety of plant and animal life in a habitat." },
    { questionContent: "What role do decomposers play?", answerContent: "Breaking down organic matter and recycling nutrients." }
  ];

const SummarizerPage = ({ file: uploadedFile }) => {
    const [fileUrl, setFileUrl] = useState(null);

    useEffect(() => {
        if (uploadedFile) {
            const newFileUrl = URL.createObjectURL(uploadedFile);
            setFileUrl(newFileUrl);
        }
    }, [uploadedFile]);

    const steps = [
        {
            id: '1',
            message: 'Hello! I am your summarizer chatbot. I can help you summarize your PDF notes.',
            trigger: '2',
        },
        {
            id: '2',
            user: true,
            end: true,
        },
    ];

    const customStyle = {
        userBubble: {
          height: '85%', 
        },
      };

    const theme = {
        background: "#ede8e4",
        fontFamily: "Arial, Helvetica, sans-serif",
        headerBgColor: "#3EB489",
        headerFontColor: "#fff",
        headerFontSize: "15px",
        botBubbleColor: "#3EB489",
        botFontColor: "#fff",
        userBubbleColor: "#6F9CDE",
        userFontColor: "#fff",
        bubbleStyle: {
            textAlign: "left", 
            maxHeight: '100%',
            maxWidth: '100%', 
            padding: "10px", 
          },
    };

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    

    return (
        <div className="App" style={{ display: "flex", flexDirection: "row", height: "100vh", backgroundColor: "white", padding: '20px'}}>
            <div
                className="background-image"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Add the URL of your background image
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0.8,
                }}
            />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1}}>
                <Typography variant="h4" style={{ marginBottom: '12px', marginRight: 'auto', maxWidth: 'fit-content', fontFamily: "cursive", color: "white", fontWeight: "bolder", boxShadow: '0 0 20px 0 rgba(0, 0, 0, 1)', borderRadius: '12px', backgroundColor: "#3EB489", lineHeight: 1.4, letterSpacing: 2}}>Scholarly - Learning!</Typography>
                <div style={{ overflowY: "scroll", height: "80vh", width: "90%" }}>
                    {fileUrl && (
                        <iframe 
                            src={fileUrl} 
                            style={{ width: "100%", height: "100%" }}
                            title="PDF Viewer"
                        ></iframe>
                    )}
                </div>
                <div style={{ height: "20vh", width: "100%", marginTop: "20px", alignItems: "center", justifyContent: "center" }}>
                    <FlashCard
                        questionContent={dummyFlashCards[activeStep].questionContent}
                        answerContent={dummyFlashCards[activeStep].answerContent}
                    />
                    <MobileStepper
                        variant="progress"
                        steps={dummyFlashCards.length}
                        position="static"
                        activeStep={activeStep}
                        sx={{ width: '100%', backgroundColor: 'transparent', marginTop: '10px' }}
                        nextButton={
                        <Button style={{fontWeight: 'bolder'}} size="large" onClick={handleNext} disabled={activeStep === dummyFlashCards.length - 1}>
                            Next
                        </Button>
                        }
                        backButton={
                        <Button style={{fontWeight: 'bolder'}} size="large" onClick={handleBack} disabled={activeStep === 0}>
                            Back
                        </Button>
                        }
                    />
                </div>
            </div>
            <div style={{ flex: 1, padding: "10px", height: "100vh"}}>
            <ThemeProvider theme={theme}> <ChatBot steps={steps} style={{ height: '100vh', width: '100%' }} contentStyle={customStyle.userBubble} bubbleStyle={theme.bubbleStyle}/> </ThemeProvider>
            </div>
        </div>
    );
}

export default SummarizerPage;