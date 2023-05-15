import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import supabase from "../../common/supabase";
import { Box } from "@mui/system";
import { Button, Card, CardActions, CardContent, Container, Typography, useMediaQuery } from "@mui/material";
import BackButton from "../../components/BackButton";
import UserIcon from "../../components/UserIcon";
import { DialogModal } from "../../common/DialogModal";
import { useRecoilValue } from "recoil";
import { sessionState } from "../../atom/sessionAtom";
import { TwitterIcon, TwitterShareButton } from "react-share";
import { useTheme } from "@mui/material/styles";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LikeButton from "../../components/LikeButton";

const challengeMainStyles = {
  marginTop: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const menuStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
};

const mainStyles = { mt: 2, mb: 2, border: "1px solid grey", borderRadius: 3 };

const challengeStyles = { display: "flex", justifyContent: "space-between" };

const cardStyles = { minHeight: 100, border: "1px solid black", m: 2 };

const Challenge = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { id } = useParams();
  const navigate = useNavigate();
  const session = useRecoilValue(sessionState);
  const [modalConfig, setModalConfig] = useState();
  const [challenge, setChallenge] = useState({
    challenge_id: "",
    user_id: "",
    title: "",
    category: "",
    days: 0,
    desc: "",
    start_date: "",
    end_date: "",
    created_at: "",
    updated_at: "",
  });
  const [profile, setProfile] = useState();
  const [days, setDays] = useState([]);

  const getChallenge = async () => {
    try {
      const { data, error } = await supabase.from("challenge").select("*").eq("challenge_id", id);
      if (error) throw error;
      setChallenge({ ...challenge, ...data[0] });
    } catch (error) {
      console.log(error.error_description || error.message);
    }
  };

  const getDays = async () => {
    try {
      const { data, error } = await supabase
        .from("day")
        .select("*")
        .eq("challenge_id", id)
        .order("date", { ascending: false });
      if (error) throw error;
      setDays(data);
    } catch (error) {
      console.log(error.error_description || error.message);
    }
  };

  const getProfile = async () => {
    try {
      const { data, error } = await supabase.from("profile").select("*").eq("user_id", challenge.user_id);
      if (error) throw error;
      setProfile({ ...profile, ...data[0] });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChallenge();
    getDays();
  }, []);

  useEffect(() => {
    if (challenge.user_id) {
      getProfile();
    }
  }, [challenge]);

  const handleDeleteClick = async () => {
    const ret = await new Promise((resolve) => {
      setModalConfig({
        onClose: resolve,
        title: "Delete data",
        message: "When you delete, you can't restore it again. Are you sure?",
        type: true,
      });
    });
    setModalConfig(undefined);
    if (ret === "ok") {
      try {
        const deleteDayResult = await supabase.from("day").delete().eq("challenge_id", challenge.challenge_id);
        const deleteChallengeResult = await supabase
          .from("challenge")
          .delete()
          .eq("challenge_id", challenge.challenge_id);

        if (deleteDayResult.error || deleteChallengeResult.error) {
          throw new Error("An error occurred while deleting data.");
        }

        navigate("/mypage");
      } catch (error) {
        console.log(error);
      }
    }

    if (ret === "cancel") {
      return;
    }
  };

  const checkUser = () => {
    if (session?.id === challenge.user_id) {
      return (
        <Box>
          {isMobile ? (
            <>
              <Box sx={menuStyles}>
                <Link to={"/challenge/update/" + challenge.challenge_id}>
                  <Button variant="outlined" size="small" sx={{ ml: 2, mb: 1 }}>
                    <ModeEditOutlineIcon />
                    Edit
                  </Button>
                </Link>
                <Link onClick={handleDeleteClick}>
                  <Button variant="outlined" size="small" color="error" sx={{ ml: 2, mb: 1 }}>
                    <DeleteOutlineIcon />
                    Delete
                  </Button>
                </Link>
                <BackButton />
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ ml: "auto" }}>
                <Link to={"/challenge/update/" + challenge.challenge_id}>
                  <Button variant="outlined" size="small" sx={{ ml: 2 }}>
                    <ModeEditOutlineIcon />
                    Edit
                  </Button>
                </Link>
                <Link onClick={handleDeleteClick}>
                  <Button variant="outlined" size="small" color="error" sx={{ ml: 2, mr: 2 }}>
                    {modalConfig && <DialogModal {...modalConfig} />}
                    <DeleteOutlineIcon />
                    Delete
                  </Button>
                </Link>
                <BackButton />
              </Box>
            </>
          )}
        </Box>
      );
    } else {
      return (
        <Box>
          <BackButton />
        </Box>
      );
    }
  };

  const changeFormat = (content) => {
    const texts = content.split("\n").map((item, index) => {
      return (
        <React.Fragment key={index}>
          {item}
          <br />
        </React.Fragment>
      );
    });
    return <div>{texts}</div>;
  };

  const tweetContent = (text) => {
    return text.substr(0, 50) + "...";
  };

  return (
    <>
      {modalConfig && <DialogModal {...modalConfig} />}
      <Container component="main" maxWidth="md" sx={mainStyles}>
        <Box sx={challengeMainStyles}>
          <Box display="flex" justifyContent="space-between" sx={{ width: "100%", mb: 4 }}>
            <Box display="flex">
              <UserIcon userID={challenge.user_id} width={50} height={50} />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle1" align="left">
                  {profile?.nickname}
                </Typography>
                <Typography variant="subtitle2" align="left">
                  {profile?.comment}
                </Typography>
              </Box>
            </Box>
            {checkUser()}
          </Box>
          <Box sx={{ width: "100%", height: "auto", mb: 4 }}>
            <Typography variant="h3" align="left" sx={{ mt: 2 }}>
              {challenge.title}
            </Typography>
            <Box sx={challengeStyles}>
              <Typography variant="h5" align="left">
                {challenge.start_date}~{challenge.end_date}
              </Typography>
              <Box display="flex">
                {session?.id === challenge.user_id ? (
                  <TwitterShareButton
                    url={"https://motive-diary.vercel.app/"}
                    title={`Taking on the challenge of ${challenge.title}! Join me in recording your own challenges on MotiveDiary. Let's keep track of our progress together!\n`}
                    hashtags={["MotiveDairy"]}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
            <hr />
            <Box display="flex" justifyContent="space-between">
              <Box width="80%" sx={{ wordWrap: "break-word" }}>
                <Typography variant="h6" align="left" sx={{ ml: 2 }}>
                  {changeFormat(challenge?.desc)}
                </Typography>
              </Box>
              <Box>
                <LikeButton challenge_id={id} />
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" sx={{ width: "100%", mb: 4 }}>
            <Box>
              <Button color="info" variant="contained">
                #{challenge.category}
              </Button>
            </Box>
            <Box>
              <Typography variant="h4">Day</Typography>
              <Typography variant="h4">
                {days.length} / {challenge.days}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box align="right" sx={{ width: "100%", mb: 4 }}>
          {session?.id === challenge.user_id ? (
            <Button variant="contained" disabled={challenge.end_date}>
              <Link to={"/day/create/" + challenge.challenge_id}>Register Day</Link>
            </Button>
          ) : (
            <></>
          )}
        </Box>
        <Container>
          {days.map((day, i) => (
            <Card key={day.day_id} sx={cardStyles}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h5">{day.date}</Typography>
                  <Typography variant="h5">DAY {days.length - i}</Typography>
                </Box>
                <hr />
                <Box sx={{ m: "0 30px" }}>
                  <Typography variant="body1" gutterBottom>
                    {changeFormat(day.content)}
                  </Typography>
                </Box>
                <CardActions>
                  {session?.id === challenge.user_id ? (
                    <>
                      <TwitterShareButton
                        url={"https://motive-diary.vercel.app/"}
                        title={`${challenge.title}\nDAY${days?.length - i}\n${tweetContent(day?.content)}\n`}
                        hashtags={["MotiveDairy"]}
                      >
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                      <Button variant="outlined">
                        <Link to={"/day/edit/" + challenge.challenge_id + "/" + day.day_id}>Edit Day</Link>
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </CardActions>
              </CardContent>
            </Card>
          ))}
        </Container>
      </Container>
    </>
  );
};

export default Challenge;
