import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../common/supabase";
import { Container } from "@mui/system";
import UserIcon from "../components/UserIcon";
import useAuth from "../common/useAuth";
import { useRecoilValue, useRecoilState } from "recoil";
import { sessionState } from "../atom/sessionAtom";
import { profileState } from "../atom/profileAtom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LikeButton from "../components/LikeButton";

const mainStyles = {
  mt: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const profileStyles = {
  display: "flex",
  justifyContent: "space-between",
  mt: 2,
  ml: 2,
  width: "100%",
};

const menuStyles = {
  display: "flex",
  flexWrap: "wrap",
  maxWidth: "180px",
};

const challengeStyles = {
  width: "100%",
  mt: 1,
  mb: 4,
  borderRadius: 3,
  border: "1px solid black",
};

const contentBorderStyles = {
  p: 2,
  borderBottom: "1px solid grey",
};

const challengeMenuStyles = {
  display: "block",
  width: "45px",
  "@media screen and (min-width:700px)": {
    display: "flex",
    mt: 2,
    gap: "10px",
    width: "auto",
  },
};

const MyPage = () => {
  const session = useRecoilValue(sessionState);
  const [profile, setProfile] = useRecoilState(profileState);
  const [notCompletedChallenges, setNotCompletedChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);

  useEffect(() => {
    const getYourChallenges = async () => {
      try {
        const { data, error } = await supabase
          .from("home_challenge")
          .select("*")
          .eq("user_id", session.id)
          .order("start_date", { ascending: false });
        if (error) throw error;
        setNotCompletedChallenges(data.filter((challenge) => challenge.completed === false));
        setCompletedChallenges(data.filter((challenge) => challenge.completed === true));
      } catch (error) {
        console.log(error.error_description || error.message);
      }
    };

    const getProfile = async () => {
      try {
        const { data, error } = await supabase.from("profile").select("*").eq("user_id", session.id);
        if (error) throw error;
        setProfile({ ...profile, ...data[0] });
      } catch (error) {
        console.log(error);
      }
    };

    if (session) {
      getProfile();
      getYourChallenges();
    }
  }, [session]);

  return (
    <>
      <Container component="main" maxWidth="md">
        <Box sx={mainStyles}>
          <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }}>
            <Box display={{ xs: "none", sm: "block" }}>
              <UserIcon />
            </Box>
            <Box sx={profileStyles}>
              <Box>
                <Typography variant="h4">{profile?.nickname}</Typography>
                <Typography variant="subtitle1" sx={{ ml: 1 }}>
                  {profile?.comment}
                </Typography>
                <Link to={"/mypage/setting"}>
                  <Button size="small">Edit Profile</Button>
                </Link>
              </Box>
              <Box align="center" width="auto" sx={menuStyles}>
                <Link to={"/challenge/create"} className="link">
                  <Button variant="contained" sx={{ mb: 1 }}>
                    <Typography variant="button">New Challenge</Typography>
                  </Button>
                </Link>
                <Link to={"/day/create/none"} className="link">
                  <Button variant="contained" sx={{ mb: 1 }}>
                    Register Day
                  </Button>
                </Link>
                <Link to={"/home"} className="link">
                  <Button variant="contained" sx={{ mb: 1 }}>
                    HOME
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={mainStyles}>
          <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }}>
            <Typography variant="h5">
              <BorderColorIcon />
              Challenging
            </Typography>
          </Box>
          <Box sx={challengeStyles}>
            {notCompletedChallenges.map((challenge) => (
              <Box key={challenge.challenge_id} display="flex" justifyContent="space-between" sx={contentBorderStyles}>
                <Box
                  sx={{
                    width: "40%",
                    "@media screen and (min-width:700px)": { width: "50%" },
                  }}
                >
                  <Box sx={{ wordWrap: "break-word" }}>
                    <Typography variant="h5">{challenge.title}</Typography>
                  </Box>
                  <Typography variant="subtitle1">
                    {challenge.start_date} ~ {challenge.end_date}
                  </Typography>
                </Box>
                <Box sx={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
                  <Box sx={challengeMenuStyles}>
                    <Link to={"/day/create/" + challenge.challenge_id}>
                      <Button variant="contained" size="small" color="info" sx={{ mb: "10px" }}>
                        Write
                      </Button>
                    </Link>
                    <Link to={"/challenge/" + challenge.challenge_id}>
                      <Button variant="contained" size="small" color="info" sx={{ mb: "10px" }}>
                        Detail
                      </Button>
                    </Link>
                    <Box>
                      <LikeButton challenge_id={challenge.challenge_id} />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "block",
                      "@media screen and (min-width:700px)": { display: "flex", textAlign: "center" },
                    }}
                  >
                    <Box sx={{ width: 50, ml: 5, "@media screen and (min-width:700px)": { width: 80, ml: 5 } }}>
                      <Box>
                        <Typography variant="h6">Day</Typography>
                        <Typography variant="h6">
                          {challenge.day ? challenge.day : 0}/{challenge.days}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }}>
            <Typography variant="h5">
              <EmojiEventsIcon color="error" />
              Achieved
            </Typography>
          </Box>
          <Box sx={challengeStyles}>
            {completedChallenges.map((challenge) => (
              <Box key={challenge.challenge_id} display="flex" justifyContent="space-between" sx={contentBorderStyles}>
                <Box sx={{ width: "40%", "@media screen and (min-width:700px)": { width: "50%" } }}>
                  <Box sx={{ wordWrap: "break-word" }}>
                    <Typography variant="h5">{challenge.title}</Typography>
                  </Box>
                  <Typography variant="subtitle1">
                    {challenge.start_date} ~ {challenge.end_date}
                  </Typography>
                </Box>
                <Box sx={{ width: "50%", display: "flex", justifyContent: "flex-end" }}>
                  <Box sx={challengeMenuStyles}>
                    <Link to={"/challenge/" + challenge.challenge_id}>
                      <Button variant="contained" size="small" color="info" sx={{ mb: "10px" }}>
                        Detail
                      </Button>
                    </Link>
                    <Box>
                      <LikeButton challenge_id={challenge.challenge_id} />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "block",
                      "@media screen and (min-width:700px)": { display: "flex", textAlign: "center" },
                    }}
                  >
                    <Box sx={{ width: 50, ml: 5, "@media screen and (min-width:700px)": { width: 80, ml: 5 } }}>
                      <Box>
                        <Typography variant="h6">Day</Typography>
                        <Typography variant="h6">
                          {challenge.day ? challenge.day : 0}/{challenge.days}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default MyPage;
