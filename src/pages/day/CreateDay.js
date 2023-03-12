import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
        console.log("id is none");
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
      const { data, error } = await supabase.from("challenge").select("*").eq("challenge_id", id, "user_id", user.id);
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
    // getChallenge();
    getDays();
  }, []);

  useEffect(() => {
    getDays();
  }, [formValue]);

  const handleChange = (e) => {
    e.preventDefault();
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  console.log(formValue.date);
  console.log(days.filter((day) => day.date === formValue.date));
  console.log(days);

  const checkInputData = () => {
    if (days.filter((day) => day.date === formValue.date)) {
      alert("同じ日付のデータは登録できません");
      return false;
    }
    if (days[0]?.date >= formValue.date) {
      alert("日付は最新データより未来にしてください");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!checkInputData()) return; // 登録データのチェックを実施
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

  const categories = ["HTML", "CSS", "JavaScript", "TypeScript", "PHP"];

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
      <Container>
        <Typography variant="h5" align="center">
          Register Today Your Work!
        </Typography>
      </Container>
      <Container sx={{ minHeight: "600px" }}>
        <Box display={"flex"}>
          <Container>
            <Typography variant="h5">You've already done {maxDay} days!!</Typography>
            <Typography variant="h5">You can add Day {maxDay + 1}</Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <FormControl sx={{ m: 1, width: "50%" }}>
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
              <TextField
                value={formValue.date || today}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
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
          </Container>
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
      </Container>
    </>
  );
};

export default CreateDay;
