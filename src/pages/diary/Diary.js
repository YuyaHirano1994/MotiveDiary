import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import supabase from "../../common/supabase";
import useAuth from "../../common/useAuth";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

const Diary = () => {
  const { id } = useParams();

  const [formValue, setFormValue] = useState({
    diary_id: "",
    title: "",
    date: "",
    content: "",
    created_at: "",
    updated_at: "",
  });

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
  }, [user]);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };

  const backHome = () => {
    navigate("/mypage");
  };

  const handleDelete = async () => {
    console.log(formValue.diary_id);
    try {
      const { data, error } = await supabase.from("diary").delete().eq("diary_id", formValue.diary_id);

      if (error) {
        throw error;
      }
      console.log(data);
      console.log("Delete your diary Success");
      navigate("/mypage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={logout}>logout</button>
      <h1>Edit your diary</h1>
      <div>
        <h1>TITLE: {formValue.title}</h1>
      </div>
      <div>
        <h3>Date: {formValue.date}</h3>
      </div>
      <div>
        <p>{formValue.content}</p>
      </div>
      <Link to={"/diary/update/" + formValue.diary_id} className="button">
        <BsFillPencilFill />
      </Link>

      <Link onClick={handleDelete} className="button">
        <BsFillTrashFill />
      </Link>

      <button onClick={backHome}>BACK</button>
    </div>
  );
};

export default Diary;
