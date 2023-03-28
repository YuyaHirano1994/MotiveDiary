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
import BackButton from "../../components/BackButton";
import UserIcon from "../../components/UserIcon";

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
    challenge_id: id,
    user_id: "",
    date: today,
    day: 0,
    content: "",
    created_at: "",
    updated_at: "",
  });

  const [challenge, setChallenge] = useState([]);
  const [profile, setProfile] = useState();

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
      console.log("Data fetch Error");
      console.log(error.error_description || error.message);
    }
  };

  const getProfile = async () => {
    try {
      const { data, error } = await supabase.from("profile").select("*").eq("user_id", challenge.user_id);
      if (error) {
        throw error;
      }
      setProfile({ ...profile, ...data[0] });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChallenges();
    getChallenge();
    getDays();
  }, []);

  useEffect(() => {
    getProfile();
  }, [challenge]);

  //パフォーマンスカス
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
              <UserIcon userID={user.id} width={50} height={50} />
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
            <Typography variant="h5" align="left">
              {challenge.start_date}~{challenge.end_date}
            </Typography>
            <hr />
            <Typography variant="h6" align="left" sx={{ marginLeft: 2 }}>
              {changeFormat(challenge?.desc)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent={"space-between"} sx={{ width: "100%", marginBottom: 4 }}>
            <Button variant="contained">#{challenge.category}</Button>
            <Typography variant="h4">{challenge.days} Days</Typography>
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
                    {/* {day.content} */}
                    {changeFormat(day?.content)}
                  </Typography>
                </Box>
                <CardActions sx={{ justifyContent: "right" }}>
                  {user?.id === challenge.user_id ? (
                    <Button variant="outlined">
                      <Link to={"/day/edit/" + challenge.challenge_id + "/" + day.day_id} className="button">
                        Edit Day
                      </Link>
                    </Button>
                  ) : (
                    <></>
                  )}
                </CardActions>
              </CardContent>
            </Card>
          ))}
        </Container>
      </Container>
      {/* <Container component="main">
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
                 <Typography variant="h5">You can add Day {maxDay + 1}</Typography> 

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
                {/* <img src={image} width="240" height="240" alt="ホームアイコン" /> 
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
      </Container> */}
    </>
  );
};

export default CreateDay;
