import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../common/supabase";

const SignUp = () => {
  const [formValue, setFormValue] = useState({
    // nickname: "",
    email: "",
    password1: "",
    password2: "",
  });

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
    try {
      if (formValue.password1 !== formValue.password2) {
        alert("Your passwords do no match");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: formValue.email,
          password: formValue.password1,
        });

        if (error) {
          throw error;
        }
        console.log(data);
        alert("Create Success");
      }
    } catch (error) {
      alert("Create Failed");
      console.log(error);
    }
  };

  console.log(formValue);

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
        <Typography variant="h3" align="center">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
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
