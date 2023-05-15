import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import supabase from "../../common/supabase";
import { Box, Container } from "@mui/system";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import BackButton from "../../components/BackButton";
import UserIcon from "../../components/UserIcon";
import { useRecoilValue } from "recoil";
import { sessionState } from "../../atom/sessionAtom";
import { profileState } from "../../atom/profileAtom";
import { TwitterIcon, TwitterShareButton } from "react-share";
import { DialogModal } from "../../common/DialogModal";

const dayMainStyles = { mt: 2, mb: 2, border: "1px solid grey", borderRadius: 3 };

const cardStyles = { minHeight: 100, border: "1px solid black", m: 2 };

const CreateDay = () => {
  function formatDate(date) {
    const y = date.getFullYear();
    const m = ("00" + (date.getMonth() + 1)).slice(-2);
    const d = ("00" + date.getDate()).slice(-2);
    return `${y}-${m}-${d}`;
  }
  const { id } = useParams(); //challengeID
  const navigate = useNavigate();
  const session = useRecoilValue(sessionState);
  const profile = useRecoilValue(profileState);
  const [isLoading, setIsLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    day_id: "",
    challenge_id: id,
    user_id: "",
    date: formatDate(new Date()),
    day: 0,
    content: "",
    created_at: "",
    updated_at: "",
  });
  const [challenges, setChallenges] = useState([]);
  const [challenge, setChallenge] = useState([]);
  const [days, setDays] = useState([]);
  const [maxDay, setMaxDay] = useState("");
  const [open, setOpen] = React.useState(false);
  const [modalConfig, setModalConfig] = useState();

  // dayデータ取得
  const getDays = async () => {
    try {
      const { data, error } = await supabase
        .from("day")
        .select("*")
        .eq("challenge_id", formValue.challenge_id)
        .eq("user_id", session.id)
        .order("date", { ascending: false });
      if (error) throw error;
      setMaxDay(data.length);
      setDays(data);
    } catch (error) {
      console.error(error);
    }
  };

  // challengeデータ取得
  const getChallenges = async () => {
    try {
      const { data, error } = await supabase
        .from("home_challenge")
        .select("*")
        .eq("user_id", session.id)
        .eq("completed", "FALSE");
      if (error) throw error;

      // challengeが登録されていない場合はchallenge登録ページに遷移させる
      if (!data.length) {
        alert("Please CREATE your challenge!");
        navigate("/challenge/create");
      }
      if (id === "none") {
        setFormValue({ ...formValue, challenge_id: data[0].challenge_id });
      }
      setChallenges(data);
    } catch (error) {
      console.error(error);
    }
  };

  //入力された値で登録処理を行う
  const getChallenge = async () => {
    try {
      const { data, error } = await supabase
        .from("challenge")
        .select("*")
        .eq("challenge_id", formValue.challenge_id)
        .eq("user_id", session.id);
      if (error) throw error;
      setChallenge(data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getChallenges();
  }, []);

  useEffect(() => {
    getChallenge();
    getDays();
  }, [formValue.challenge_id]);

  const handleChange = (e) => {
    e.preventDefault();
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const checkInputData = () => {
    const arr = days.filter((day) => day.date === formValue.date);
    if (arr.length) {
      alert("Cannot register data with the same date");
      setIsLoading(false);
      return false;
    }
    return true;
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      if (!checkInputData()) {
        return;
      }

      const dayData = {
        challenge_id: formValue.challenge_id,
        user_id: session.id,
        date: formValue.date,
        day: maxDay + 1,
        content: formValue.content,
      };

      const { error: dayInsertError } = await supabase
        .from("day")
        .insert([dayData])
        .eq("challenge_id", formValue.challenge_id);

      if (dayInsertError) throw dayInsertError;

      const { error: challengeUpdateError } = await supabase
        .from("challenge")
        .update([{ updated_at: new Date() }])
        .eq("challenge_id", formValue.challenge_id);

      if (challengeUpdateError) throw challengeUpdateError;

      setOpen(true);
      setIsLoading(false);
      setFormValue({ ...formValue, date: "", content: "" });
      getDays();

      if (challenge.days === maxDay + 1) {
        completedChallenge();
      }

      navigate(`/day/create/${id}`);
    } catch (error) {
      alert("Failed");
      setIsLoading(false);
      console.log(error);
    }
  };

  const completedChallenge = async () => {
    try {
      const { error } = await supabase
        .from("challenge")
        .update([
          {
            completed: true,
            end_date: new Date(),
            updated_at: new Date(),
          },
        ])
        .eq("challenge_id", formValue.challenge_id);
      if (error) throw error;
      await new Promise((resolve) => {
        setModalConfig({
          onClose: resolve,
          title: "COMPLETED",
          message: `🎉Completed your Challenge! Nice work!🎉`,
          type: false,
        });
      });
      setModalConfig(undefined);
      // alert("Completed your Challenge! Nice work!");
      navigate("/mypage");
    } catch (error) {
      alert("Failed");
      console.log(error);
    }
  };

  const changeFormat = (content) => {
    if (!content) return;
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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <MuiAlert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Registered successfully!
        </MuiAlert>
      </Snackbar>
      <Container component="main" maxWidth="md" sx={dayMainStyles}>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box display="flex" justifyContent="space-between" sx={{ width: "100%", mb: 4 }}>
            <Box display="flex">
              <UserIcon width={50} height={50} />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle1" align="left">
                  {profile?.nickname}
                </Typography>
                <Typography variant="subtitle2" align="left">
                  {profile?.comment}
                </Typography>
              </Box>
            </Box>
            <BackButton to="/mypage" />
          </Box>
          <Box align="center" sx={{ width: "100%", mb: 4 }}>
            <Typography variant="h3" align="left" sx={{ mt: 2 }}>
              {challenge.title}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5" align="left">
                {challenge.start_date}~{challenge.end_date}
              </Typography>
              <TwitterShareButton
                url={"https://motive-diary.vercel.app/"}
                title={`Taking on the challenge of ${challenge.title}! Join me in recording your own challenges on MotiveDiary. Let's keep track of our progress together!\n`}
                hashtags={["MotiveDairy"]}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </Box>
            <hr />
            <Typography variant="h6" align="left" sx={{ ml: 2 }}>
              {changeFormat(challenge?.desc)}
            </Typography>
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
        <Container>
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h5" sx={{ margin: 2 }}>
              Day {maxDay + 1}...
            </Typography>
            <FormControl>
              <InputLabel id="category">Challenge</InputLabel>
              <Select
                labelId="Challenge"
                id="challenge_id"
                name="challenge_id"
                value={formValue.challenge_id}
                onChange={handleChange}
              >
                {challenges.map((challenge) => (
                  <MenuItem value={challenge.challenge_id} key={challenge.challenge_id}>
                    {challenge.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <TextField
              value={formValue.date || formatDate(new Date())}
              onChange={handleChange}
              margin="normal"
              required
              // fullWidth
              name="date"
              label="Date"
              type="date"
              id="date"
              variant="standard"
            />
            <TextareaAutosize
              style={{ width: "90%" }}
              minRows={10}
              value={formValue.content}
              onChange={handleChange}
              placeholder="What did you do today?"
              name="content"
              label="Content"
              type="text"
              id="content"
              required
            ></TextareaAutosize>
            <Button type="submit" fullWidth variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
              Register!
            </Button>
          </Box>
        </Container>
        <Container>
          {days.map((day, i) => (
            <Card key={day.day_id} sx={cardStyles}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h5">{day.date}</Typography>
                  <Typography variant="h5">DAY {days.length - i}</Typography>
                </Box>
                <hr />
                <Box sx={{ margin: "0 30px" }}>
                  <Typography variant="body1" gutterBottom>
                    {changeFormat(day?.content)}
                  </Typography>
                </Box>
                <CardActions sx={{ justifyContent: "space-between" }}>
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

export default CreateDay;
