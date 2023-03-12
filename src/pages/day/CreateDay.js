import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import image from "../../assets/images/Left hander-pana.svg";
import supabase from "../../common/supabase";
import { useRecoilState } from "recoil";
import { sessionState } from "../../atom/sessionAtom";
import { Box, Container } from "@mui/system";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";

const CreateDay = () => {
  const dt = new Date();
  var y = dt.getFullYear();
  var m = ("00" + (dt.getMonth() + 1)).slice(-2);
  var d = ("00" + dt.getDate()).slice(-2);
  var today = `${y}-${m}-${d}`;
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useRecoilState(sessionState);
  const user = session.session?.user || null;

  console.log(id);

  const [formValue, setFormValue] = useState({
    day_id: "",
    challenge_id: id,
    user_id: "",
    date: today,
    day: 0,
    content: "",
    created_at: "",
    updated_at: "",
  });

  const [challenge, setChallenge] = useState([]);

  const [days, setDays] = useState([]);

  const [maxDay, setMaxDay] = useState("");

  // dayデータ取得
  const getDays = async () => {
    try {
      const { data, error } = await supabase
        .from("day")
        .select("*")
        .eq("challenge_id", formValue.challenge_id, "user_id", user.id)
        .order("date", { ascending: false });

      // console.log(data.length); //２件あれば２日目までのデータが実質登録されていることになる
      setMaxDay(data.length);
      setDays(data);
    } catch (error) {}
  };

  // challengeデータ取得
  const [challenges, setChallenges] = useState([]);

  const getChallenges = async () => {
    try {
      const { data, error } = await supabase.from("home_challenge").select("*").eq("user_id", user.id);
      if (error) {
        throw error;
      }
      console.log("getChallenges fetch Success");
      console.log(data);
      if (id === "none") {
        setFormValue({ ...formValue, challenge_id: data[0].challenge_id });
      }
      setChallenges(data);
    } catch (error) {
      console.log(error.error_description || error.message);
    }
  };

  //入力された値で登録処理を行う
  const getChallenge = async () => {
    try {
      const { data, error } = await supabase
        .from("challenge")
        .select("*")
        .eq("challenge_id", formValue.challenge_id, "user_id", user.id);
      if (error) {
        throw error;
      }
      console.log("Data fetch Success");
      setChallenge(data[0]);
    } catch (error) {
      alert("Database error");
      console.log(error.error_description || error.message);
    }
  };

  useEffect(() => {
    getChallenges();
    getChallenge();
    getDays();
  }, []);

  console.log(challenge);

  useEffect(() => {
    getChallenge();
    getDays();
  }, [formValue]);

  const handleChange = (e) => {
    e.preventDefault();
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  console.log(days.filter((day) => day.date === formValue.date));

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
            user_id: user.id,
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
      navigate(`/day/create/${id}`);
    } catch (error) {
      alert("Failed");
      console.log(error);
    }
  };

  const backHome = () => {
    navigate("/mypage");
  };

  // const [showTitle, setShowTitle] = useState([]);

  // const handleChallengeChange = (e) => {
  //   const target = challenges.filter((challenge) => challenge.challenge_id === e.target.value);
  //   console.log(target);
  //   setShowTitle(target[0]?.title);
  //   // handleChange(e);
  // };
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
  console.log(formValue);

  return (
    <>
      <Container component="main">
        <Box
          sx={{
            margin: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" align="center">
            Register Your Day
          </Typography>
          <Grid container spacing={2} columns={16} sx={{ marginTop: 5 }}>
            <Grid xs={8}>
              <Box component={"div"} sx={{ paddingRight: 3 }}>
                <Card sx={{ marginBottom: 3 }}>
                  <CardContent>
                    <Box component="div" display="flex" justifyContent={"space-between"}>
                      <Typography variant="h5" align="left">
                        {challenge.title}
                      </Typography>
                      <Typography variant="subtitle1" align="right">
                        {challenge.start_date}〜
                      </Typography>
                    </Box>
                    <hr />
                    <Box component="div" display="flex" justifyContent={"space-between"}>
                      <Typography variant="subtitle1" align="left">
                        {challenge.desc}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1" align="right">
                      {challenge.days}days
                    </Typography>
                  </CardContent>
                </Card>
                <Container sx={{ height: "500px", overflowY: "scroll" }}>
                  {days.map((day, index) => (
                    <Card className="challenge" key={day.day_id} sx={{ minHeight: 100 }}>
                      <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                          <Typography variant="h5">{day.date}</Typography>
                          <Typography variant="h5">DAY {days.length - index}</Typography>
                        </Box>
                        <hr />
                        <Box sx={{ margin: "0 30px" }}>
                          <Typography sx={{ wordBreak: "break-all" }} variant="body1" gutterBottom>
                            {/* {day.content} */}
                            {changeFormat(day.content)}
                          </Typography>
                        </Box>
                        <CardActions sx={{ justifyContent: "right" }}>
                          {user?.id === challenge.user_id ? (
                            <Link to={"/day/edit/" + challenge.challenge_id + "/" + day.day_id} className="button">
                              Edit Day
                            </Link>
                          ) : (
                            <></>
                          )}
                        </CardActions>
                      </CardContent>
                    </Card>
                  ))}
                </Container>
              </Box>
            </Grid>
            <Grid xs={8}>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                {/* <Typography variant="h5">You've already done {maxDay} days!!</Typography>
                <Typography variant="h5">You can add Day {maxDay + 1}</Typography> */}

                <Typography variant="h5" sx={{ margin: 2 }}>
                  Day {maxDay + 1}
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
                      <MenuItem value={challenge.challenge_id}>{challenge.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <img src={image} width="240" height="240" alt="ホームアイコン" /> */}
                <br />
                <TextField
                  value={formValue.date || today}
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
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default CreateDay;
