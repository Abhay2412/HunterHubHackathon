// RecommendedPage.jsx

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecommendedPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const UniversityOfCalgaryScholarships = location.state.data;
  const [expandedIds, setExpandedIds] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(
    UniversityOfCalgaryScholarships.length / itemsPerPage
  );

  const handleScholarshipHelp = (e) => {
    navigate("/scholarship-help", { state: { data: location.state.text } });
  };

  const handleExpandClick = (id) => {
    setExpandedIds(
      expandedIds.includes(id)
        ? expandedIds.filter((expId) => expId !== id)
        : [...expandedIds, id]
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = UniversityOfCalgaryScholarships.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div
      className="background-image"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517842645767-c639042777db')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "absolute",
        top: 0,
        left: 0,
        minHeight: "100%",
        width: "100vw",
        height: "100vh",
        opacity: 0.8,
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          zIndex: 1,
          position: "relative",
        }}
      >
        <Typography
          variant="h4"
          style={{
            marginBottom: "12px",
            display: "inline-block",
            fontFamily: "cursive",
            color: "white",
            fontWeight: "bolder",
            boxShadow: "0 0 20px 0 rgba(0, 0, 0, 1)",
            borderRadius: "12px",
            backgroundColor: APPLICATION_COLORS.KEPPEL,
            lineHeight: 1.4,
            letterSpacing: 2,
          }}
        >
          Recommended Scholarships
        </Typography>
        {UniversityOfCalgaryScholarships.length == 0 ? (
          <>
            <Typography variant="h1">
              No Recommended Scholarships Found
            </Typography>
            {/* <Link to={"/scholarship-help"}> */}
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button
                  color="primary"
                  variant="contained"
                  style={{
                    marginBottom: "10px",
                    borderRadius: "15px",
                    fontSize: "1.4rem",
                    color: "white",
                    textTransform: "none",
                  }}
                  onClick={handleScholarshipHelp}
                >
                  Get Scholarship Help! <span>&#x2192;</span>
                </Button>
              </motion.div>
            {/* </Link> */}
          </>
        ) : (
          <>
            <Grid container spacing={2} justifyContent="center">
              {currentItems.map((scholarship) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={scholarship.title}>
                  <Card
                    style={{
                      backgroundColor: APPLICATION_COLORS.KEPPEL,
                      color: "black",
                      marginBottom: "20px",
                      borderRadius: "15px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://img.freepik.com/premium-vector/scholarship-concept-with-modern-isometric-3d-style-vector-illustration_82472-605.jpg"
                      alt="Scholarship"
                    />
                    <CardContent>
                      <Typography
                        variant="h5"
                        gutterBottom
                        style={{ fontWeight: "bold", color: "white" }}
                      >
                        {scholarship.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{ fontWeight: "bold", color: "black" }}
                      >
                        Value: ${scholarship.award_value}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{ fontWeight: "bold", color: "black" }}
                      >
                        Number of Awards: {scholarship.number_of_awards}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{ fontWeight: "bold", color: "black" }}
                      >
                        Year Entering: {scholarship.year_entering.join(",")}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <ExpandMore
                        expand={expandedIds.includes(scholarship.title)}
                        onClick={() => handleExpandClick(scholarship.title)}
                        aria-expanded={expandedIds.includes(scholarship.title)}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse
                      in={expandedIds.includes(scholarship.title)}
                      timeout="auto"
                      unmountOnExit
                    >
                      <CardContent>
                        {scholarship.award_description.map((line, index) => (
                          <Typography paragraph key={index}>
                            {line}
                          </Typography>
                        ))}
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button
              color="primary"
              variant="contained"
              style={{
                marginBottom: "10px",
                borderRadius: "15px",
                fontSize: "1.4rem",
                color: "white",
                textTransform: "none",
              }}
              onClick={handleScholarshipHelp}
            >
              Get Scholarship Help! <span>&#x2192;</span>
            </Button>
          </motion.div>
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChangePage}
          color="primary"
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
          disabled={pageCount <= 1}
        />
      </div>
    </div>
  );
};
