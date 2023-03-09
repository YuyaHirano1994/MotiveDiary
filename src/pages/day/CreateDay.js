import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import supabase from "../../common/supabase";
import { useRecoilState } from "recoil";
import { sessionState } from "../../atom/sessionAtom";

const CreateDay = () => {
  const dt = new Date();
  var y = dt.getFullYear();
  var m = ("00" + (dt.getMonth() + 1)).slice(-2);
  var d = ("00" + dt.getDate()).slice(-2);
  var today = `${y}-${m}-${d}`;
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useRecoilState(sessionState);
  const user = session.session?.user || null;

  const [formValue, setFormValue] = useState({
    day_id: "",
    challenge_id: "",
    user_id: "",
    date: today,
    day: 0,
    content: "",
    created_at: "",
    updated_at: "",
  });

  const [challenge, setChallenge] = useState([]);

  const [days, setDays] = useState([]);

  const [maxDay, setMaxDay] = useState("");

  // dayデータ取得
  const getDays = async () => {
    try {
      const { data, error } = await supabase
        .from("day")
        .select("*")
        .eq("challenge_id", id, "user_id", user.id)
        .order("date", { ascending: false });

      // console.log(data.length); //２件あれば２日目までのデータが実質登録されていることになる
      setMaxDay(data.length);
      setDays(data);
    } catch (error) {}
  };

  //入力された値で登録処理を行う

  const getChallenge = async () => {
    try {
      const { data, error } = await supabase.from("challenge").select("*").eq("challenge_id", id, "user_id", user.id);
      if (error) {
        throw error;
      }
      console.log("Data fetch Success");
      setChallenge(data[0]);
    } catch (error) {
      alert("Database error");
      console.log(error.error_description || error.message);
    }
  };

  useEffect(() => {
    getChallenge();
    getDays();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const checkInputData = () => {
    if (days.filter((day) => day.date === formValue.date)) {
      alert("同じ日付のデータは登録できません");
      return false;
    }
    if (days[0]?.date >= formValue.date) {
      alert("日付は最新データより未来にしてください");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkInputData()) return; // 登録データのチェックを実施
    const now = new Date();

    try {
      const { error } = await supabase
        .from("day")
        .insert([
          {
            challenge_id: id,
            user_id: user.id,
            date: formValue.date,
            day: maxDay + 1,
            content: formValue.content,
          },
        ])
        .eq("challenge_id", formValue.challenge_id);
      if (error) {
        throw error;
      }
      alert("Create your challenge Success");
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
      <h2>You've already done {maxDay} days!!</h2>
      <h3>You can add Day {maxDay + 1} </h3>
      <div>
        <p>{challenge.title}</p>
        <p>{challenge.desc}</p>
      </div>
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
              <p>Date: {day.date}</p>
              {/* <p>days: {day}</p> */}
              <h5>content: {day.content}</h5>
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
