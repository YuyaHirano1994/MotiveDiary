import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../common/supabase";

const Home = () => {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    const getAllDiary = async () => {
      try {
        const { data, error } = await supabase.from("diary").select("*");
        if (error) {
          throw error;
        }
        console.log(data);
        console.log("Data fetch Success");
        setDiaries(data);
      } catch (error) {
        alert("Database error");
        console.log(error.error_description || error.message);
      }
    };
    getAllDiary();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <Link to={"/mypage"}>My PAGE</Link>
      <ul>
        {diaries.map((diary) => (
          <li className="diary">
            <p>{diary.user_id}</p>
            <p>{diary.date}</p>
            <h1>{diary.title}</h1>
            <h3>{diary.content}</h3>
            <p>{diary.created_at}</p>
            <p>{diary.updated_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
