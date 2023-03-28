import { Logout, Settings } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../common/supabase";
import { useRecoilState } from "recoil";
import { sessionState } from "../atom/sessionAtom";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { Container } from "@mui/system";
import UserIcon from "./UserIcon";

const Header = () => {
  const navigate = useNavigate();
  const [session, setSession] = useRecoilState(sessionState);
  const user = session?.session?.user || null;
  const [anchorEl, setAnchorEl] = useState(null);
  const [profile, setProfile] = useState({});

  const getProfile = async () => {
    console.log("Header getProfile is reading");
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

  useEffect(() => {
    getProfile();
  }, [session]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
    setProfile({});
    setSession({});
    navigate("/user/signin");
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box component="div" display={"flex"} justifyContent={"space-between"} width="100%">
              <Box component="div" display={"flex"} sx={{ width: "auto", pt: 2 }}>
                <Link to={"/home"}>
                  <BsFillJournalBookmarkFill size={32} />
                </Link>
                <Box component="div" display={"flex"}>
                  <Typography sx={{ ml: 4 }}>
                    <Link to={"/home"}>About</Link>
                  </Typography>
                  <Typography sx={{ ml: 4 }}>
                    <Link to={"/home"}>How it Works?</Link>
                  </Typography>
                </Box>
              </Box>
              <Box component="div">
                {user?.id ? (
                  <>
                    <Box sx={{ display: "flex", alignItems: "center", textAlign: "center", flexGrow: 1 }}>
                      <Button variant="contained" size="small">
                        <Link to={"/day/create/none"}>Register Day</Link>
                      </Button>
                      <Tooltip title="Profile">
                        <IconButton
                          onClick={handleClick}
                          size="small"
                          sx={{ ml: 2 }}
                          aria-controls={open ? "account-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                        >
                          <UserIcon userID={user.id} width={48} height={48} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <PersonIcon fontSize="small" />
                        </ListItemIcon>
                        <Link to={"/mypage"}>MyPage</Link>
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <Settings fontSize="small" />
                        </ListItemIcon>
                        <Link to={"/mypage/setting"}>Settings</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        <Box onClick={signOut}>Sign out</Box>
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <Box sx={{ display: "flex", alignItems: "center", textAlign: "center", flexGrow: 1 }}>
                      <Button variant="contained" color="secondary">
                        <Link to={"user/signin"}>Sign In</Link>
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
