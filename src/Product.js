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
          <Typography variant="body1">
            We are here to help you meet the challenge. Please see below for specific instructions on how to use our
            services.
          </Typography>
        </Container>
      </Box>

      {/* 画像と説明文のセクション */}
      <Container maxWidth="md" sx={{ marginTop: "40px" }}>
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
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h5" gutterBottom>
                      Section 1
                    </Typography>
                    <Typography variant="body2">This is the description of section 1.</Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h5" gutterBottom>
                      Section 1
                    </Typography>
                    <Typography variant="body2">This is the description of section 1.</Typography>
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
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h5" gutterBottom>
                    Section 2
                  </Typography>
                  <Typography variant="body2">This is the description of section 2.</Typography>
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
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h5" gutterBottom>
                    Section 2
                  </Typography>
                  <Typography variant="body2">This is the description of section 2.</Typography>
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
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h5" gutterBottom>
                      Section 3
                    </Typography>
                    <Typography variant="body2">This is the description of section 3.</Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h5" gutterBottom>
                      Section 3
                    </Typography>
                    <Typography variant="body2">This is the description of section 3.</Typography>
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
          <Button variant="contained" color="primary" component={Link} to="/user/signup">
            Sign Up!
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
            Contact Us
          </Typography>
          <Typography variant="body1" gutterBottom>
            For any inquiries, please contact us via email.
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
