import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../../common/supabase";
import useAuth from "../../common/useAuth";

const Setting = () => {
  const navigate = useNavigate();
  const user = useAuth();

  const [formValue, setFormValue] = useState({
    nickname: "",
    avatar_url: "",
    comment: "",
  });

  const getProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profile")
        // .select("nickname", "avatar_url", "comment")
        .select("*");
      // .eq("user_id", user.id);
      setFormValue({ ...formValue, ...data[0] });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [user]);

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
        .from("profile")
        .update([
          {
            nickname: formValue.nickname,
            avatar_url: formValue.avatar_url,
            updated_at: now,
          },
        ])
        .eq("user_id", user.id);
      if (error) {
        throw error;
      }
      alert("Update your profile Success");
      navigate(`/mypage`);
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
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nickname:</label>
          <input value={formValue.nickname} onChange={handleChange} type="text" name="nickname" required />
        </div>
        <div>
          <label>Avatar: </label>
          <textarea value={formValue.avatar_url} onChange={handleChange} type="text" name="avatar_url" required />
        </div>
        <button type="submit">Update</button>
        <hr />
        <button onClick={backHome}>BACK</button>
      </form>
    </div>
  );
};

export default Setting;
