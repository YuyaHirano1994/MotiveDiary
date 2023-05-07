import React from "react";
import { Box, Container, Typography, Grid, Button, TextField, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";

import image1 from "./assets/images/Problem solving-bro.png";
import image2 from "./assets/images/Thesis-pana.png";
import image3 from "./assets/images/Achievement-pana.png";

const Product = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      {/* ヒーローセクション */}
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "40px 0",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" gutterBottom>
            Welcome to Motive Diary
          </Typography>
          <Typography variant="h5">We are here to help you meet the challenge. services.</Typography>
          <Box sx={{ m: "20px" }}>
            <Button variant="contained" color="secondary" size="large" component={Link} to="/user/signup">
              SignUp Now
            </Button>
          </Box>
        </Container>
      </Box>
      );
      {/* 画像と説明文のセクション */}
      <Container maxWidth="md" sx={{ mt: "40px", mb: "40px" }}>
        <Grid container spacing={4}>
          {/* セクション1 */}
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isMobile ? (
                <>
                  <img
                    src={image1}
                    alt="Sample 1"
                    style={{ marginBottom: "20px", maxWidth: "300px", height: "auto" }}
                  />
                  <Box sx={{ textAlign: "center", maxWidth: "300px", height: "auto" }}>
                    <Typography variant="h5" gutterBottom>
                      Set Goals and Track Your Progress Daily.
                    </Typography>
                    <Typography variant="body2">
                      Set goals, track progress effortlessly. Perfect for staying motivated. Set and achieve desired
                      goals, short-term to long-term.
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ textAlign: "center", maxWidth: "400px", height: "auto" }}>
                    <Typography variant="h5" gutterBottom>
                      Set Goals and
                      <br /> Track Your Progress Daily.
                    </Typography>
                    <Typography variant="body2">
                      Set goals, track progress effortlessly. Perfect for staying motivated. Set and achieve desired
                      goals, short-term to long-term.
                    </Typography>
                  </Box>
                  <img
                    src={image1}
                    alt="Sample 1"
                    style={{ marginBottom: "20px", maxWidth: "300px", height: "auto" }}
                  />
                </>
              )}
            </Box>
          </Grid>

          {/* セクション2 */}
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row-reverse",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!isMobile && (
                <Box sx={{ textAlign: "center", maxWidth: "400px", height: "auto" }}>
                  <Typography variant="h5" gutterBottom>
                    Intuitive Progress Tracking.
                  </Typography>
                  <Typography variant="body2">
                    Track progress effortlessly. Visualize growth. Encourage daily activity towards goals.
                  </Typography>
                </Box>
              )}
              <img
                src={image2}
                alt="Sample 2"
                style={{
                  marginBottom: isMobile ? "20px" : 0,
                  marginRight: isMobile ? 0 : "20px",
                  maxWidth: "300px",
                  height: "auto",
                }}
              />
              {isMobile && (
                <Box sx={{ textAlign: "center", maxWidth: "300px", height: "auto" }}>
                  <Typography variant="h5" gutterBottom>
                    Intuitive Progress Tracking.
                  </Typography>
                  <Typography variant="body2">
                    Track progress effortlessly. Visualize growth. Encourage daily activity towards goals.
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>

          {/* セクション3 */}
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isMobile ? (
                <>
                  <img
                    src={image3}
                    alt="Sample 3"
                    style={{ marginBottom: "20px", maxWidth: "300px", height: "auto" }}
                  />
                  <Box sx={{ textAlign: "center", maxWidth: "300px", height: "auto" }}>
                    <Typography variant="h5" gutterBottom>
                      Grow Together with Like-minded Individuals.
                    </Typography>
                    <Typography variant="body2">
                      Grow together. Connect with like-minded individuals to share goals.
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ textAlign: "center", maxWidth: "400px", height: "auto" }}>
                    <Typography variant="h5" gutterBottom>
                      Grow Together with Like-minded Individuals.
                    </Typography>
                    <Typography variant="body2">
                      Grow together. Connect with like-minded individuals to share goals.
                    </Typography>
                  </Box>
                  <img
                    src={image3}
                    alt="Sample 3"
                    style={{ marginBottom: "20px", maxWidth: "300px", height: "auto" }}
                  />
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      {/* 登録セクション */}
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "40px 0",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <PersonIcon sx={{ fontSize: "48px", marginBottom: "10px" }} />
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          <Typography variant="body1" gutterBottom>
            Sign up for our app and get started today!
          </Typography>
          <Button variant="contained" color="secondary" component={Link} to="/user/signup">
            SignUp
          </Button>
        </Container>
      </Box>
      {/* コンタクトセクション */}
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "40px",
          textAlign: "center",
          flex: "1",
        }}
      >
        <Container maxWidth="md">
          <EmailIcon sx={{ fontSize: "48px", marginBottom: "10px" }} />
          <Typography variant="h4" gutterBottom>
            Contact Me
          </Typography>
          <Typography variant="body1" gutterBottom>
            For any inquiries, please contact me via email.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: yuyahirano.dev@gmail.com
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Product;
