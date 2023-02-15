import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../common/supabase";

const SignIn = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formValue.email,
        password: formValue.password,
      });
      if (error) {
        throw error;
      }
      console.log(data);
      alert("Login Success");
      navigate("/");
    } catch (error) {
      alert("Password is not correct");
      console.log(error.error_description || error.message);
    }
  };

  console.log(formValue);

  return (
    <div>
      <h1>SignIn</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>email: </label>
          <input value={formValue.email} onChange={handleChange} type="text" name="email" required />
        </div>
        <div>
          <label>password: </label>
          <input value={formValue.password1} onChange={handleChange} type="password" name="password" required />
        </div>
        <button type="submit">Sing In</button>
        <div>
          <Link to={"/"}>Mypage</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
