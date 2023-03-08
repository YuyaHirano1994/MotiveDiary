import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import supabase from "../common/supabase";
import { sessionState } from "../atom/sessionAtom";
import { Container } from "@mui/system";

const styles = {
  paperContainer: {
    backgroundImage: `url("https://source.unsplash.com/random/")`,
    backgroundSize: `cover`,
    width: `100%`,
    height: `100px`,
    backgroundRepeat: `no-repeat`,
    textAlign: `center`,
  },
};

const MyPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [session, setSession] = useRecoilState(sessionState);
  const user = session.session?.user || null;

  const getYourChallenges = async () => {
    try {
      const { data, error } = await supabase.from("home_challenge").select("*").eq("user_id", user.id);
      if (error) {
        throw error;
      }
      console.log("Data fetch Success");
      setChallenges(data);
    } catch (error) {
      console.log(error.error_description || error.message);
    }
  };

  const [profile, setProfile] = useState({});
  const getProfile = async () => {
    try {
      const { data, error } = await supabase.from("profile").select("*").eq("user_id", user.id);

      if (error) {
        throw error;
      }

      setProfile({ ...profile, ...data[0] });
    } catch (error) {
      console.log(error);
    }
  };

  const [imageSrc, setImageSrc] = useState();

  const getAvatar = async () => {
    let filePath = profile.avatar_url;
    console.log(filePath);
    const { data } = await supabase.storage.from("avatars").getPublicUrl(filePath);
    const imageUrl = data.publicUrl;
    setImageSrc(imageUrl);
  };

  useEffect(() => {
    getYourChallenges();
    getProfile();
  }, []);

  useEffect(() => {
    getAvatar();
  }, [profile]);

  const editDesc = (desc) => {
    if (desc.length >= 40) {
      const newDesc = desc.substr(0, 40) + "...";
      return newDesc;
    } else {
      return desc;
    }
  };

  return (
    <Box container>
      <Paper style={styles.paperContainer}>
        <Typography variant="h3" align="center" style={{ paddingTop: `10px`, color: `white` }}>
          MyPage
        </Typography>
      </Paper>
      <Container sx={{ display: "flex" }}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}>
          <Avatar src={imageSrc} sx={{ width: 120, height: 120, marginTop: "20px" }}></Avatar>
          <Box sx={{ marginTop: "50px" }}>
            <Typography variant="h4">{profile.nickname}</Typography>
          </Box>
          <Box>
            <Box sx={{ marginTop: "50px" }}>
              <Link to={"/challenge/create"} className="link">
                <Button variant="contained" sx={{ minWidth: 200 }}>
                  New Challenge
                </Button>
              </Link>
              <Link to={"/home"} className="link">
                <Button variant="contained" sx={{ marginLeft: "30px", minWidth: 200 }}>
                  BACK
                </Button>
              </Link>
            </Box>
            <Box sx={{ marginTop: "10px" }}>
              <Link to={"/mypage/setting"} className="link">
                <Button variant="contained" sx={{ minWidth: 200 }}>
                  Setting
                </Button>
              </Link>
              {/* <Link to={"/home"} className="link">
                <Button variant="contained" sx={{ marginLeft: "30px", minWidth: 100 }}>
                  BACK
                </Button>
              </Link> */}
            </Box>
          </Box>
        </Box>
      </Container>
      <hr />
      <Box style={{ marginTop: "30px", marginRight: "20px", marginLeft: "20px" }}>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12} display="flex" align="center">
            <Grid container display="flex" justifyContent="space-around" spacing={3}>
              {challenges.map((challenge) => (
                <Grid item xs={12} md={4} key={challenge.challenge_id}>
                  <Card sx={{ width: 300, height: 308 }}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="50px"
                      src="https://source.unsplash.com/random/"
                    />
                    <CardContent>
                      <Box align="left">
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
                      </Box>
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

    // <div>
    //   <h1>MyPage</h1>

    //   <Link to={"/challenge/create"}>Create</Link>
    //   <br />
    //   <Link to={"/home"}>BACK</Link>
    //   <br />
    //   <Link to={"/mypage/setting"}>setting</Link>
    //   <ul>
    //     {challenges.map((challenge) => (
    //       <li className="challenge" key={challenge.challenge_id}>
    //         <p>id: {challenge.user_id}</p>
    //         <p>days: {challenge.days}</p>
    //         <h1>title: {challenge.title}</h1>
    //         <h3>desc: {challenge.desc}</h3>
    //         <h3>start_date: {challenge.start_date}</h3>
    //         <h3>end_date: {challenge.end_date}</h3>
    //         <p>created_at: {challenge.created_at}</p>
    //         <p>updated_at: {challenge.updated_at}</p>
    //         <div className="button">
    //           <Link to={"/challenge/" + challenge.challenge_id}>More detail...</Link>
    //         </div>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default MyPage;
