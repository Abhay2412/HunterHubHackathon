// ScholarshipHelpPage.jsx
import React from "react";
import { ThemeProvider } from 'styled-components';
import ChatBot from "react-simple-chatbot";

const ScholarshipHelpPage = () => {
    const steps = [
        {
            id: '1',
            message: 'Hello! I can help you with information about scholarships. How can I assist you?',
            end: true,
        },
    ];

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
    
    const customStyle = {
        userBubble: {
          height: '85%', 
        },
        botBubble: {
            maxHeight: '100%',
        },
    };
    
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <ChatBot steps={steps} style={{ height: '100vh', width: '100vw' }} contentStyle={customStyle.userBubble} bubbleStyle={customStyle.botBubble}/>
            </ThemeProvider>
        </div>
    );
}

export default ScholarshipHelpPage;
