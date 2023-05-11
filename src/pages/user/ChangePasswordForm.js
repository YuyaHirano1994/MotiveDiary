import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../common/useAuth";
import { DialogModal } from "../../common/DialogModal";

const ChangePasswordForm = () => {
  const { sendResetPass } = useAuth();
  const [formValue, setFormValue] = useState({
    password: "",
    cPassword: "",
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
    const result = await sendResetPass(formValue.password);
    if (result) {
      const ret = await new Promise((resolve) => {
        setModalConfig({
          onClose: resolve,
          title: "",
          message: "Password has changed",
          type: false,
        });
      });
      setModalConfig(undefined);
      // navigate("/home");
    } else {
      const ret = await new Promise((resolve) => {
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
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 8 }}>
          <TextField
            value={formValue.email}
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            id="password"
            label="New Password"
            name="password"
            autoComplete="password"
            autoFocus
          />
          <TextField
            value={formValue.email}
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            id="cPassword"
            label="Confirm Password"
            name="cPassword"
            autoComplete="cPassword"
            autoFocus
          />
          <Button color="secondary" type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Reset Password
          </Button>
          {modalConfig && <DialogModal {...modalConfig} />}
        </Box>
      </Box>
    </Container>
  );
};

export default ChangePasswordForm;
