import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import supabase from "../common/supabase";
import { sessionState } from "../atom/sessionAtom";

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

  useEffect(() => {
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
    getYourChallenges();
  }, []);

  const [avatar, setAvatar] = useState();

  // const getAvatar = async () => {
  //   let filePath =
  //     "https://hgalljuhvutaihbgjdaz.supabase.co/storage/v1/object/sign/avatars/pexels-trinity-kubassek-288621.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL3BleGVscy10cmluaXR5LWt1YmFzc2VrLTI4ODYyMS5qcGciLCJpYXQiOjE2NzcxMjY5MTksImV4cCI6MTY3NzEzMDUxOX0.OaU8rY9HwBvHQfbptKtt80zxpB5BwcheApH2yjNE4ww&t=2023-02-23T04%3A35%3A19.799Z";
  //   const { data } = await supabase.storage.from("avatars").getPublicUrl("pexels-trinity-kubassek-288621.jpg");
  //   console.log(data);
  //   const imageUrl = data.publicUrl;
  //   console.log(imageUrl);
  //   setAvatar(imageUrl);
  // };

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
      {/* <button onClick={getAvatar}>getAvatar</button> */}
      {/* <img src={avatar} alt="sample"></img> */}
      <Paper style={styles.paperContainer}>
        <Typography variant="h3" align="center" style={{ paddingTop: `10px`, color: `white` }}>
          MyPage
        </Typography>
      </Paper>
      <Box style={{ marginTop: "30px", marginRight: "20px", marginLeft: "20px" }}>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={12}>
              {challenges.map((challenge) => (
                <Grid item xs={12} display="flex" justifyContent="center" key={challenge.challenge_id}>
                  <Card sx={{ maxWidth: 400, height: 408 }} style={{ width: "400px" }}>
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
      <Link to={"/challenge/create"}>Create</Link>
      <br />
      <Link to={"/home"}>BACK</Link>
      <br />
      <Link to={"/mypage/setting"}>setting</Link>
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
