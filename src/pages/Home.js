import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../common/supabase";
import topImage from "../assets/images/library.jpg";
import UserIcon from "../components/UserIcon";

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

const challengeStyles = { pr: 1, pl: 1, mb: 2, backgroundColor: "white", border: "1px solid white", borderRadius: 2 };

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

  return (
    <>
      <Container component="main" maxWidth="lg">
        <Paper style={styles.paperContainer}>
          <Typography variant="h3" align="center" style={{ pt: `100px`, color: `white` }}>
            Let's get start your new Challenge!
          </Typography>
        </Paper>
        <Grid container justifyContent="center">
          <Grid item md={3} xs={1}>
            <Box textAlign="center" sx={{ mt: 5 }}></Box>
          </Grid>
          <Grid item md={6} xs={10}>
            <Box>
              <Box>
                <Box sx={{ mt: 2 }}></Box>
                <Box sx={{ m: 1 }}>
                  {challenges.map((challenge) => (
                    <Box key={challenge.challenge_id} sx={challengeStyles}>
                      <Box display="flex" sx={{ mt: 2 }}>
                        <UserIcon userID={challenge.user_id} width="32" height="32" />
                        <Typography variant="subtitle2" sx={{ ml: 1, pt: 1 }}>
                          {challenge.nickname}
                        </Typography>
                      </Box>
                      <Box sx={{ pl: 5, mb: 2 }}>
                        <Box display="flex" justifyContent="space-between">
                          <Box>
                            <Typography variant="h5">{challenge.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {challenge.start_date} ~ {challenge.end_date}
                            </Typography>
                          </Box>
                          <Box sx={{ mr: 2 }}>
                            <Typography variant="subtitle2">day</Typography>
                            <Typography variant="subtitle1">
                              {challenge.day ? challenge.day : 0} / {challenge.days}{" "}
                            </Typography>
                          </Box>
                        </Box>
                        <Box display="flex">
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
          </Grid>
          <Grid item md={3} xs={1}>
            <Box textAlign="center" sx={{ mt: 5 }}></Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
