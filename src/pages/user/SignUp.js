import React, { useState } from "react";
import supabase from "../../common/supabase";

const SignUp = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password1: "",
    password2: "",
  });

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
      if (formValue.password1 !== formValue.password2) {
        alert("Please check your password");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: formValue.email,
          password: formValue.password1,
        });
        if (error) {
          throw error;
        }
        console.log(data);
        alert("Create Success");
      }
    } catch (error) {
      alert("Create Failed");
      console.log(error);
    }
  };

  console.log(formValue);

  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>email: </label>
          <input value={formValue.email} onChange={handleChange} type="text" name="email" required />
        </div>
        <div>
          <label>password: </label>
          <input value={formValue.password1} onChange={handleChange} ype="text" name="password1" required />
        </div>
        <div>
          <label>confirm password: </label>
          <input value={formValue.password2} onChange={handleChange} type="text" name="password2" required />
        </div>
        <button type="submit">Sing up</button>
      </form>
    </div>
  );
};

export default SignUp;
