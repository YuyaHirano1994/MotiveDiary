import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../common/supabase";
import { useRecoilState } from "recoil";
// import { sessionState } from "../../atom/sessionAtom";
import useAuth from "../../common/useAuth";
import { DialogModal } from "../../common/DialogModal";

const SignUp = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    // nickname: "",
    email: "",
    password1: "",
    password2: "",
  });
  const { signUp, error } = useAuth();
  const [modalConfig, setModalConfig] = useState();

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
      // alert("Your passwords do no match");
      const ret = await new Promise((resolve) => {
        setModalConfig({
          onClose: resolve,
          title: "",
          message: "Your passwords do no match",
          type: false,
        });
      });
      setModalConfig(undefined);
    } else {
      const result = await signUp(formValue.email, formValue.password1);
      if (result) {
        const ret = await new Promise((resolve) => {
          setModalConfig({
            onClose: resolve,
            title: "",
            message: "SignUp Success",
            type: false,
          });
        });
        setModalConfig(undefined);
        navigate("/mypage/setting");
      } else {
        const ret = await new Promise((resolve) => {
          setModalConfig({
            onClose: resolve,
            title: "SignUp Failed",
            message: "Please re-try after few minutes",
            type: false,
          });
        });
        setModalConfig(undefined);
      }
    }

    // e.preventDefault();
    // try {
    //   if (formValue.password1 !== formValue.password2) {
    //     alert("Your passwords do no match");
    //   } else {
    //     const { data, error } = await supabase.auth.signUp({
    //       email: formValue.email,
    //       password: formValue.password1,
    //     });

    //     if (error) {
    //       throw error;
    //     }
    //     alert("Create Success");

    //     navigate("/mypage");
    //   }
    // } catch (error) {
    //   alert("Create Failed");
    //   console.log(error);
    // }
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
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 8 }}>
          {/* <TextField
            value={formValue.nickname}
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            id="nickname"
            label="Nickname"
            name="nickname"
            autoComplete="nickname"
            autoFocus
          /> */}
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
          <Button color="secondary" type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          {modalConfig && <DialogModal {...modalConfig} />}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={"/user/signin"} variant="body2">
                {"Already have an account? Log in"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
