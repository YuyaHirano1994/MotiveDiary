import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import UserIcon from "../components/UserIcon";
import supabase from "../common/supabase";
import topImage from "../assets/images/library.jpg";
import LikeButton from "../components/LikeButton";

const styles = {
  paperContainer: {
    backgroundImage: `url(${topImage})`,
    backgroundSize: "cover",
    width: "100%",
    height: "200px",
    backgroundRepeat: "no-repeat",
    textAlign: "center",
  },
};

const challengeStyles = {
  pr: 1,
  pl: 1,
  mb: 2,
  backgroundColor: "white",
  border: "1px solid white",
  borderRadius: 2,
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

  return (
    <Container component="main" maxWidth="lg">
      <Paper style={styles.paperContainer}>
        <Typography variant="h3" align="center" sx={{ pt: "100px", color: "white" }}>
          Let's get start your new Challenge!
        </Typography>
      </Paper>
      <Grid container justifyContent="center">
        <Grid item md={3} xs={1} />
        <Grid item md={6} xs={10}>
          <Box mt={2}>
            {challenges.map((challenge) => (
              <Box key={challenge.challenge_id} sx={challengeStyles} mb={2}>
                <Box display="flex" mt={2}>
                  <UserIcon userID={challenge.user_id} width={32} height={32} />
                  <Typography variant="subtitle2" sx={{ ml: 1, pt: 1 }}>
                    {challenge.nickname}
                  </Typography>
                </Box>
                <Box pl={5}>
                  <Box display="flex" justifyContent="space-between">
                    <Box width="70%">
                      <Typography variant="h5">{challenge.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {challenge.start_date} ~ {challenge.end_date}
                      </Typography>
                    </Box>
                    <Box mr={2} align="center">
                      <Typography variant="subtitle2">day</Typography>
                      <Typography variant="subtitle2">
                        {challenge.day ? challenge.day : 0} / {challenge.days}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Button component={Link} to={"/challenge/" + challenge.challenge_id}>
                      More detail...
                    </Button>
                    <LikeButton challenge_id={challenge.challenge_id} />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item md={3} xs={1} />
      </Grid>
    </Container>
  );
};

export default Home;
