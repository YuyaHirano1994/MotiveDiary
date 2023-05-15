import { Box, Button, Checkbox, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../common/useAuth";
import { DialogModal } from "../../common/DialogModal";

const mainStyles = {
  height: "500px",
  marginTop: 8,
  marginBottom: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const linkStyles = {
  textDecoration: "underline",
  color: "blue",
};

const SignUp = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password1: "",
    password2: "",
  });
  const { signUp } = useAuth();
  const [modalConfig, setModalConfig] = useState();
  const [errorMsg, setErrorMsg] = useState("");

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
    if (formValue.password1 !== formValue.password2) {
      const ret = await new Promise((resolve) => {
        setModalConfig({
          onClose: resolve,
          title: "",
          message: "Password confirmation does not match",
          type: false,
        });
        setErrorMsg("Password confirmation does not match");
      });
      setModalConfig(undefined);
    } else {
      try {
        const data = await signUp(formValue.email, formValue.password1);
        if (data.result) {
          await new Promise((resolve) => {
            setModalConfig({
              onClose: resolve,
              title: "",
              message: "SignUp Success",
              type: false,
            });
          });
          setModalConfig(undefined);
          navigate("/mypage");
        } else {
          await new Promise((resolve) => {
            setModalConfig({
              onClose: resolve,
              title: "SignUp Failed",
              message: data.msg,
              type: false,
            });
          });
          setModalConfig(undefined);
        }
        setErrorMsg(data?.msg);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={mainStyles}>
        <Typography variant="h3" align="center">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {errorMsg && (
            <Typography variant="subtitle1" align="center" color="error">
              {errorMsg}
            </Typography>
          )}
          <TextField
            value={formValue.email}
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={formValue.password1}
            onChange={handleChangePassword}
            margin="normal"
            required
            fullWidth
            name="password1"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            value={formValue.password2}
            onChange={handleChangePassword}
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Confirm Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          By creating an account, you agree to our{" "}
          <Link to={"/term"} target="_blank" style={linkStyles}>
            Terms
          </Link>{" "}
          and have read and acknowledge{" "}
          <Link to={"/policy"} target="_blank" style={linkStyles}>
            the Privacy Policy
          </Link>
          .
          <Button color="secondary" type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          {modalConfig && <DialogModal {...modalConfig} />}
          <Grid container>
            <Grid item xs>
              <Link to={"/changepassword"} variant="body2">
                Forgot password?
                <br />
                here.
              </Link>
            </Grid>
            <Grid item>
              <Link to={"/user/signin"} variant="body2">
                Already have an account?
                <br />
                here.
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
