// ScholarshipHelpPage.jsx

import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import ChatBot from "react-simple-chatbot";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider } from "styled-components";

const printParagraphs = (input) => {
  const text = input.replace(/\n/g, "<br>");
  return text;
};

const GPTPrompt = (props) => {
  const { steps, triggerNextStep, candidateResume } = props;
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");
  const [trigger, setTrigger] = useState(false);

  const triggerNext = () => {
    setTrigger(true);
    triggerNextStep();
  };

  useEffect(() => {
    const fetchData = async () => {
      const scholarshipUrl = steps.url.value;

      try {
        setLoading(true);
        const response = await fetch(
          "https://scholarly-akool.koyeb.app/api/prompt/scholarships",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              candidate_resume: candidateResume,
              scholarship_url: scholarshipUrl,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const resultData = await response.json();
        setResult(resultData.response);
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // triggerNext()
  }, []);
  //   }, [steps.query.value, uploadedFile]);

  const renderText = (inputText) => {
    return inputText.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };
  return (
    <div className="GPTPrompt" style={{ textAlign: "left", padding: "0 20px" }}>
      {loading ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <>
          <>{renderText(result)}</>
          <div
            style={{
              textAlign: "center",
              marginTop: 20,
            }}
          >
            {!trigger && <button onClick={triggerNext}>Ask Again</button>}
          </div>
        </>
      )}
    </div>
  );
};

const GPTPromptBaF = (props) => {
  const { steps, triggerNextStep, candidateResume } = props;
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");
  const [trigger, setTrigger] = useState(false);

  const triggerNext = () => {
    setTrigger(true);
    triggerNextStep();
  };

  useEffect(() => {
    const fetchData = async () => {
      const scholarshipUrl = steps.url.value;
      const msg = steps.msg.value;

      try {
        setLoading(true);
        const response = await fetch(
          "https://scholarly-akool.koyeb.app/api/prompt/scholarship-question",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              candidate_resume: candidateResume,
              scholarship_url: scholarshipUrl,
              message: msg,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const resultData = await response.json();

        setResult(resultData.reply);
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // triggerNext()
  }, []);
  //   }, [steps.query.value, uploadedFile]);

  const renderText = (inputText) => {
    return inputText.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };
  return (
    <div
      className="GPTPromptBaF"
      style={{ textAlign: "left", padding: "0 20px" }}
    >
      {loading ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <>
          <>
            {renderText(result)}
            {/* // {result} */}
          </>
          <div
            style={{
              textAlign: "center",
              marginTop: 20,
            }}
          >
            {!trigger && <button onClick={triggerNext}>Ask Again</button>}
          </div>
        </>
      )}
    </div>
  );
};

const ScholarshipHelpPage = () => {
  const navigate = useNavigate();
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
      //   component: <GPTPrompt uploadedFile />,
      component: <GPTPrompt candidateResume={location.state.data.text} />,
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
        // { value: 1, label: "Yes", trigger: "url" },
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
      //   component: <GPTPrompt uploadedFile />,
      component: <GPTPromptBaF candidateResume={location.state.data.text} />,
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

export default ScholarshipHelpPage;
