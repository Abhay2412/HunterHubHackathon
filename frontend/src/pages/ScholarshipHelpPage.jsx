// ScholarshipHelpPage.jsx
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";

const printParagraphs = (input) => {
  const text = input.replace(/\n/g, "<br>");
  return text;
};

// const GPTPrompt = ({ steps, triggerNextStep, uploadedFile }) => {
const GPTPrompt = (props) => {
  // console.log(props)
  const { steps, triggerNextStep } = props;
  // const GPTPrompt = ({ steps, triggerNextStep, uploadedFile }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");
  const [trigger, setTrigger] = useState(false);

  const triggerNext = () => {
    setTrigger(true);
    triggerNextStep();
  };

  useEffect(() => {
    const fetchData = async () => {
      const candidateResume =
        "Seyed Arian Haghighat\nCalgary, AB • 825-438-6249 • seyedarian.haghighat@ucalgary.ca • linkedin.com/in/arianhaghighat/\n\n\nEDUCATION\nBachelor of Commerce, Finance (2024) September 2020 – May 2024\nEmbedded Certificate in Entrepreneurial Thinking Haskayne School of Business, University of Calgary – Finance GPA: 3.9 | Cumulative GPA: 3.6/ 4.0\n• CFA Level I Candidate – Mentee in BMO Mentorship Program (2022) – BP Trading Competition Finalist (2023)\n• Westman Centre Real Estate Case Competition (2023) - President’s Admission Scholarship (2020)\n• Relevant Coursework: Trading and Market Data Management, Decentralized Finance, Fintech, Generative AI & Prompting, Corporate Finance, Security Analysis & Investment, Financial / Managerial Accounting\n\n\nWORK EXPERIENCE\n\nUniversity of Calgary Calgary, Canada\nENGG 503/504 Teaching Assistant (with Dr. Colin Dalton) September 2023 – Present\n• Mentored +50 student teams, leading to the creation of market-ready engineering solutions with a strong entrepreneurial focus.\n• Graded assignments and evaluated team pitches, offering feedback to optimize financial strategies and market fit.\n\nUniversity of Calgary Calgary, Canada\nDecentralized Finance (DeFi) Research Assistant (with Dr. Alfred Lehar) September 2022 – Present\n• Investigated massive dataset to find suspicious activity over the Ethereum network in the past 12 months using Julia; Analyzed various projects in decentralized finance such as: Flash Loans, NFT, Uni Swap and Web 3.\n• Established the DeFi Lab at Haskayne School of Business: a two-year program designed to bridge the gap between the DeFi industry, academic research, and student engagement, fostering collaboration with financial services.\n• Collaborated with a team of +10 members and presented our findings to faculty members in the department.\n\nUniversity of Calgary Calgary, Canada\nArtificial Intelligence (AI) Research Assistant (with Dr. Mohammad Keyhani) May 2023 – September 2023\n• Combined research on AI tools and entrepreneurial needs to co-design a course on Artificial Intelligence, leveraging real-world applications and advanced AI libraries.\n• Assisted in developing the \"Generative AI & Prompting\" course, curating content for four sessions and initiating a portfolio website using ChatGPT and Whisper for enhanced student interactivity.\n\nIEP Canada Inc. Calgary, Canada\nFinance Summer Internship May 2023 – August 2023\n• Revamped the business model and growth strategy to reflect the company's recent pivot from B2B to B2C.\n• Showcased IEP Canada to a diverse group of investors and potential clients, including notable participants at Inventure$ 2023, sought additional funding by applying for a range of provincial and government grants.\n• Diligently managed +1M company's revenue and accounting, ensuring financial stability and compliance with regulatory standards.\n\n\nEXTRACURRICULAR ACTIVITIES\n\nHidden Gemz, Finance Internship September 2022 – Present\n• Developed an application to highlight key tourism areas for young people exploring major cities.\n• Built an engaging business model through a game with the goal of helping 10,000+ businesses in the field of arts.\n\nRotman International Trading Competition (RITC), Team Member September 2022 – Present\n• Actively practiced and competed in diverse simulated market challenges, including open outcry, options, liquidity, and algorithmic trading using the advanced RIT software.\n\nTechnical Skills: Proficient in DeFi, intermediate in programming (Python, Julia, R), prompt engineering, proficient in Microsoft Office and technical analysis of stock market, Power BI, Tableau, elementary in Google Analysis\n\nCertificates: Bloomberg Market Concepts (BMC), Launchpad Program, Alberta Accelerator by 500, Building AI Products with OpenAI\n";

      const scholarshipUrl = steps.url.value;

      try {
        const response = await fetch(
          "http://localhost:8000/api/prompt/scholarships",
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
        console.log(resultData);
        console.log(printParagraphs(resultData.response));

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
    <div className="GPTPrompt" style={{ textAlign: 'left', padding: '0 20px' }}>
      {!loading && (
        <>
        {renderText(result)}</>
      )}
      {!loading && (
        <div
          style={{
            textAlign: "center",
            marginTop: 20,
          }}
        >
          {!trigger && <button onClick={triggerNext}>Search Again</button>}
        </div>
      )}
    </div>
  );
};

// const GPTPromptBaF = ({ steps, triggerNextStep, uploadedFile }) => {
const GPTPromptBaF = (props) => {
  // console.log(props)
  const { steps, triggerNextStep } = props;
  // const GPTPromptBaF = ({ steps, triggerNextStep, uploadedFile }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");
  const [trigger, setTrigger] = useState(false);

  const triggerNext = () => {
    setTrigger(true);
    triggerNextStep();
  };

  useEffect(() => {
    const fetchData = async () => {
      const candidateResume =
        "Seyed Arian Haghighat\nCalgary, AB • 825-438-6249 • seyedarian.haghighat@ucalgary.ca • linkedin.com/in/arianhaghighat/\n\n\nEDUCATION\nBachelor of Commerce, Finance (2024) September 2020 – May 2024\nEmbedded Certificate in Entrepreneurial Thinking Haskayne School of Business, University of Calgary – Finance GPA: 3.9 | Cumulative GPA: 3.6/ 4.0\n• CFA Level I Candidate – Mentee in BMO Mentorship Program (2022) – BP Trading Competition Finalist (2023)\n• Westman Centre Real Estate Case Competition (2023) - President’s Admission Scholarship (2020)\n• Relevant Coursework: Trading and Market Data Management, Decentralized Finance, Fintech, Generative AI & Prompting, Corporate Finance, Security Analysis & Investment, Financial / Managerial Accounting\n\n\nWORK EXPERIENCE\n\nUniversity of Calgary Calgary, Canada\nENGG 503/504 Teaching Assistant (with Dr. Colin Dalton) September 2023 – Present\n• Mentored +50 student teams, leading to the creation of market-ready engineering solutions with a strong entrepreneurial focus.\n• Graded assignments and evaluated team pitches, offering feedback to optimize financial strategies and market fit.\n\nUniversity of Calgary Calgary, Canada\nDecentralized Finance (DeFi) Research Assistant (with Dr. Alfred Lehar) September 2022 – Present\n• Investigated massive dataset to find suspicious activity over the Ethereum network in the past 12 months using Julia; Analyzed various projects in decentralized finance such as: Flash Loans, NFT, Uni Swap and Web 3.\n• Established the DeFi Lab at Haskayne School of Business: a two-year program designed to bridge the gap between the DeFi industry, academic research, and student engagement, fostering collaboration with financial services.\n• Collaborated with a team of +10 members and presented our findings to faculty members in the department.\n\nUniversity of Calgary Calgary, Canada\nArtificial Intelligence (AI) Research Assistant (with Dr. Mohammad Keyhani) May 2023 – September 2023\n• Combined research on AI tools and entrepreneurial needs to co-design a course on Artificial Intelligence, leveraging real-world applications and advanced AI libraries.\n• Assisted in developing the \"Generative AI & Prompting\" course, curating content for four sessions and initiating a portfolio website using ChatGPT and Whisper for enhanced student interactivity.\n\nIEP Canada Inc. Calgary, Canada\nFinance Summer Internship May 2023 – August 2023\n• Revamped the business model and growth strategy to reflect the company's recent pivot from B2B to B2C.\n• Showcased IEP Canada to a diverse group of investors and potential clients, including notable participants at Inventure$ 2023, sought additional funding by applying for a range of provincial and government grants.\n• Diligently managed +1M company's revenue and accounting, ensuring financial stability and compliance with regulatory standards.\n\n\nEXTRACURRICULAR ACTIVITIES\n\nHidden Gemz, Finance Internship September 2022 – Present\n• Developed an application to highlight key tourism areas for young people exploring major cities.\n• Built an engaging business model through a game with the goal of helping 10,000+ businesses in the field of arts.\n\nRotman International Trading Competition (RITC), Team Member September 2022 – Present\n• Actively practiced and competed in diverse simulated market challenges, including open outcry, options, liquidity, and algorithmic trading using the advanced RIT software.\n\nTechnical Skills: Proficient in DeFi, intermediate in programming (Python, Julia, R), prompt engineering, proficient in Microsoft Office and technical analysis of stock market, Power BI, Tableau, elementary in Google Analysis\n\nCertificates: Bloomberg Market Concepts (BMC), Launchpad Program, Alberta Accelerator by 500, Building AI Products with OpenAI\n";

      const scholarshipUrl = steps.url.value;
      const msg = steps.msg.value;

      try {
        const response = await fetch(
          "http://localhost:8000/api/prompt/scholarship-question",
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
        console.log(resultData);
        // console.log(printParagraphs(resultData.response));

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
    <div className="GPTPromptBaF">
      {!loading && (
        <>
          {/* {renderText(result)}</> */}
          {result}
        </>
      )}
      {!loading && (
        <div
          style={{
            textAlign: "center",
            marginTop: 20,
          }}
        >
          {!trigger && <button onClick={triggerNext}>Search Again</button>}
        </div>
      )}
    </div>
  );
};

const ScholarshipHelpPage = ({ file: uploadedFile }) => {
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
          1. Given the following scholarship description, what sections from my attached file (resume, cover letter, master scholarship document) should I highlight?
          <br />
          2. Given the following scholarship description and the following scholarship question, draft a response given my file in 100 words or less.
          <br />
          3. Given the following scholarship description, the following scholarship question and the following response, critique and help me improve my scholarship response while keeping it under 100 words.
          <br />
          4. Summarize the following response to this scholarship question into 200 words or less.
        </span>
        ),
        asMessage: true,
        trigger: "3",
      //   trigger: "3",
    },
    {
      id: "3",
      message:
        "Please provide the URL to the scholarship you are applying too for an cover letter style essay recommending you for the scholarship given the attached resume or document!",
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
        component: <GPTPrompt uploadedFile/>,
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
        id: '7',
        message: 'Go ahead with any other questions you have!',
        trigger: 'msg',
      },
      // User input/question/prompt for GPT
      {
        id: 'msg',
        user: true,
        trigger: "query2",
      },
      // Hit GPT endpoint
      {
        id: "query2",
      //   component: <GPTPrompt uploadedFile />,
      component: <GPTPromptBaF uploadedFile />,
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
        maxHeight: '100%',
        padding: "10px", 
      },
  };
    
    const customStyle = {
        userBubble: {
          height: '85%', 
        }
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ChatBot
          steps={steps}
          style={{ height: "100vh", width: "100vw" }}
          contentStyle={customStyle.userBubble}
          bubbleStyle={theme.bubbleStyle}
        />
      </ThemeProvider>
    </div>
  );
};

export default ScholarshipHelpPage;
