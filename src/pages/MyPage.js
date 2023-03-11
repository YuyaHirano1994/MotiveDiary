import {
  Avatar,
  Box,
  Button,
  Paper,
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
    <Box container>
      <Paper style={styles.paperContainer}>
        <Typography variant="h3" align="center" style={{ paddingTop: `10px`, color: `white` }}>
          MyPage
        </Typography>
      </Paper>
      <Container sx={{ display: "flex" }}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}>
          <Avatar src={imageSrc} sx={{ width: 120, height: 120, marginTop: "20px" }}></Avatar>
          <Box sx={{ marginTop: "50px" }}>
            <Typography variant="h4">{profile.nickname}</Typography>
          </Box>
          <Box>
            <Box sx={{ marginTop: "50px" }}>
              <Link to={"/challenge/create"} className="link">
                <Button variant="contained" sx={{ minWidth: 200 }}>
                  New Challenge
                </Button>
              </Link>
              <Link to={"/home"} className="link">
                <Button variant="contained" sx={{ marginLeft: "30px", minWidth: 200 }}>
                  BACK
                </Button>
              </Link>
            </Box>
            <Box sx={{ marginTop: "10px" }}>
              <Link to={"/day/create"} className="link">
                <Button variant="contained" sx={{ minWidth: 200 }}>
                  Register Day
                </Button>
              </Link>
              <Link to={"/mypage/setting"} className="link">
                <Button variant="contained" sx={{ marginLeft: "30px", minWidth: 200 }}>
                  Setting
                </Button>
              </Link>
              {/* <Link to={"/home"} className="link">
                <Button variant="contained" sx={{ marginLeft: "30px", minWidth: 100 }}>
                  BACK
                </Button>
              </Link> */}
            </Box>
          </Box>
        </Box>
      </Container>
      <hr />
      <Box sx={{ border: `1px solid grey`, margin: "30px 100px" }}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 540, minHeight: 500 }}>
            <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
              <TableHead sx={{ backgrounfColor: "black", color: "white" }}>
                <TableRow>
                  <StyledTableCell>Challenge</StyledTableCell>
                  <StyledTableCell align="center">Date</StyledTableCell>
                  {/* <TableCell align="right">End Date</TableCell> */}
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
                    {/* <TableCell align="right">{challenge.fat}</TableCell> */}
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
    </Box>
  );
};

export default MyPage;
