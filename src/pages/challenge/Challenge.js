import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import supabase from "../../common/supabase";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { sessionState } from "../../atom/sessionAtom";
import { useRecoilState } from "recoil";
import { Box } from "@mui/system";
import { Button, Card, CardActions, CardContent, Container, Typography } from "@mui/material";

// const styles = {
//   paperContainer: {
//     backgroundImage: `url("https://source.unsplash.com/random/")`,
//     backgroundSize: `cover`,
//     width: `100%`,
//     height: `150px`,
//     backgroundRepeat: `no-repeat`,
//     textAlign: `center`,
//   },
// };

const Challenge = () => {
  const { id } = useParams();

  const [challenge, setChallenge] = useState({
    challenge_id: "",
    title: "",
    category: "",
    days: 0,
    desc: "",
    start_date: "",
    end_date: "",
    created_at: "",
    updated_at: "",
  });

  const [days, setDays] = useState([]);

  const navigate = useNavigate();
  const [session, setSession] = useRecoilState(sessionState);
  const user = session.session?.user || null;

  const getChallenge = async () => {
    try {
      const { data, error } = await supabase.from("challenge").select("*").eq("challenge_id", id);
      if (error) {
        throw error;
      }
      console.log("Data fetch Success");
      setChallenge({ ...challenge, ...data[0] });
    } catch (error) {
      alert("Database error");
      console.log(error.error_description || error.message);
    }
  };

  // dayデータ取得
  const getDays = async () => {
    try {
      const { data, error } = await supabase
        .from("day")
        .select("*")
        .eq("challenge_id", id)
        .order("day", { ascending: false });

      console.log(data.length); //２件あれば２日目までのデータが実質登録されていることになる
      setDays(data);
    } catch (error) {}
  };

  useEffect(() => {
    getChallenge();
    getDays();
  }, [user]);

  const backHome = () => {
    navigate(-1);
  };

  const handleDelete = async () => {
    console.log(challenge.challenge_id);

    if (user.id === challenge.user_id) {
      try {
        if (window.confirm("削除しますか? Dayデータも同時にすべて削除されます。")) {
          const { data, error } = await supabase.from("challenge").delete().eq("challenge_id", challenge.challenge_id);

          if (error) {
            throw error;
          }

          const { data2, error2 } = await supabase.from("day").delete().eq("challenge_id", challenge.challenge_id);

          if (error || error2) {
            throw error;
          }

          console.log(data);
          console.log(data2);
          console.log("Delete your challenge Success");
          navigate("/mypage");
        } else {
          return;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("not your data!!");
    }
  };

  const checkUser = () => {
    if (user?.id === challenge.user_id) {
      return (
        <Box style={{ textAlign: "right" }}>
          <Link style={{ paddingLeft: "80px" }} to={"/challenge/update/" + challenge.challenge_id} className="button">
            <BsFillPencilFill size={32} />
          </Link>
          <Link style={{ paddingLeft: "20px" }} onClick={handleDelete} className="button">
            <BsFillTrashFill size={32} />
          </Link>
        </Box>
      );
    }
  };

  return (
    <>
      {/* <Paper style={styles.paperContainer}></Paper> */}{" "}
      <Box sx={{ display: "flex", margin: "20px", color: "white", justifyContent: "right" }}>
        {/* <Button variant="contained">
          <Link to={"/challenge/create"} className="link">
            Create A New Challenge !
          </Link>
        </Button> */}
        <Link to={"/mypage"} className="link">
          <Button variant="contained" sx={{ marginLeft: "30px", minWidth: 100 }}>
            BACK
          </Button>
        </Link>
      </Box>
      <Container sx={{ width: "100vw", height: "100vh" }}>
        <Box sx={{ width: "80vw", height: "100vh", margin: "0 auto" }}>
          <Typography
            variant="h2"
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: `50px`,
              paddingLeft: `100px`,
            }}
          >
            {challenge.title}
          </Typography>
          <Box>
            <Box
              sx={{
                paddingLeft: `100px`,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5">
                {challenge.start_date}~{challenge.end_date}
              </Typography>
              {checkUser()}
            </Box>
          </Box>
          <hr />
          <Box sx={{ margin: "30px 30px  0 30px" }}>
            <Box sx={{ margin: "0 70px" }}>
              <h3>{challenge.desc}</h3>
            </Box>
            <Container sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ marginLeft: "30px", textAlign: "right" }}>
                <Typography
                  sx={{
                    padding: "10px",
                    display: "inline",
                    borderRadius: "10px",
                    backgroundColor: "blue",
                    color: "white",
                  }}
                >
                  #{challenge.category}
                </Typography>
              </Box>
              <Box sx={{}}>
                <Typography variant="h4">{challenge.days} Days</Typography>
              </Box>
            </Container>
          </Box>
          <hr />
          <Container sx={{}}>
            <Button variant="outlined">
              <Link style={{}} to={"/day/create/" + challenge.challenge_id} className="button">
                Register Day
              </Link>
            </Button>
          </Container>
          <Container>
            {days.map((day) => (
              <Card className="challenge" key={day.day_id} sx={{ minHeight: 100 }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5">{day.date}</Typography>
                    <Typography variant="h5">DAY {day.day}</Typography>
                  </Box>
                  <hr />
                  <Box sx={{ margin: "0 30px" }}>
                    <Typography sx={{ wordBreak: "break-all" }} variant="body1" gutterBottom>
                      {day.content}
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

export default Challenge;
