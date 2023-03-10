import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import supabase from "../../common/supabase";
import { useRecoilState } from "recoil";
import { sessionState } from "../../atom/sessionAtom";
import { Box, Container } from "@mui/system";
import {
  Button,
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

  const [formValue, setFormValue] = useState({
    day_id: "",
    challenge_id: "",
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
        .eq("challenge_id", id, "user_id", user.id)
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
    getChallenge();
    getDays();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  console.log(formValue.date);
  console.log(days.filter((day) => day.date === formValue.date));

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

  console.log(formValue);

  return (
    <>
      <Container>
        <Typography variant="h3" align="center">
          Register Today Your Work!
        </Typography>
        <Typography variant="h3" align="center">
          You've already done {maxDay} days!!
        </Typography>
        <Typography variant="h3" align="center">
          You can add Day {maxDay + 1}
        </Typography>
      </Container>
      <Box sx={{ maxWidth: "500px", margin: "0 auto" }}>
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
            value={today}
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
            minRows={20}
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
      </Box>
      <div>
        {/* <h1>Add day challenge</h1>
        <h2>You've already done {maxDay} days!!</h2>
        <h3>You can add Day {maxDay + 1} </h3>
        <div>
          <p>{challenge.title}</p>
          <p>{challenge.desc}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Date:</label>
            <input value={formValue.date} onChange={handleChange} type="date" name="date" required />
          </div>
          <div>
            <label>Content: </label>
            <textarea value={formValue.content} onChange={handleChange} type="text" name="content" required />
          </div>
          <button type="submit">Create</button> */}
        <hr />
        <ul>
          {days.map((day) => (
            <li className="challenge" key={day.day_id}>
              <p>Date: {day.date}</p>
              {/* <p>days: {day}</p> */}
              <h5>content: {day.content}</h5>
            </li>
          ))}
        </ul>
        <hr />
        <button onClick={backHome}>BACK</button>
        {/* </form> */}
      </div>
    </>
  );
};

export default CreateDay;
