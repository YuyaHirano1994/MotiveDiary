import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../common/supabase";
import useAuth from "../../common/useAuth";

const UpdateDiary = () => {
  const { id } = useParams();

  const [formValue, setFormValue] = useState({
    diary_id: "",
    title: "",
    date: "",
    content: "",
    created_at: "",
    updated_at: "",
  });

  console.log(formValue);

  const navigate = useNavigate();
  const user = useAuth();

  const getDiary = async () => {
    try {
      const { data, error } = await supabase.from("diary").select("*").eq("diary_id", id, "user_id", user.id);
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
    getDiary();
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
        .from("diary")
        .update([
          {
            title: formValue.title,
            date: formValue.date,
            content: formValue.content,
            updated_at: now,
          },
        ])
        .eq("diary_id", formValue.diary_id);
      if (error) {
        throw error;
      }
      alert("Update your diary Success");
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
      <h1>Edit your diary</h1>
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
        <button type="submit">Edit</button>
        <button onClick={backHome}>BACK</button>
      </form>
    </div>
  );
};

export default UpdateDiary;
