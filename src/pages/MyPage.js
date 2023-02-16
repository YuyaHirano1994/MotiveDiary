import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../common/supabase";
import useAuth from "../common/useAuth";

const MyPage = () => {
  const [challenges, setChallenges] = useState([]);
  // const [user, setUser] = useState({});

  const user = useAuth();

  useEffect(() => {
    const getYourChallenges = async () => {
      try {
        console.log(user.id);
        const { data, error } = await supabase.from("challenge").select("*").eq("user_id", user.id);
        if (error) {
          throw error;
        }
        console.log("Data fetch Success");
        setChallenges(data);
      } catch (error) {
        console.log(error.error_description || error.message);
      }
    };
    getYourChallenges();
  }, [user]);

  return (
    <div>
      <h1>MyPage</h1>

      <Link to={"/challenge/create"}>Create</Link>
      <br />
      <Link to={"/"}>BACK</Link>
      <ul>
        {challenges.map((challenge) => (
          <li className="challenge" key={challenge.challenge_id}>
            <p>id: {challenge.user_id}</p>
            <p>days: {challenge.days}</p>
            <h1>title: {challenge.title}</h1>
            <h3>desc: {challenge.desc}</h3>
            <h3>start_date: {challenge.start_date}</h3>
            <h3>end_date: {challenge.end_date}</h3>
            <p>created_at: {challenge.created_at}</p>
            <p>updated_at: {challenge.updated_at}</p>
            <div className="button">
              <Link to={"/challenge/" + challenge.challenge_id}>More detail...</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPage;
