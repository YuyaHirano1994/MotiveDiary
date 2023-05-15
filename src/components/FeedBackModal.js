import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

const FeedbackModal = ({ formValue, handleChange, handleSubmit, closeModal, from }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        Feedback Form
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          label="Title"
          value={formValue.title}
          name="title"
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={formValue.email}
          name="email"
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="email"
        />
        <TextField
          label="Feedback"
          value={formValue.feedback}
          name="feedback"
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button variant="contained" onClick={closeModal} style={{ marginLeft: "8px" }}>
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default FeedbackModal;
