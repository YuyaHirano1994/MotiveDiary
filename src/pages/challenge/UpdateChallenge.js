import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../common/supabase";
import useAuth from "../../common/useAuth";

const UpdateChallenge = () => {
  const { id } = useParams();

  const [formValue, setFormValue] = useState({
    challenge_id: "",
    title: "",
    days: 0,
    desc: "",
    start_date: "",
    end_date: "",
    created_at: "",
    updated_at: "",
  });

  const navigate = useNavigate();
  const user = useAuth();

  const getChallenge = async () => {
    try {
      const { data, error } = await supabase.from("challenge").select("*").eq("challenge_id", id, "user_id", user.id);
      if (error) {
        throw error;
      }
      console.log("Data fetch Success");
      setFormValue({ ...formValue, ...data[0] });
    } catch (error) {
      alert("Database error");
      console.log(error.error_description || error.message);
    }
  };

  useEffect(() => {
    getChallenge();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    try {
      console.log("user: " + user.id);
      const { error } = await supabase
        .from("challenge")
        .update([
          {
            title: formValue.title,
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

  return (
    <div>
      <button onClick={logout}>logout</button>
      <h1>Edit your challenge</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>TITLE:</label>
          <input value={formValue.title} onChange={handleChange} type="text" name="title" required />
        </div>
        <div>
          <label>DATE: </label>
          <input value={formValue.days} onChange={handleChange} type="number" name="days" required />
        </div>
        <div>
          <label>How was this day? </label>
          <textarea value={formValue.desc} onChange={handleChange} ype="text" name="desc" required />
        </div>
        <button type="submit">Edit</button>
        <button onClick={backHome}>BACK</button>
      </form>
    </div>
  );
};

export default UpdateChallenge;
