import React, { useState, useEffect } from "react";
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
  const [language, setLanguage] = useState("");

  useEffect(() => {
    const userLanguage = navigator.language;

    if (userLanguage === "ja") {
      setLanguage("ja");
    } else {
      setLanguage("en");
    }
  }, []);

  const changeLang = () => {
    if (language === "ja") {
      setLanguage("en");
    } else {
      setLanguage("ja");
    }
  };

  return (
    <>
      {language === "ja" ? (
        <Box>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              padding: "40px 0",
              textAlign: "center",
            }}
          >
            <Container maxWidth="md">
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" value={language} onClick={changeLang}>
                  {language}
                </Button>
              </Box>
              {isMobile ? (
                <Typography variant="h2" gutterBottom>
                  Welcome to <br />
                  Motive Diary
                </Typography>
              ) : (
                <Typography variant="h2" gutterBottom>
                  Welcome to Motive Diary
                </Typography>
              )}
              <Typography variant="h5" sx={{ m: 1 }}>
                あなたのチャレンジを設定し、日々の記録を行いましょう！
              </Typography>
              <Typography variant="subtitle2">
                本サービスはすべて英語ですが、直感的でわかりやすいので、どなたでもご活用いただけます。
              </Typography>

              <Box sx={{ m: "20px" }}>
                <Button variant="contained" color="secondary" size="large" component={Link} to="/user/signup">
                  会員登録
                </Button>
              </Box>
            </Container>
          </Box>
          <Container maxWidth="md" sx={{ mt: "40px", mb: "40px" }}>
            <Grid container spacing={4}>
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
                          達成したい目標を設定し、日々の進捗を記録する。
                        </Typography>
                        <Typography variant="body2">
                          設定した目標と日々の記録を簡単に見返すことできます。
                          モチベーションを維持し、目標を達成することができます。
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box sx={{ textAlign: "center", maxWidth: "400px", height: "auto" }}>
                        <Typography variant="h5" gutterBottom>
                          達成したい目標を設定し、
                          <br />
                          日々の進捗を記録する。
                        </Typography>
                        <Typography variant="body2">
                          設定した目標と日々の記録を簡単に見返すことできます。
                          <br />
                          モチベーションを維持し、目標を達成することができます。
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
                        簡単に記録でき、簡単に見返せる。
                      </Typography>
                      <Typography variant="body2">
                        今日何をやったのかを記録していくだけで、
                        <br />
                        あとから日々の記録を簡単に見返すことができます。
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
                        簡単に記録でき、簡単に見返せる。
                      </Typography>
                      <Typography variant="body2">
                        今日何をやったのかを記録していくだけで、 あとから日々の記録を簡単に見返すことができます。
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
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
                          仲間と一緒に成長する。
                        </Typography>
                        <Typography variant="body2">
                          目標を仲間と共有しましょう。仲間の目標にイイネをつけて、応援しましょう。
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box sx={{ textAlign: "center", maxWidth: "400px", height: "auto" }}>
                        <Typography variant="h5" gutterBottom>
                          仲間と一緒に成長する。
                        </Typography>
                        <Typography variant="body2">
                          目標を仲間と共有しましょう。
                          <br />
                          仲間の目標にイイネをつけて、応援しましょう。
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
                会員登録
              </Typography>
              <Typography variant="body1" gutterBottom>
                今日からあなたの新しい挑戦をはじめましょう！
              </Typography>
              <Button variant="contained" color="secondary" component={Link} to="/user/signup">
                会員登録
              </Button>
            </Container>
          </Box>
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
                お問い合わせ
              </Typography>
              <Typography variant="body1" gutterBottom>
                お問い合わせ等は下記のメールまでお願いします。
              </Typography>
              <Typography variant="body1" gutterBottom>
                Eメールアドレス: yuyahirano.dev@gmail.com
              </Typography>
            </Container>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              padding: "40px 0",
              textAlign: "center",
            }}
          >
            <Container maxWidth="md">
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" value={language} onClick={changeLang}>
                  {language}
                </Button>
              </Box>
              {isMobile ? (
                <Typography variant="h2" gutterBottom>
                  Welcome to <br />
                  Motive Diary
                </Typography>
              ) : (
                <Typography variant="h2" gutterBottom>
                  Welcome to Motive Diary
                </Typography>
              )}
              <Typography variant="h5">We are here to help you meet the challenge. services.</Typography>
              <Box sx={{ m: "20px" }}>
                <Button variant="contained" color="secondary" size="large" component={Link} to="/user/signup">
                  SignUp
                </Button>
              </Box>
            </Container>
          </Box>
          <Container maxWidth="md" sx={{ mt: "40px", mb: "40px" }}>
            <Grid container spacing={4}>
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
      )}
    </>
  );
};

export default Product;
