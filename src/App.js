import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import MyPage from "./pages/MyPage";
import UpdateChallenge from "./pages/challenge/UpdateChallenge";
import "./App.css";
import CreateChallenge from "./pages/challenge/CreateChallenge";
import Challenge from "./pages/challenge/Challenge";
import CreateDay from "./pages/day/CreateDay";

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/signin" element={<SignIn />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/challenge/:id" element={<Challenge />} />
        <Route path="/challenge/create" element={<CreateChallenge />} />
        <Route path="/challenge/update/:id" element={<UpdateChallenge />} />
        <Route path="/day/create/:id" element={<CreateDay />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
