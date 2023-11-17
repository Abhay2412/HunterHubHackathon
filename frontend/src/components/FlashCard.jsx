import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import "./FlashCard.css";

const FlashCard = ({ questionContent, answerContent }) => {
  const [isFlipped, setFlipped] = useState(false);

  const handleCardClick = () => {
    setFlipped(!isFlipped);
  };

  return (
    <motion.div
      className={`flip-card ${isFlipped ? "flipped" : ""}`}
      onClick={handleCardClick}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="card-content"
        sx={{
          backgroundColor: "#1a81e8",
          color: "white",
          borderRadius: "20px",
          boxShadow: 20,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="div"
            style={{
              transform: isFlipped ? "rotateY(180deg)" : "none",
              fontSize: "calc(10px + 1vmin)", // Adjust as needed
            }}
          >
            {isFlipped ? answerContent : questionContent}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FlashCard;
