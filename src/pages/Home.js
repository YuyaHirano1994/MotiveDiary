import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../common/supabase";

const Home = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const getAllChallenges = async () => {
      try {
        const { data, error } = await supabase.from("challenge").select("*");
        if (error) {
          throw error;
        }
        console.log(data);
        console.log("Data fetch Success");
        setChallenges(data);
      } catch (error) {
        alert("Database error");
        console.log(error.error_description || error.message);
      }
    };
    getAllChallenges();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <Link to={"/mypage"}>My PAGE</Link>
      <ul>
        {challenges.map((challenge) => (
          <Link to={"/challenge/" + challenge.challenge_id}>
            <li className="challenge">
              <p>id: {challenge.user_id}</p>
              <p>days: {challenge.days}</p>
              <h1>title: {challenge.title}</h1>
              <h3>desc: {challenge.desc}</h3>
              <h3>start_date: {challenge.start_date}</h3>
              <h3>end_date: {challenge.end_date}</h3>
              <p>created_at: {challenge.created_at}</p>
              <p>updated_at: {challenge.updated_at}</p>
              <div className="button"></div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Home;
