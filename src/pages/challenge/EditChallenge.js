import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../common/supabase";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import BackButton from "../../components/BackButton";
import useAuth from "../../common/useAuth";
import { useRecoilValue } from "recoil";
import { sessionState } from "../../atom/sessionAtom";

const EditChallenge = () => {
  const { id } = useParams();
  const session = useRecoilValue(sessionState);
  const [showCategory, setShowCategory] = useState("");
  const [hiddenEl, setHiddenEl] = useState(true);

  const [formValue, setFormValue] = useState({
    challenge_id: "",
    title: "",
    category: "",
    days: 0,
    desc: "",
    start_date: "",
    end_date: "",
    created_at: "",
    updated_at: "",
  });

  const navigate = useNavigate();

  const getChallenge = async () => {
    try {
      const { data, error } = await supabase
        .from("challenge")
        .select("*")
        .eq("challenge_id", id, "user_id", session.id);
      if (error) {
        throw error;
      }
      setFormValue({ ...formValue, ...data[0] });
    } catch (error) {
      console.log(error.error_description || error.message);
    }
  };

  useEffect(() => {
    getChallenge();
    setShowCategory(formValue.category);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    setShowCategory(e.target.value);
    console.log(e.target.value);
    if (e.target.value !== "other") {
      setFormValue({ ...formValue, category: e.target.value });
      setHiddenEl(true);
    } else {
      setFormValue({ ...formValue, category: "" });
      setHiddenEl(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    try {
      const { error } = await supabase
        .from("challenge")
        .update([
          {
            title: formValue.title,
            category: formValue.category,
            days: formValue.days,
            desc: formValue.desc,
            updated_at: now,
          },
        ])
        .eq("challenge_id", formValue.challenge_id);
      if (error) {
        throw error;
      }
      alert("Update your challenge Success");
      navigate("/mypage");
    } catch (error) {
      alert("Failed");
      console.log(error);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };

  const backHome = () => {
    navigate("/mypage");
  };

  const categories = ["HTML", "CSS", "JavaScript", "TypeScript", "PHP"];

  return (
    <>
      <Container>
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" align="center">
            Edit your Challenge
          </Typography>
          <Box sx={{ margin: "0 auto" }}>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                value={formValue.title}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="title"
                label="Title"
                type="text"
                id="title"
                autoComplete="title"
                autoFocus
                variant="standard"
              />
              <Box display="flex">
                <FormControl sx={{ m: 1, width: "50%" }}>
                  <InputLabel id="category">category</InputLabel>
                  <Select
                    labelId="category"
                    id="category"
                    name="category"
                    value={showCategory || formValue.category}
                    onChange={handleCategoryChange}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                    <MenuItem value={"other"}>Other</MenuItem>
                  </Select>
                </FormControl>
                {/* {hiddenEl ? (
                  <></>
                ) : (
                  <TextField
                    value={formValue.category}
                    onChange={handleChange}
                    margin="normal"
                    required
                    fullWidth
                    name="category"
                    label="category"
                    type="text"
                    id="category"
                    autoComplete="category"
                    autoFocus
                    variant="standard"
                    disabled={hiddenEl}
                    sx={{ width: "50%" }}
                  />
                )} */}
              </Box>
              <TextField
                value={formValue.days}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="days"
                label="How long would you need? "
                type="number"
                id="days"
                autoComplete="days"
                autoFocus
                variant="standard"
              />
              <TextField
                value={formValue.desc}
                onChange={handleChange}
                multiline
                rows={6}
                required
                fullWidth
                id="desc"
                name="desc"
                label="Description"
                color="secondary"
                margin="normal"
                inputProps={{ maxLength: 1000, style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
              />
              <TextField
                value={formValue.start_date}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="start_date"
                label="Start Date"
                type="date"
                id="start_date"
                autoComplete="start_date"
                autoFocus
                variant="standard"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Edit Challenge
              </Button>
              <BackButton />
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default EditChallenge;
