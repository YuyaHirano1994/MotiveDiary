import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import supabase from "../../common/supabase";
import useAuth from "../../common/useAuth";

const CreateDay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuth();

  console.log(id);

  const [formValue, setFormValue] = useState({
    day_id: "",
    challenge_id: "",
    user_id: "",
    date: "",
    content: "",
    created_at: "",
    updated_at: "",
  });

  const [days, setDays] = useState([]);

  const [day, setDay] = useState("");

  // dayデータ取得
  const getDays = async () => {
    try {
      const { data, error } = await supabase
        .from("day")
        .select("*")
        .eq("challenge_id", id, "user_id", user.id)
        .order("date", { ascending: false });

      console.log(data.length); //２件あれば２日目までのデータが実質登録されていることになる
      setDay(data.length);
      setDays(data);
    } catch (error) {}
  };

  //入力された値で登録処理を行う

  // const getChallenge = async () => {
  //   try {
  //     const { data, error } = await supabase.from("challenge").select("*").eq("challenge_id", id, "user_id", user.id);
  //     if (error) {
  //       throw error;
  //     }
  //     console.log("Data fetch Success");
  //     setFormValue({ ...formValue, ...data[0] });
  //   } catch (error) {
  //     alert("Database error");
  //     console.log(error.error_description || error.message);
  //   }
  // };

  useEffect(() => {
    // getChallenge();
    getDays();
  }, []);

  console.log(days);

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
        .from("day")
        .insert([
          {
            challenge_id: id,
            user_id: user.id,
            date: formValue.date,
            content: formValue.content,
          },
        ])
        .eq("challenge_id", formValue.challenge_id);
      if (error) {
        throw error;
      }
      alert("Update your challenge Success");
      setFormValue({ ...formValue, date: "", content: "" });
      getDays();
      navigate(`/day/create/${id}`);
    } catch (error) {
      alert("Failed");
      console.log(error);
    }
  };

  const backHome = () => {
    navigate("/mypage");
  };

  return (
    <div>
      <h1>Add day challenge</h1>
      <h2>You've already done {day} days!!</h2>
      <h3>You can add Day {day + 1} </h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input value={formValue.date} onChange={handleChange} type="date" name="date" required />
        </div>
        <div>
          <label>Content: </label>
          <textarea value={formValue.content} onChange={handleChange} type="text" name="content" required />
        </div>
        <button type="submit">Create</button>
        <hr />
        <ul>
          {days.map((day) => (
            <li className="challenge" key={day.day_id}>
              <p>id: {day.user_id}</p>
              <p>Date: {day.date}</p>
              {/* <p>days: {day}</p> */}
              <h1>content: {day.content}</h1>
            </li>
          ))}
        </ul>
        <hr />
        <button onClick={backHome}>BACK</button>
      </form>
    </div>
  );
};

export default CreateDay;
