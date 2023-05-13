import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import UserIcon from "../components/UserIcon";
import supabase from "../common/supabase";
import topImage from "../assets/images/home_hero.jpg";
import LikeButton from "../components/LikeButton";

const styles = {
  paperContainer: {
    backgroundImage: `url(${topImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "150px",
    backgroundRepeat: "no-repeat",
    textAlign: "center",
    position: "relative", // 追加: テキストの位置を制御するために相対的な位置を設定
  },
  paperText: {
    width: "80%",
    position: "absolute", // 追加: テキストの位置を制御するために絶対的な位置を設定
    top: "50%", // 追加: テキストを縦方向の中央に配置
    left: "50%", // 追加: テキストを横方向の中央に配置
    transform: "translate(-50%, -50%)", // 追加: テキストを正確な中央に配置
    color: "white", // 修正: 文字色を白に設定
    backgroundColor: "rgba(0, 0, 0, 0.4)", // 修正: 背景色を半透明の黒に設定
    padding: "20px", // 追加: テキストのパディングを設定
    borderRadius: "8px", // 追加: テキストの角を丸める
    fontSize: "24px", // 追加: テキストのフォントサイズを設定
    fontWeight: "bold", // 追加: テキストのフォントウェイトを設定
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

const completedStyles = {
  ml: 1,
  p: 1,
  backgroundColor: "orange",
  color: "white",
  borderRadius: 2,
};

const Home = () => {
  const [challenges, setChallenges] = useState([]);

  const getAllChallenges = async () => {
    try {
      const { data, error } = await supabase
        .from("home_challenge")
        .select("*")
        .order("updated_at", { ascending: false });
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
        <Typography variant="h3" align="center" sx={styles.paperText}>
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
                  <Box flexGrow={1} pt={1}>
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                      {challenge.nickname}
                    </Typography>
                    {challenge.completed && (
                      <Typography variant="subtitle2" sx={completedStyles}>
                        Completed 🎉
                      </Typography>
                    )}
                  </Box>
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
