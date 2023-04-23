import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../common/supabase";
import topImage from "../assets/images/library.jpg";
import UserIcon from "../components/UserIcon";
import ScrollToTop from "../components/ScrollToTop";

const styles = {
  paperContainer: {
    backgroundImage: `url(${topImage})`,
    backgroundSize: `cover`,
    width: `100%`,
    height: `200px`,
    backgroundRepeat: `no-repeat`,
    textAlign: `center`,
  },
};

const Home = () => {
  const [challenges, setChallenges] = useState([]);
  const getAllChallenges = async () => {
    try {
      const { data, error } = await supabase.from("home_challenge").select("*");
      if (error) {
        throw error;
      }
      setChallenges(data);
    } catch (error) {
      console.log(error.error_description || error.message);
    }
  };

  useEffect(() => {
    getAllChallenges();
  }, []);

  const editDesc = (desc) => {
    if (desc.length >= 40) {
      const newDesc = desc.substr(0, 40) + "...";
      return newDesc;
    } else {
      return desc;
    }
  };

  return (
    <>
      <Container component="main" maxWidth="lg" sx={{}}>
        <Paper style={styles.paperContainer}>
          <Typography variant="h3" align="center" style={{ paddingTop: `100px`, color: `white` }}>
            Let's get start your new Challenge!
          </Typography>
        </Paper>
        <Grid container sx={{}} justifyContent="center">
          <Grid item md={3} xs={1} sx={{}}>
            <Box component="div" textAlign={"center"} sx={{ mt: 5 }}></Box>
          </Grid>
          <Grid item md={6} xs={10} sx={{}}>
            <Box component="div" sx={{}}>
              <Box component="div">
                <Box component="div" sx={{ mt: 2 }}>
                  {/* <Button variant="text" size="large">
                    Latest
                  </Button>
                  <Button variant="text" size="large">
                    Top
                  </Button>
                  <Button variant="text" size="large">
                    Recommend
                  </Button> */}
                </Box>
                <Box component="div" sx={{ m: 1 }}>
                  {challenges.map((challenge) => (
                    <Box
                      component="div"
                      key={challenge.challenge_id}
                      sx={{ pr: 1, pl: 1, mb: 2, backgroundColor: "white", border: "1px solid white", borderRadius: 2 }}
                    >
                      <Box component="div" display={"flex"} sx={{ mt: 2 }}>
                        <UserIcon userID={challenge.user_id} width="32" height="32" />
                        <Typography variant="subtitle2" sx={{ ml: 1, pt: 1 }}>
                          {challenge.nickname}
                        </Typography>
                      </Box>
                      <Box component="div" sx={{ pl: 5, mb: 2 }}>
                        <Box component="div" display={"flex"} justifyContent={"space-between"}>
                          <Box>
                            <Typography variant="h5">{challenge.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {challenge.start_date} ~ {challenge.end_date}
                            </Typography>
                          </Box>
                          <Box component="div" sx={{ mr: 2 }}>
                            <Typography variant="subtitle2">day</Typography>
                            <Typography variant="subtitle1">
                              {challenge.day ? challenge.day : 0} / {challenge.days}{" "}
                            </Typography>
                          </Box>
                        </Box>
                        <Box display={"flex"}>
                          {/* <Box component="div" sx={{}}>
                            <Button>Good Button</Button>
                          </Box> */}
                          <Button>
                            <Link to={"/challenge/" + challenge.challenge_id}>More detail...</Link>
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>{" "}
          <Grid item md={3} xs={1} sx={{}}>
            <Box component="div" textAlign={"center"} sx={{ mt: 5 }}></Box>
          </Grid>
        </Grid>
      </Container>
      <ScrollToTop />
    </>
  );
};

export default Home;
