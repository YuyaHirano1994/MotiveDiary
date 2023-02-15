import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../common/supabase";
import useAuth from "../common/useAuth";

const MyPage = () => {
  const [diaries, setDiaries] = useState([]);
  // const [user, setUser] = useState({});

  const user = useAuth();

  useEffect(() => {
    const getYourAllDiary = async () => {
      try {
        console.log(user.id);
        const { data, error } = await supabase.from("diary").select("*").eq("user_id", user.id);
        if (error) {
          throw error;
        }
        console.log("Data fetch Success");
        setDiaries(data);
      } catch (error) {
        console.log(error.error_description || error.message);
      }
    };
    getYourAllDiary();
  }, [user]);

  return (
    <div>
      <h1>MyPage</h1>

      <Link to={"/diary/create"}>Create</Link>
      <br />
      <Link to={"/"}>BACK</Link>
      <ul>
        {diaries.map((diary) => (
          <li className="diary" key={diary.diary_id}>
            <p>{diary.user_id}</p>
            <p>{diary.date}</p>
            <h1>{diary.title}</h1>
            <h3>{diary.content}</h3>
            <p>{diary.created_at}</p>
            <p>{diary.updated_at}</p>
            <div className="button">
              <Link to={"/diary/" + diary.diary_id}>More detail...</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPage;
