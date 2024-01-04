import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import ChatBot from "react-simple-chatbot";
import CircularProgress from "@mui/material/CircularProgress";
import FlashCard from "../components/FlashCard";
import MobileStepper from "@mui/material/MobileStepper";
import { ThemeProvider } from "styled-components";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const GPTPrompt = (props) => {
  const {
    steps,
    triggerNextStep,
    flashcards,
    setFlashcards,
    selectedFile,
    setFlashcardsLoading,
  } = props;
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [trigger, setTrigger] = useState(false);

  const triggerNext = () => {
    setTrigger(true);
    triggerNextStep();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFlashcardsLoading(true);
        setLoading(true);
        const response = await fetch(
          "https://scholarly-akool.koyeb.app/api/prompt/summary",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              candidate_document: selectedFile,
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
        setFlashcardsLoading(false);
        setLoading(false);
      }
    };

    const fetchFlashcards = async () => {
      try {
        setFlashcardsLoading(true);
        const response = await fetch(
          "https://scholarly-akool.koyeb.app/api/prompt/flashcards",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              candidate_document: selectedFile,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const resultData = await response.json();

        // Extract the JSON string from the response
        const jsonString = resultData.response.slice(7, -3);

        // Parse the JSON string to get the array of flashcards
        const flashcards = JSON.parse(jsonString);
        setFlashcards(flashcards);
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setFlashcardsLoading(false);
      }
    };

    const wrapper = async () => {
      await fetchData();
      await fetchFlashcards();
    };

    wrapper();
  }, []);

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
  const { steps, triggerNextStep, selectedFile } = props;
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [trigger, setTrigger] = useState(false);

  const triggerNext = () => {
    setTrigger(true);
    triggerNextStep();
  };

  useEffect(() => {
    const fetchData = async () => {
      const msg = steps.msg.value;

      try {
        setLoading(true);
        const response = await fetch(
          "https://scholarly-akool.koyeb.app/api/prompt/summary-question",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              candidate_document: selectedFile,
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
            <div
              style={{
                textAlign: "center",
                marginTop: 20,
              }}
            >
              {!trigger && <button onClick={triggerNext}>Ask Again</button>}
            </div>
          </>
        </>
      )}
    </div>
  );
};

const SummarizerPage = () => {
  const location = useLocation();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedText, setUploadedText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [flashcardsLoading, setFlashcardsLoading] = useState(false);

  useEffect(() => {
    if (location.state && location.state.file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(location.state.file);
      fileReader.onload = (e) => {
        setUploadedFile(e.target.result);
      };
      setUploadedText(location.state.data.text);
    }
  }, [location]);

  const steps = [
    {
      id: "1",
      // TODO: Format messages/workflow as deemed appropriate
      message:
        "Hello! I am a bot here to help you with summarizing your documents.",
      trigger: "2",
    },
    {
      id: "2",
      component: (
        <span>
          Here are some sample questions you can ask the bot!
          <br />
          1. Summarize the class document.
          <br />
          2. Discuss the pros and cons of the topic of the class document.
          <br />
          3. Would you support the position presented in the document?
        </span>
      ),
      asMessage: true,
      trigger: "3",
      //   trigger: "3",
    },
    {
      id: "3",
      component: (
        <span>
          Below is an initial summary of the attached document.
          <br />
          To the left are 10 Q&A styled flashcards!
        </span>
      ),
      asMessage: true,
      trigger: "summary",
    },
    // Hit GPT endpoint
    {
      id: "summary",
      component: (
        <GPTPrompt
          flashcards={flashcards}
          setFlashcards={setFlashcards}
          selectedFile={location.state.data.text}
          setFlashcardsLoading={setFlashcardsLoading}
        />
      ),
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
      component: <GPTPromptBaF selectedFile={location.state.data.text} />,
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

  const customStyle = {
    userBubble: {
      height: "85%",
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
      maxHeight: "100%",
      maxWidth: "100%",
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
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        backgroundColor: "white",
        padding: "20px",
      }}
    >
      <div
        className="background-image"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Add the URL of your background image
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.8,
        }}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Typography
          variant="h4"
          style={{
            marginBottom: "12px",
            marginRight: "auto",
            maxWidth: "fit-content",
            fontFamily: "cursive",
            color: "white",
            fontWeight: "bolder",
            boxShadow: "0 0 20px 0 rgba(0, 0, 0, 1)",
            borderRadius: "12px",
            backgroundColor: "#3EB489",
            lineHeight: 1.4,
            letterSpacing: 2,
          }}
        >
          Scholarly - Learning!
        </Typography>
        <div style={{ overflowY: "scroll", height: "80vh", width: "90%" }}>
          {uploadedFile && (
            <iframe
              src={uploadedFile}
              style={{ width: "100%", height: "100%" }}
              title="PDF Viewer"
            ></iframe>
          )}
        </div>

        <div
          style={{
            height: "20vh",
            width: "100%",
            marginTop: "20px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {flashcards && flashcards.length > 0 && !flashcardsLoading ? (
            <>
              <FlashCard
                questionContent={flashcards[activeStep].question}
                answerContent={flashcards[activeStep].answer}
              />
              <MobileStepper
                variant="progress"
                steps={flashcards.length}
                position="static"
                activeStep={activeStep}
                sx={{
                  width: "100%",
                  backgroundColor: "transparent",
                  marginTop: "10px",
                }}
                nextButton={
                  <Button
                    style={{ fontWeight: "bolder" }}
                    size="large"
                    onClick={handleNext}
                    disabled={activeStep === flashcards.length - 1}
                  >
                    Next
                  </Button>
                }
                backButton={
                  <Button
                    style={{ fontWeight: "bolder" }}
                    size="large"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    Back
                  </Button>
                }
              />
            </>
          ) : (
            <>
              <CircularProgress />
            </>
          )}
        </div>
      </div>
      <div style={{ flex: 1, padding: "10px", height: "100vh" }}>
        <ThemeProvider theme={theme}>
          {" "}
          <ChatBot
            steps={steps}
            style={{ height: "100vh", width: "100%" }}
            contentStyle={customStyle.userBubble}
            bubbleStyle={theme.bubbleStyle}
          />{" "}
        </ThemeProvider>
      </div>
    </div>
  );
};

export default SummarizerPage;
