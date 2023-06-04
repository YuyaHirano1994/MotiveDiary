import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../common/supabase";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useRecoilValue } from "recoil";
import { sessionState } from "../../atom/sessionAtom";

const challengeMainStyles = {
  marginTop: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const CreateChallenge = () => {
  const dt = new Date();
  var y = dt.getFullYear();
  var m = ("00" + (dt.getMonth() + 1)).slice(-2);
  var d = ("00" + dt.getDate()).slice(-2);
  var today = `${y}-${m}-${d}`;

  const [formValue, setFormValue] = useState({
    challenge_id: "",
    title: "",
    category: "HTML",
    days: 1,
    desc: "",
    start_date: today,
    end_date: "",
    created_at: "",
    updated_at: "",
  });
  const navigate = useNavigate();
  const session = useRecoilValue(sessionState);
  const [showCategory, setShowCategory] = useState("HTML");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "title" && e.target.value.length > 25) {
      return; // 文字数制限を超えた場合は処理を終了する
    }
    if (e.target.name === "days" && (e.target.value > 100 || e.target.value < 0)) {
      return; // 文字数制限を超えた場合は処理を終了する
    }
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    setShowCategory(e.target.value);
    if (e.target.value !== "other") {
      setFormValue({ ...formValue, category: e.target.value });
    } else {
      setFormValue({ ...formValue, category: "other" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.from("challenge").insert([
        {
          user_id: session.id,
          title: formValue.title,
          category: formValue.category,
          days: formValue.days,
          desc: formValue.desc,
          start_date: formValue.start_date,
        },
      ]);
      if (error) throw error;
      setIsLoading(false);
      navigate("/mypage");
    } catch (error) {
      setIsLoading(false);
      alert("Failed");
      console.log(error);
    }
  };

  const categories = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "NodeJS", "PHP", "Java", "Other"];

  return (
    <>
      <Container>
        <Box sx={challengeMainStyles}>
          <Typography variant="h3" align="center">
            Let's Start Your New Challenge!
          </Typography>
          <Box sx={{ margin: "0 auto" }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                <FormControl sx={{ m: 1, maxWidth: "50%" }}>
                  <InputLabel id="category">category</InputLabel>
                  <Select
                    labelId="category"
                    id="category"
                    name="category"
                    value={showCategory}
                    onChange={handleCategoryChange}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <TextField
                value={formValue.days}
                onChange={handleChange}
                margin="normal"
                required
                name="days"
                label="How long will it take to achieve the goal?"
                type="number"
                id="days"
                fullWidth
                autoComplete="days"
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
                margin="normal"
                inputProps={{ maxLength: 500 }}
              />
              <TextField
                value={formValue.start_date}
                onChange={handleChange}
                margin="normal"
                required
                name="start_date"
                label="Start Date"
                type="date"
                id="start_date"
                autoComplete="start_date"
                variant="standard"
              />
              <Button type="submit" fullWidth variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
                Add new Challenge
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CreateChallenge;
