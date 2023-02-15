import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import MyPage from "./pages/MyPage";
import UpdateDiary from "./pages/diary/UpdateDiary";
import "./App.css";
import CreateDiary from "./pages/diary/CreateDiary";
import Diary from "./pages/diary/Diary";

const App = () => {
  // const [session, setSession] = useState(null);

  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/signin" element={<SignIn />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/diary/create" element={<CreateDiary />} />
        <Route path="/diary/update/:id" element={<UpdateDiary />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
