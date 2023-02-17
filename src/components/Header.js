import React from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../common/supabase";
import useAuth from "../common/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const user = useAuth();

  console.log(user.id);

  // 未ログインの場合はサインアップ、サインインを表示する
  const showNotLoggedIn = () => {
    return (
      <>
        <Link to={"/"}>Home</Link>
        <br />
        <Link to={"user/signin"}>Sign In</Link>
        <br />
        <Link to={"user/signup"}>Sign Up</Link>
        <br />
      </>
    );
  };

  // ログイン済みの場合はマイページ、ログアウトを表示する
  const showLoggedIn = () => {
    return (
      <>
        <Link to={"/"}>Home</Link>
        <br />
        <Link to={"/mypage"}>MyPage</Link>
        <br />
        <button onClick={logout}>logout</button>
        <br />
      </>
    );
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
    navigate("/");
  };

  return (
    <header>
      <div>{user.id ? showLoggedIn() : showNotLoggedIn()}</div>
    </header>
  );
};

export default Header;
