// ScholarshipHelpPage.jsx
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";

// const GPTPrompt = ({ steps, triggerNextStep, uploadedFile }) => {
const GPTPrompt = (props) => {
  // console.log(props)
  const { steps, triggerNextStep } = props;
  // const GPTPrompt = ({ steps, triggerNextStep, uploadedFile }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");
  const [trigger, setTrigger] = useState(false);

  const triggetNext = () => {
    setTrigger(true);
    triggerNextStep();
  };

  useEffect(() => {
    const fetchData = async () => {
      const candidateResume =
        "Seyed Arian Haghighat\nCalgary, AB • 825-438-6249 • seyedarian.haghighat@ucalgary.ca • linkedin.com/in/arianhaghighat/\n\n\nEDUCATION\nBachelor of Commerce, Finance (2024) September 2020 – May 2024\nEmbedded Certificate in Entrepreneurial Thinking Haskayne School of Business, University of Calgary – Finance GPA: 3.9 | Cumulative GPA: 3.6/ 4.0\n• CFA Level I Candidate – Mentee in BMO Mentorship Program (2022) – BP Trading Competition Finalist (2023)\n• Westman Centre Real Estate Case Competition (2023) - President’s Admission Scholarship (2020)\n• Relevant Coursework: Trading and Market Data Management, Decentralized Finance, Fintech, Generative AI & Prompting, Corporate Finance, Security Analysis & Investment, Financial / Managerial Accounting\n\n\nWORK EXPERIENCE\n\nUniversity of Calgary Calgary, Canada\nENGG 503/504 Teaching Assistant (with Dr. Colin Dalton) September 2023 – Present\n• Mentored +50 student teams, leading to the creation of market-ready engineering solutions with a strong entrepreneurial focus.\n• Graded assignments and evaluated team pitches, offering feedback to optimize financial strategies and market fit.\n\nUniversity of Calgary Calgary, Canada\nDecentralized Finance (DeFi) Research Assistant (with Dr. Alfred Lehar) September 2022 – Present\n• Investigated massive dataset to find suspicious activity over the Ethereum network in the past 12 months using Julia; Analyzed various projects in decentralized finance such as: Flash Loans, NFT, Uni Swap and Web 3.\n• Established the DeFi Lab at Haskayne School of Business: a two-year program designed to bridge the gap between the DeFi industry, academic research, and student engagement, fostering collaboration with financial services.\n• Collaborated with a team of +10 members and presented our findings to faculty members in the department.\n\nUniversity of Calgary Calgary, Canada\nArtificial Intelligence (AI) Research Assistant (with Dr. Mohammad Keyhani) May 2023 – September 2023\n• Combined research on AI tools and entrepreneurial needs to co-design a course on Artificial Intelligence, leveraging real-world applications and advanced AI libraries.\n• Assisted in developing the \"Generative AI & Prompting\" course, curating content for four sessions and initiating a portfolio website using ChatGPT and Whisper for enhanced student interactivity.\n\nIEP Canada Inc. Calgary, Canada\nFinance Summer Internship May 2023 – August 2023\n• Revamped the business model and growth strategy to reflect the company's recent pivot from B2B to B2C.\n• Showcased IEP Canada to a diverse group of investors and potential clients, including notable participants at Inventure$ 2023, sought additional funding by applying for a range of provincial and government grants.\n• Diligently managed +1M company's revenue and accounting, ensuring financial stability and compliance with regulatory standards.\n\n\nEXTRACURRICULAR ACTIVITIES\n\nHidden Gemz, Finance Internship September 2022 – Present\n• Developed an application to highlight key tourism areas for young people exploring major cities.\n• Built an engaging business model through a game with the goal of helping 10,000+ businesses in the field of arts.\n\nRotman International Trading Competition (RITC), Team Member September 2022 – Present\n• Actively practiced and competed in diverse simulated market challenges, including open outcry, options, liquidity, and algorithmic trading using the advanced RIT software.\n\nTechnical Skills: Proficient in DeFi, intermediate in programming (Python, Julia, R), prompt engineering, proficient in Microsoft Office and technical analysis of stock market, Power BI, Tableau, elementary in Google Analysis\n\nCertificates: Bloomberg Market Concepts (BMC), Launchpad Program, Alberta Accelerator by 500, Building AI Products with OpenAI\n";

      const scholarshipUrl =
        "https://ucalgary.ca/registrar/awards/accounting-students-association-prize";
      // const scholarshipUrl = steps.query.value;

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
        setResult(resultData.response);
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // triggetNext()
  }, []);
  //   }, [steps.query.value, uploadedFile]);

  return (
    <div className="GPTPrompt">
      {!loading && result}
      {!loading && (
        <div
          style={{
            textAlign: "center",
            marginTop: 20,
          }}
        >
          {!trigger && <button onClick={triggetNext}>Search Again</button>}
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
        message:
          "Here are some sample questions you can ask the bot!\n1. Given the following scholarship description, what sections from my attached file (resume, cover letter, master scholarship document) should I highlight?\n2. Given the following scholarship description and the following scholarship question, draft a response given my file in 100 words or less.\n3. Given the following scholarship description, the following scholarship question and the following response, critique and help me improve my scholarship response while keeping it under 100 words\n4. Summarize the following response to this scholarship question into 200 words or less.",
        trigger: "url",
      //   trigger: "3",
      },
      {
          id: "url",
          message: " Please provide the URL to the scholarship you are applying too!",
          trigger: '3'

      },
      // User input/question/prompt for GPT
      {
        id: "3",
        user: true,
        trigger: "query",
      },
      // Hit GPT endpoint
      {
        id: "query",
      //   component: <GPTPrompt uploadedFile />,
        component: <GPTPrompt uploadedFile/>,
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
          { value: 1, label: "Yes", trigger: "3" },
          { value: 2, label: "No", trigger: "7" },
        ],
      },
      {
        id: "7",
        message: "Thank you for using Scholarly!",
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
        userBubbleColor: "#6F9CDE",
        userFontColor: "#fff",
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
        <ChatBot
          steps={steps}
          style={{ height: "100vh", width: "100vw" }}
          contentStyle={customStyle.userBubble}
          bubbleStyle={customStyle.botBubble}
        />
      </ThemeProvider>
    </div>
  );
};

export default ScholarshipHelpPage;
