import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
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

const ChangePassword = () => {
  const { resetPass } = useAuth();
  const [formValue, setFormValue] = useState({
    email: "",
  });
  const [modalConfig, setModalConfig] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await resetPass(formValue.email);
    if (result) {
      await new Promise((resolve) => {
        setModalConfig({
          onClose: resolve,
          title: "",
          message: "Please check your Email",
          type: false,
        });
      });
      setModalConfig(undefined);
      // navigate("/home");
    } else {
      await new Promise((resolve) => {
        setModalConfig({
          onClose: resolve,
          title: "Reset Failed",
          message: "Something error, Please contact dev team",
          type: false,
        });
      });
      setModalConfig(undefined);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={mainStyles}>
        <Typography variant="h3" align="center">
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 8 }}>
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
          <Button color="secondary" type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Request Password Reset
          </Button>
          {modalConfig && <DialogModal {...modalConfig} />}
          <Grid container>
            <Grid item xs>
              <Link to={"/user/signup"} variant="body2">
                I don't have an account.
              </Link>
            </Grid>
            <Grid item>
              <Link to={"/user/signin"} variant="body2">
                Already have an account
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default ChangePassword;
