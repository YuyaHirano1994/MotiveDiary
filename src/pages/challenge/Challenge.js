import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import supabase from "../../common/supabase";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { sessionState } from "../../atom/sessionAtom";
import { useRecoilState } from "recoil";
import { Box } from "@mui/system";
import { Avatar, Button, Card, CardActions, CardContent, Container, Typography } from "@mui/material";

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
        <Box component="div">
          <Button variant="outlined">
            <Link to={"/mypage"} className="button">
              {/* <BsFillTrashFill size={32} /> */}
              BACK
            </Link>
          </Button>
          <Button variant="outlined" sx={{ marginLeft: 2 }}>
            <Link to={"/challenge/update/" + challenge.challenge_id} className="button">
              {/* <BsFillPencilFill size={32} /> */}
              Edit
            </Link>
          </Button>
          <Button variant="outlined" color="error" sx={{ marginLeft: 2 }}>
            <Link onClick={handleDelete} className="button">
              {/* <BsFillTrashFill size={32} /> */}
              Delete
            </Link>
          </Button>
        </Box>
      );
    } else {
      return (
        <Box component="div">
          <Button variant="outlined">
            <Link to={"/mypage"} className="button">
              {/* <BsFillTrashFill size={32} /> */}
              BACK
            </Link>
          </Button>
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

  return (
    <>
      <Container component="main" maxWidth="md">
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
              <Avatar src={""} sx={{ width: 25, height: 25 }}></Avatar>
              <Typography variant="subtitle1" align="center" marginLeft={2}>
                Author Name
              </Typography>
            </Box>
            {checkUser()}
          </Box>
          <Box align="center" sx={{ width: "100%", marginBottom: 4 }}>
            <Typography variant="h5" align="left">
              {challenge.start_date}~{challenge.end_date}
            </Typography>
            <Typography variant="h3" align="left" sx={{ marginBottom: 2 }}>
              {challenge.title}
            </Typography>
            <hr />
            <Typography variant="h6" align="left" sx={{ marginLeft: 2 }}>
              {changeFormat(challenge.desc)}
              {/* {challenge.desc} */}
            </Typography>
          </Box>
          <Box display="flex" justifyContent={"space-between"} sx={{ width: "100%", marginBottom: 4 }}>
            <Button variant="contained">#{challenge.category}</Button>
            <Typography variant="h4">{challenge.days} Days</Typography>
          </Box>
        </Box>
        <Box align="right" sx={{ width: "100%", marginBottom: 4 }}>
          {user?.id === challenge.user_id ? (
            <Button variant="contained">
              <Link style={{}} to={"/day/create/" + challenge.challenge_id} className="button">
                Register Day
              </Link>
            </Button>
          ) : (
            <></>
          )}
        </Box>
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
                    {/* {day.content} */}
                    {changeFormat(day.content)}
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
    </>
  );
};

export default Challenge;
