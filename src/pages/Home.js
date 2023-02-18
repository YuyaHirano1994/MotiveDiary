import { Button, Card, CardActions, CardContent, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../common/supabase";

const styles = {
  paperContainer: {
    backgroundImage: `url("https://source.unsplash.com/random/")`,
    backgroundSize: `cover`,
    width: `100%`,
    height: `300px`,
    backgroundRepeat: `no-repeat`,
    textAlign: `center`,
  },
};

const Home = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const getAllChallenges = async () => {
      try {
        const { data, error } = await supabase.from("challenge").select("*");
        if (error) {
          throw error;
        }
        console.log(data);
        console.log("Data fetch Success");
        setChallenges(data);
      } catch (error) {
        alert("Database error");
        console.log(error.error_description || error.message);
      }
    };
    getAllChallenges();
  }, []);

  return (
    <Box container>
      <Paper style={styles.paperContainer}>
        <Typography variant="h3" align="center" style={{ paddingTop: `100px`, color: `white` }}>
          Let's get start your new Challenge!
        </Typography>
      </Paper>
      <Box style={{ marginTop: "30px", marginRight: "20px", marginLeft: "20px" }}>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={12}>
              {challenges.map((challenge) => (
                <Grid item xs={12} sm={4} md={4}>
                  <Card sx={{ maxWidth: 400, height: 408 }}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="140"
                      src="https://source.unsplash.com/random/"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {challenge.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {challenge.desc}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {challenge.start_date} ~ {challenge.end_date}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">
                        <Link to={"/challenge/" + challenge.challenge_id}>More Detail</Link>
                      </Button>
                    </CardActions>
                    <p>id: {challenge.user_id}</p>
                    <p>days: {challenge.days}</p>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
