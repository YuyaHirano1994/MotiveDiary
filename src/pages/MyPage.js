import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import supabase from "../common/supabase";
import { sessionState } from "../atom/sessionAtom";
import { Container } from "@mui/system";

const styles = {
  paperContainer: {
    backgroundImage: `url("https://source.unsplash.com/random/")`,
    backgroundSize: `cover`,
    width: `100%`,
    height: `100px`,
    backgroundRepeat: `no-repeat`,
    textAlign: `center`,
  },
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const MyPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [session, setSession] = useRecoilState(sessionState);
  const user = session.session?.user || null;

  const getYourChallenges = async () => {
    try {
      const { data, error } = await supabase.from("home_challenge").select("*").eq("user_id", user.id);
      if (error) {
        throw error;
      }
      console.log("Data fetch Success");
      setChallenges(data);
    } catch (error) {
      console.log(error.error_description || error.message);
    }
  };

  const [profile, setProfile] = useState({});
  const getProfile = async () => {
    try {
      const { data, error } = await supabase.from("profile").select("*").eq("user_id", user.id);

      if (error) {
        throw error;
      }

      setProfile({ ...profile, ...data[0] });
    } catch (error) {
      console.log(error);
    }
  };

  const [imageSrc, setImageSrc] = useState();

  const getAvatar = async () => {
    let filePath = profile.avatar_url;
    console.log(filePath);
    const { data } = await supabase.storage.from("avatars").getPublicUrl(filePath);
    const imageUrl = data.publicUrl;
    setImageSrc(imageUrl);
  };

  useEffect(() => {
    getYourChallenges();
    getProfile();
  }, []);

  useEffect(() => {
    getAvatar();
  }, [profile]);

  const editDesc = (desc) => {
    if (desc.length >= 40) {
      const newDesc = desc.substr(0, 40) + "...";
      return newDesc;
    } else {
      return desc;
    }
  };

  return (
    <>
      <Container component="main" maxWidth="md" sx={{}}>
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="div" display={"flex"} justifyContent={"space-between"} sx={{ width: "100%" }}>
            <Box component="div">
              <Avatar src={imageSrc} sx={{ width: 120, height: 120 }} />
            </Box>
            <Box component="div" sx={{ mt: 2, ml: 2, width: "100%" }}>
              <Typography variant="h4">{profile.nickname}</Typography>
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                {profile.comment}
              </Typography>
              <Link to={"/mypage/setting"}>
                <Button size="small">Edit Profile</Button>
              </Link>
            </Box>
            <Box
              component="div"
              align="center"
              sx={{
                display: "flex",
                flexWrap: "wrap",
                maxWidth: "200px",
              }}
            >
              <Link to={"/challenge/create"} className="link">
                <Button variant="contained" sx={{ mb: 1 }}>
                  New Challenge
                </Button>
              </Link>
              <Link to={"/day/create/none"} className="link">
                <Button variant="contained" sx={{ mb: 1 }}>
                  Register Day
                </Button>
              </Link>
              <Link to={"/home"} className="link">
                <Button variant="contained" sx={{ mb: 1 }}>
                  BACK
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="div" display={"flex"} justifyContent={"space-between"} sx={{ width: "100%" }}>
            <Typography variant="h4">Diary</Typography>
            <FormControl sx={{ minWidth: "150px" }}>
              <InputLabel id="demo-simple-select-label">仮置</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box component="div" sx={{ width: "100%", mt: 4, mb: 4, borderRadius: 3, border: "1px solid black" }}>
            {challenges.map((challenge) => (
              <Box
                component="div"
                key={challenge.challenge_id}
                display={"flex"}
                justifyContent="space-between"
                sx={{ p: 2, borderBottom: "1px solid grey" }}
              >
                <Box component="div" width={500} sx={{}}>
                  <Typography variant="h5">{challenge.title}</Typography>
                  <Typography variant="subtitle1">
                    {challenge.start_date} ~ {challenge.end_date}
                  </Typography>
                </Box>
                <Box component="div" width={200} display="flex" align="left" sx={{}}>
                  <Button>
                    <Link to={"/day/create/" + challenge.challenge_id}>Write</Link>
                  </Button>
                  <Button>
                    <Link to={"/challenge/" + challenge.challenge_id}>More detail...</Link>
                  </Button>
                </Box>
                <Box component="div" display="flex" width={100} sx={{}}>
                  {/* {editDesc(challenge.desc)} */}
                  <Typography variant="h5">
                    <Typography variant="subtitle1">day</Typography>
                    {challenge.day ? challenge.day : 0} / {challenge.days}{" "}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
      {/* <Box container>
        <Box sx={{ border: `1px solid grey`, margin: "30px 100px" }}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 540, minHeight: 500 }}>
              <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
                <TableHead sx={{ backgrounfColor: "black", color: "white" }}>
                  <TableRow>
                    <StyledTableCell>Challenge</StyledTableCell>
                    <StyledTableCell align="center">Date</StyledTableCell>
                    <TableCell align="right">End Date</TableCell> 
                    <StyledTableCell align="left">Description</StyledTableCell>
                    <StyledTableCell align="center">Day</StyledTableCell>
                    <StyledTableCell align="center">Write</StyledTableCell>
                    <StyledTableCell align="center">Detail</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {challenges.map((challenge) => (
                    <StyledTableRow
                      key={challenge.challenge_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {challenge.title}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {challenge.start_date} ~ {challenge.end_date}
                      </StyledTableCell>
                      <TableCell align="right">{challenge.fat}</TableCell>
                      <StyledTableCell align="left">{editDesc(challenge.desc)}</StyledTableCell>
                      <StyledTableCell align="center">
                        {challenge.day ? challenge.day : 0} / {challenge.days}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button>
                          <Link to={"/day/create/" + challenge.challenge_id}>Write</Link>
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button>
                          <Link to={"/challenge/" + challenge.challenge_id}>More detail...</Link>
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box> */}
    </>
  );
};

export default MyPage;
