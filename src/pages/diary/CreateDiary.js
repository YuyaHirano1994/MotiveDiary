import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../common/supabase";
import useAuth from "../../common/useAuth";

const CreateDiary = () => {
  const [formValue, setFormValue] = useState({
    title: "",
    date: "",
    content: "",
  });

  const navigate = useNavigate();
  const user = useAuth();

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
      const { error } = await supabase.from("diary").insert([
        {
          user_id: user.id,
          title: formValue.title,
          date: formValue.date,
          content: formValue.content,
        },
      ]);
      if (error) {
        throw error;
      }
      alert("new diary Success");
      navigate("/mypage");
    } catch (error) {
      alert("Failed");
      console.log(error);
    }
  };

  console.log(formValue);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };

  const backHome = () => {
    navigate("/");
  };

  return (
    <div>
      <button onClick={logout}>logout</button>
      <h1>Write new diary</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>TITLE:</label>
          <input value={formValue.title} onChange={handleChange} type="text" name="title" required />
        </div>
        <div>
          <label>DATE: </label>
          <input value={formValue.date} onChange={handleChange} type="date" name="date" required />
        </div>
        <div>
          <label>How was this day? </label>
          <textarea value={formValue.content} onChange={handleChange} ype="text" name="content" required />
        </div>

        <button type="submit">create</button>

        <button onClick={backHome}>Home</button>
      </form>
    </div>
  );
};

export default CreateDiary;
