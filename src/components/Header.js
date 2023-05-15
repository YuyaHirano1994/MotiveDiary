import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserIcon from "./UserIcon";
import useAuth from "../common/useAuth";

/* supabase */
import supabase from "../common/supabase";

/* Recoil */
import { useRecoilValue } from "recoil";
import { sessionState } from "../atom/sessionAtom";
import { profileState } from "../atom/profileAtom";

/*Material UI */
import { Logout, Settings } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ChatIcon from "@mui/icons-material/Chat";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Modal,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { Container } from "@mui/system";
import FeedbackModal from "./FeedBackModal";

const headerStyles = { display: "flex", alignItems: "center", textAlign: "center", flexGrow: 1 };

const Header = () => {
  const titleTheme = createTheme({
    typography: {
      fontFamily: ["Play", "sans-serif"].join(","),
    },
  });
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const session = useRecoilValue(sessionState);
  const profile = useRecoilValue(profileState);
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = false;
  const [formValue, setFormValue] = useState({
    title: "",
    email: "",
    feedback: "",
  });

  useEffect(() => {}, [session, profile]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("feedback").insert([
        {
          title: formValue.title,
          email: formValue.email,
          feedback: formValue.feedback,
        },
      ]);
      if (error) throw error;
      setFormValue({ title: "", email: "", feedback: "" });
      closeModal();
    } catch (error) {
      alert("Failed, please email us (yuyahirano.dev@gmail.com)");
      console.log(error);
    }
  };

  const hadleClickSignOut = async () => {
    const { error } = signOut();
    navigate("/user/signin");
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box display="flex" justifyContent="space-between" width="100%">
              <Box display="flex" sx={{ pt: 1 }}>
                <Link to={"/home"}>
                  <BsFillJournalBookmarkFill size={32} />
                </Link>
                <ThemeProvider theme={titleTheme}>
                  <Typography variant="h6">Motive Diary</Typography>
                  <Typography variant="subtitle1" sx={{ ml: 1 }}>
                    β ver.
                  </Typography>
                </ThemeProvider>
              </Box>
              <Box>
                {session ? (
                  <>
                    <Box sx={headerStyles}>
                      <Box display={{ xs: "none", sm: "block" }}>
                        <Button color="secondary" variant="contained" size="small">
                          <Link to={"/day/create/none"}>Register Day</Link>
                        </Button>
                      </Box>
                      <Tooltip title="Profile">
                        <IconButton
                          onClick={handleClick}
                          size="small"
                          sx={{ ml: 2 }}
                          aria-controls={open ? "account-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                        >
                          <UserIcon width={48} height={48} />
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
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <MenuBookIcon fontSize="small" />
                        </ListItemIcon>
                        <Link to={"/day/create/none"}>Register</Link>
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
                        <Box onClick={hadleClickSignOut}>Sign out</Box>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <ChatIcon fontSize="small" />
                        </ListItemIcon>
                        <Box onClick={openModal}>FeedBack</Box>
                      </MenuItem>
                    </Menu>
                    <Modal open={modalOpen} onClose={closeModal}>
                      <FeedbackModal
                        modalOpen={modalOpen}
                        closeModal={closeModal}
                        formValue={formValue}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        from={true}
                      />
                    </Modal>
                  </>
                ) : (
                  <>
                    <Box sx={{ headerStyles }}>
                      <Link to={"user/signin"}>
                        <Button variant="contained" color="secondary">
                          Sign in
                        </Button>
                      </Link>
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
