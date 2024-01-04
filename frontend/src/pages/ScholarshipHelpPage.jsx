// ScholarshipHelpPage.jsx

import React, { useEffect, useState } from "react";

import { APPLICATION_COLORS } from "../utils/constants";
import ChatBot from "react-simple-chatbot";
import GPTPrompt from "../components/GPTPrompt"
import { ThemeProvider } from "styled-components";
import { useLocation } from "react-router-dom";

export default ScholarshipHelpPage = () => {
  const location = useLocation();
  const [uploadedText, setUploadedText] = useState("");

  useEffect(() => {
    setUploadedText(location.state.data.text);
  }, [location]);

  const steps = [
    {
      id: "1",
      // TODO: Format messages/workflow as deemed appropriate
      message:
        "Hello! I am a bot here to help you with your scholarship applications.",
      trigger: "2",
    },
    {
      id: "2",
      component: (
        <span>
          Here are some sample questions you can ask the bot!
          <br />
          1. Given the following scholarship description, what sections from my
          attached file (resume, cover letter, master scholarship document)
          should I highlight?
          <br />
          2. Given the following scholarship description and the following
          scholarship question, draft a response given my file in 100 words or
          less.
          <br />
          3. Given the following scholarship description, the following
          scholarship question and the following response, critique and help me
          improve my scholarship response while keeping it under 100 words.
          <br />
          4. Summarize the following response to this scholarship question into
          200 words or less.
        </span>
      ),
      asMessage: true,
      trigger: "3",
      //   trigger: "3",
    },
    {
      id: "3",
      message:
        "Please provide the URL to the scholarship you are applying too for a cover letter style essay recommending you for the scholarship given the attached resume or document!",
      trigger: "url",
    },
    // User input/question/prompt for GPT
    {
      id: "url",
      user: true,
      trigger: "query",
    },
    // Hit GPT endpoint
    {
      id: "query",
      component: <GPTPrompt candidateResume={location.state.data.text} apiUrl="https://scholarly-akool.koyeb.app/api/prompt/scholarships"/>,
      asMessage: true,
      waitAction: true,
      trigger: "5",
    },
    {
      id: "5",
      message: "Anything else I can help you with today?",
      trigger: "6",
    },
    {
      id: "6",
      options: [
        { value: 1, label: "Yes", trigger: "7" },
        { value: 2, label: "No", trigger: "9" },
      ],
    },
    {
      id: "7",
      message: "Go ahead with any other questions you have!",
      trigger: "msg",
    },
    // User input/question/prompt for GPT
    {
      id: "msg",
      user: true,
      trigger: "query2",
    },
    // Hit GPT endpoint
    {
      id: "query2",
      component: <GPTPrompt candidateResume={location.state.data.text} apiUrl="https://scholarly-akool.koyeb.app/api/prompt/scholarship-question"/>,
      asMessage: true,
      waitAction: true,
      trigger: "5",
    },
    {
      id: "9",
      message: "Thank you for using Scholarly!",
      end: true,
    },
  ];

  const theme = {
    background: APPLICATION_COLORS.PAMPAS,
    fontFamily: "Arial, Helvetica, sans-serif",
    headerBgColor: APPLICATION_COLORS.KEPPEL,
    headerFontColor: APPLICATION_COLORS.WHITE,
    headerFontSize: "15px",
    botBubbleColor: APPLICATION_COLORS.KEPPEL,
    botFontColor: APPLICATION_COLORS.WHITE,
    userBubbleColor: APPLICATION_COLORS.HAVELOCK_BLUE,
    userFontColor: APPLICATION_COLORS.WHITE,
    bubbleStyle: {
      textAlign: "left",
      maxHeight: "100%",
      padding: "10px",
    },
  };

  const customStyle = {
    userBubble: {
      height: "85%",
    },
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ChatBot
          steps={steps}
          style={{ height: "100vh", width: "100vw" }}
          contentStyle={customStyle.userBubble}
          bubbleStyle={theme.bubbleStyle}
          // Talks out speech out loud
          speechSynthesis={{ enable: true, lang: "en" }}
          // TODO: Recognize voice to text
          // recognitionEnable={true}
        />
      </ThemeProvider>
    </div>
  );
};
