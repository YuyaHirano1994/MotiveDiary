import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
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
        const { data, error } = await supabase.from("home_challenge").select("*");
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
            <Box component="div" textAlign={"center"} sx={{ mt: 5 }}>
              Side Area 1<br />
              Under Constructions
            </Box>
          </Grid>
          <Grid item md={6} xs={10} sx={{}}>
            <Box component="div" sx={{}}>
              <Box component="div">
                <Box component="div" sx={{ mt: 2 }}>
                  <Button variant="text" size="large">
                    Latest
                  </Button>
                  <Button variant="text" size="large">
                    Top
                  </Button>
                  <Button variant="text" size="large">
                    Recommend
                  </Button>
                </Box>
                <Box component="div" sx={{ m: 1 }}>
                  {challenges.map((challenge) => (
                    <Box
                      component="div"
                      sx={{ pr: 1, pl: 1, mb: 2, backgroundColor: "white", border: "1px solid white", borderRadius: 2 }}
                    >
                      <UserIcon id={challenge.challenge_id} />
                      <Box component="div" display={"flex"} sx={{ mt: 2 }}>
                        <Avatar src={""} sx={{ width: 32, height: 32, mr: 1 }} />
                        <Typography variant="subtitle2">Autor Name</Typography>
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
                          <Box component="div" sx={{}}>
                            <Button>Good Button</Button>
                          </Box>
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
            <Box component="div" textAlign={"center"} sx={{ mt: 5 }}>
              Side Area 2<br />
              Under Constructions
            </Box>
          </Grid>
        </Grid>
        HERE
      </Container>
      <Box container>
        {/* <Paper style={styles.paperContainer}>
          <Typography variant="h3" align="center" style={{ paddingTop: `100px`, color: `white` }}>
            Let's get start your new Challenge!
          </Typography>
        </Paper> */}
        <Box style={{ marginTop: "30px", marginRight: "20px", marginLeft: "20px" }}>
          <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={12}>
                {challenges.map((challenge) => (
                  <Grid item xs={12} sm={4} md={4} key={challenge.challenge_id}>
                    <Card sx={{ maxWidth: 400, height: 408 }}>
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        src="https://source.unsplash.com/random/"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          days: {challenge.day ? challenge.day : 0} / {challenge.days}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                          {challenge.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {editDesc(challenge.desc)}
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
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Home;
