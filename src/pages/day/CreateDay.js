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
import BackButton from "../../components/BackButton";
import UserIcon from "../../components/UserIcon";
import { useRecoilValue } from "recoil";
import { sessionState } from "../../atom/sessionAtom";
import { profileState } from "../../atom/profileAtom";
import { TwitterIcon, TwitterShareButton } from "react-share";

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
  // const [profile, setProfile] = useState();
  const [days, setDays] = useState([]);
  const [maxDay, setMaxDay] = useState("");

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
      alert("同じ日付のデータは登録できません");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkInputData()) return; // 登録データのチェックを実施
    const now = new Date();

    try {
      const { error } = await supabase
        .from("day")
        .insert([
          {
            challenge_id: formValue.challenge_id,
            user_id: session.id,
            date: formValue.date,
            day: maxDay + 1,
            content: formValue.content,
          },
        ])
        .eq("challenge_id", formValue.challenge_id);
      if (error) {
        throw error;
      }
      alert("Create your challenge Success");
      setFormValue({ ...formValue, date: "", content: "" });
      getDays();
      /* 登録したデータが目標最終日だった場合、Challengeデータを更新する。 */
      if (challenge.days === maxDay + 1) {
        completedChallenge();
      }

      navigate(`/day/create/${id}`);
    } catch (error) {
      alert("Failed");
      console.log(error);
    }
  };

  const completedChallenge = async () => {
    console.log("reading comleted udate");
    try {
      const { error } = await supabase
        .from("challenge")
        .update([
          {
            completed: true,
            updated_at: new Date(),
          },
        ])
        .eq("challenge_id", formValue.challenge_id);
      if (error) {
        throw error;
      }
      alert("Completed your Challenge! Nice work!");
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
      <Container component="main" maxWidth="md" sx={{ mt: 2, mb: 2, border: "1px solid grey", borderRadius: 3 }}>
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="div"
            display={"flex"}
            justifyContent={"space-between"}
            sx={{ width: "100%", marginBottom: 4 }}
          >
            <Box component="div" display={"flex"}>
              <UserIcon width={50} height={50} />
              <Typography variant="subtitle1" align="center" sx={{ ml: 2, pt: 1 }}>
                {profile?.nickname}
              </Typography>
            </Box>
            <BackButton to="/mypage" />
          </Box>
          <Box align="center" sx={{ width: "100%", marginBottom: 4 }}>
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
            <Typography variant="h6" align="left" sx={{ marginLeft: 2 }}>
              {changeFormat(challenge?.desc)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent={"space-between"} sx={{ width: "100%", marginBottom: 4 }}>
            <Box>
              <Button variant="contained">#{challenge.category}</Button>
            </Box>
            <Box>
              <Typography variant="h4">Day</Typography>
              <Typography variant="h4">
                {days.length} / {challenge.days}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate>
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
          <TextField
            value={formValue.date || formatDate(new Date())}
            onChange={handleChange}
            margin="normal"
            required
            name="date"
            label="Date"
            type="date"
            id="date"
            variant="standard"
          />
          <TextareaAutosize
            style={{ width: "100%" }}
            minRows={10}
            value={formValue.content}
            onChange={handleChange}
            placeholder="What did you do today?"
            id="content"
            name="content"
            required
          ></TextareaAutosize>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register!
          </Button>
        </Box>
        <Container>
          {days.map((day, i) => (
            <Card className="challenge" key={day.day_id} sx={{ minHeight: 100 }}>
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
                        <Link to={"/day/edit/" + challenge.challenge_id + "/" + day.day_id} className="button">
                          Edit Day
                        </Link>
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
