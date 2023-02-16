import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import supabase from "../../common/supabase";
import useAuth from "../../common/useAuth";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

const Challenge = () => {
  const { id } = useParams();

  const [challenge, setChallenge] = useState({
    challenge_id: "",
    title: "",
    days: 0,
    desc: "",
    start_date: "",
    end_date: "",
    created_at: "",
    updated_at: "",
  });

  const [days, setDays] = useState([]);

  const navigate = useNavigate();
  const user = useAuth();

  const getChallenge = async () => {
    try {
      const { data, error } = await supabase.from("challenge").select("*").eq("challenge_id", id, "user_id", user.id);
      if (error) {
        throw error;
      }
      console.log("Data fetch Success");
      setChallenge({ ...challenge, ...data[0] });
    } catch (error) {
      alert("Database error");
      console.log(error.error_description || error.message);
    }
  };

  // dayデータ取得
  const getDays = async () => {
    try {
      const { data, error } = await supabase
        .from("day")
        .select("*")
        .eq("challenge_id", id, "user_id", user.id)
        .order("date", { ascending: false });

      console.log(data.length); //２件あれば２日目までのデータが実質登録されていることになる
      setDays(data);
    } catch (error) {}
  };

  useEffect(() => {
    getChallenge();
    getDays();
  }, [user]);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };

  const backHome = () => {
    navigate("/mypage");
  };

  const handleDelete = async () => {
    console.log(challenge.challenge_id);

    try {
      if (window.confirm("削除しますか? Dayデータも同時にすべて削除されます。")) {
        const { data, error } = await supabase.from("challenge").delete().eq("challenge_id", challenge.challenge_id);

        if (error) {
          throw error;
        }

        const { data2, error2 } = await supabase.from("day").delete().eq("challenge_id", challenge.challenge_id);

        if (error || error2) {
          throw error;
        }

        console.log(data);
        console.log(data2);
        console.log("Delete your challenge Success");
        navigate("/mypage");
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={logout}>logout</button>
      <p>id: {challenge.user_id}</p>
      <p>days: {challenge.days}</p>
      <h1>title: {challenge.title}</h1>
      <h3>desc: {challenge.desc}</h3>
      <h3>start_date: {challenge.start_date}</h3>
      <h3>end_date: {challenge.end_date}</h3>
      <p>created_at: {challenge.created_at}</p>
      <p>updated_at: {challenge.updated_at}</p>
      <Link to={"/challenge/update/" + challenge.challenge_id} className="button">
        <BsFillPencilFill />
      </Link>

      <Link onClick={handleDelete} className="button">
        <BsFillTrashFill />
      </Link>

      <Link to={"/day/create/" + challenge.challenge_id} className="button">
        New Day Create
      </Link>
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
    </div>
  );
};

export default Challenge;
