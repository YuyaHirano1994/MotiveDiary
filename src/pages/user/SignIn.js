import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../common/useAuth";
import { DialogModal } from "../../common/DialogModal";

const SignIn = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [isPassError, setIsPassError] = useState(false);
  const { signIn } = useAuth();
  const [modalConfig, setModalConfig] = useState();
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
    } else {
      const ret = await new Promise((resolve) => {
        setModalConfig({
          onClose: resolve,
          title: "Login Failed",
          message: "Please re-try",
          type: false,
        });
      });
      setModalConfig(undefined);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          height: "500px",
          marginTop: 8,
          marginBottom: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" align="center">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 8 }}>
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
          <Button color="secondary" type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
