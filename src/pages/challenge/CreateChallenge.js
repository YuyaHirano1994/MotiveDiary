import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../common/supabase";
import SessionLoader from "../../common/SessionLoader";
import { sessionState } from "../../atom/sessionAtom";
import { useRecoilState } from "recoil";
import { InputLabel, MenuItem, Select } from "@mui/material";
import Challenge from "./Challenge";

const CreateChallenge = () => {
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
  const [session, setSession] = useRecoilState(sessionState);
  const user = session.session?.user || null;

  const handleChange = (e) => {
    e.preventDefault();
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("user: " + user.id);
      const { error } = await supabase.from("challenge").insert([
        {
          user_id: user.id,
          title: formValue.title,
          category: formValue.category,
          days: formValue.days,
          desc: formValue.desc,
          start_date: formValue.start_date,
        },
      ]);
      if (error) {
        throw error;
      }
      alert("new challenge Success");
      navigate("/mypage");
    } catch (error) {
      alert("Failed");
      console.log(error);
    }
  };

  const backHome = () => {
    navigate("/home");
  };

  return (
    <div>
      <h1>Create your new Challenge!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>What is your Challenge?</label>
          <input value={formValue.title} onChange={handleChange} type="text" name="title" required />
        </div>
        <InputLabel id="category-label">category</InputLabel>
        <Select
          labelId="category-label"
          id="demo-simple-select"
          name="category"
          value={formValue.category}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"React"}>React</MenuItem>
          <MenuItem value={"Node"}>NodeJS</MenuItem>
          <MenuItem value={"English"}>English</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
        <div>
          <label>How long would you need? </label>
          <input value={formValue.date} onChange={handleChange} type="number" name="days" required />
        </div>
        <div>
          <label>Description here: </label>
          <textarea value={formValue.desc} onChange={handleChange} ype="text" name="desc" required />
        </div>{" "}
        <div>
          <label>Start Date: </label>
          <input value={formValue.start_date} onChange={handleChange} type="date" name="start_date" required />
        </div>
        <button type="submit">create</button>
        <button onClick={backHome}>Home</button>
      </form>
    </div>
  );
};

export default CreateChallenge;
