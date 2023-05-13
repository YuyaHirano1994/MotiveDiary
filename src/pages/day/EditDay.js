import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../common/supabase";
import { Box, Button, Container, TextareaAutosize, TextField, Typography } from "@mui/material";
import BackButton from "../../components/BackButton";
import { sessionState } from "../../atom/sessionAtom";
import { useRecoilValue } from "recoil";

const dayMainStyles = {
  mt: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const EditDay = () => {
  const { id, day_id } = useParams();
  const navigate = useNavigate();
  const session = useRecoilValue(sessionState);
  const [isLoading, setIsLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    day_id: "",
    challenge_id: "",
    user_id: "",
    date: "",
    content: "",
    created_at: "",
    updated_at: "",
  });

  const getDay = async () => {
    try {
      const { data, error } = await supabase
        .from("day")
        .select("*")
        .eq("day_id", day_id)
        .eq("challenge_id", id)
        .eq("user_id", session.id);

      if (error) throw error;

      if (data.length > 0) {
        setFormValue((formValue) => ({ ...formValue, ...data[0] }));
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDay();
  }, [session]);

  const handleChange = (e) => {
    e.preventDefault();
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const now = new Date();
    try {
      const { error } = await supabase
        .from("day")
        .update([
          {
            date: formValue.date,
            content: formValue.content,
            updated_at: now,
          },
        ])
        .eq("day_id", formValue.day_id)
        .eq("challenge_id", formValue.challenge_id)
        .eq("user_id", session.id);

      if (error) throw error;
      alert("Update your day Success");
      setFormValue({ ...formValue, date: "", content: "" });
      getDay();
      setIsLoading(false);

      navigate(`/challenge/${id}`);
    } catch (error) {
      alert("Failed");
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="md">
        <Box sx={dayMainStyles}>
          <Typography variant="h3" align="center">
            Edit Day
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              value={formValue.date}
              onChange={handleChange}
              margin="normal"
              required
              disabled
              name="date"
              label="Date"
              type="date"
              id="date"
              variant="standard"
            />
            <TextareaAutosize
              style={{ width: "90%" }}
              minRows={10}
              value={formValue.content}
              onChange={handleChange}
              placeholder="What did you do today?"
              id="content"
              name="content"
              required
            ></TextareaAutosize>
            <Button type="submit" fullWidth variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
              Update
            </Button>
            <BackButton />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default EditDay;
