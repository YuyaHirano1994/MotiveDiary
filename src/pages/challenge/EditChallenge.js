import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../common/supabase";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import BackButton from "../../components/BackButton";
import { useRecoilValue } from "recoil";
import { sessionState } from "../../atom/sessionAtom";
import { DialogModal } from "../../common/DialogModal";

const challengeMainStyles = {
  marginTop: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const EditChallenge = () => {
  const { id } = useParams();
  const session = useRecoilValue(sessionState);
  const [showCategory, setShowCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalConfig, setModalConfig] = useState();
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
    console.log(e.target.value);
    if (e.target.value !== "other") {
      setFormValue({ ...formValue, category: e.target.value });
    } else {
      setFormValue({ ...formValue, category: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      const ret = await new Promise((resolve) => {
        setModalConfig({
          onClose: resolve,
          title: "Success",
          message: "Your Diary info has changed",
          type: false,
        });
      });
      setModalConfig(undefined);
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
        {modalConfig && <DialogModal {...modalConfig} />}
        <Box sx={challengeMainStyles}>
          <Typography variant="h3" align="center">
            Edit your Challenge
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
                  </Select>
                </FormControl>
              </Box>
              <TextField
                value={formValue.days}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="days"
                label="How long would you need?(Max: 100days)"
                type="number"
                id="days"
                autoComplete="days"
                variant="standard"
                disabled={formValue.end_date}
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
                color="primary"
                margin="normal"
                inputProps={{ maxLength: 500, style: { fontSize: 14 } }}
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
                variant="standard"
                disabled={formValue.end_date}
              />
              <Button type="submit" fullWidth variant="contained" disabled={isLoading} sx={{ mt: 3, mb: 2 }}>
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
