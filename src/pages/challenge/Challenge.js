import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import supabase from "../../common/supabase";
import { Box } from "@mui/system";
import { Button, Card, CardActions, CardContent, Container, Typography } from "@mui/material";
import BackButton from "../../components/BackButton";
import UserIcon from "../../components/UserIcon";
import useAuth from "../../common/useAuth";

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
  const navigate = useNavigate();
  const { user, error } = useAuth();

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
      if (error) {
        throw error;
      }
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

      setDays(data);
    } catch (error) {}
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
    getChallenge();
    getDays();
  }, []);

  useEffect(() => {
    getProfile();
  }, [challenge]);

  const handleDelete = async () => {
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
          <BackButton />
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
              <UserIcon userID={challenge.user_id} width={50} height={50} />
              <Typography variant="subtitle1" align="center" sx={{ ml: 2, pt: 1 }}>
                {profile?.nickname}
              </Typography>
            </Box>
            {checkUser()}
          </Box>
          <Box align="center" sx={{ width: "100%", mb: 4 }}>
            <Typography variant="h3" align="left" sx={{ mt: 2 }}>
              {challenge.title}
            </Typography>
            <Typography variant="h5" align="left">
              {challenge.start_date}~{challenge.end_date}
            </Typography>
            <hr />
            <Typography variant="h6" align="left" sx={{ ml: 2 }}>
              {changeFormat(challenge?.desc)}
            </Typography>
            <hr />
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
