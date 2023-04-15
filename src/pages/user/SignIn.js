import { Avatar, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../common/supabase";
import useAuth from "../../common/useAuth";
import { DialogModal } from "../../common/DialogModal";

const SignIn = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [isPassError, setIsPassError] = useState(false);
  const { signIn, error } = useAuth();
  const [modalConfig, setModalConfig] = useState();
  // const [session, setSession] = useRecoilState(sessionState);

  const navigate = useNavigate();

  const regex = new RegExp(/^[0-9a-zA-Z]*$/);

  const handleChange = (e) => {
    e.preventDefault();
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (regex.test(e.target.value)) {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn(formValue.email, formValue.password);
    if (result) {
      const ret = await new Promise((resolve) => {
        setModalConfig({
          onClose: resolve,
          title: "",
          message: "Login Success",
          type: false,
        });
      });
      setModalConfig(undefined);
      navigate("/mypage");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link to={"/home"}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountCircleIcon />
          </Avatar>
        </Link>

        <Typography variant="h3" align="center">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {modalConfig && <DialogModal {...modalConfig} />}
          <TextField
            value={formValue.email}
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            type="text"
            id="email"
            error={isPassError}
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={formValue.password}
            onChange={handleChangePassword}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={isPassError}
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={"/user/signup"} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
