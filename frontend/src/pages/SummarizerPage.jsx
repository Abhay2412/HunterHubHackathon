import React, { useState } from "react";
import { ThemeProvider } from 'styled-components';
import ChatBot from "react-simple-chatbot";

const SummarizerPage = () => {
    const [file, setFile] = useState(null);

    function onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            setFile(URL.createObjectURL(file));
        }
    }

    const steps = [
        {
            id: '1',
            message: 'Hello! I am your summarizer chatbot. I can help you summarize your PDF notes.',
            end: true,
        },
    ];

    const customStyle = {
        userBubble: {
          height: '85%', 
        },
        botBubble: {
          maxWidth: '100%', 
        },
      };

    const theme = {
        background: "#fff",
        fontFamily: "Arial, Helvetica, sans-serif",
        headerBgColor: "#B8E4BC",
        headerFontColor: "#fff",
        headerFontSize: "15px",
        botBubbleColor: "#B8E4BC",
        botFontColor: "#fff",
        userBubbleColor: "#315234",
        userFontColor: "#4A4A4A",
    };

    return (
        <div className="App" style={{ display: "flex", flexDirection: "row", height: "100vh", backgroundColor: "white" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ overflowY: "scroll", height: "50vh", width: "90%" }}>
                    <input type="file" onChange={onFileChange} accept="application/pdf" />
                    {file && (
                        <iframe 
                            src={file} 
                            style={{ width: "100%", height: "100%" }}
                            title="PDF Viewer"
                        ></iframe>
                    )}
                </div>
                <div style={{ height: "50vh", width: "90%", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ color: "#B8E4BC" }}>Flashcard UI Placeholder</p>
                </div>
            </div>
            <div style={{ flex: 1, padding: "10px", height: "100vh"}}>
            <ThemeProvider theme={theme}> <ChatBot steps={steps} style={{ height: '100vh', width: '100%' }} contentStyle={customStyle.userBubble} bubbleStyle={customStyle.botBubble}/> </ThemeProvider>
            </div>
        </div>
    );
}

export default SummarizerPage;
