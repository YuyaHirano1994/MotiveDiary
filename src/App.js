import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import MyPage from "./pages/MyPage";
import EditChallenge from "./pages/challenge/EditChallenge";
import "./App.css";
import CreateChallenge from "./pages/challenge/CreateChallenge";
import Challenge from "./pages/challenge/Challenge";
import CreateDay from "./pages/day/CreateDay";
import Header from "./components/Header";
import EditDay from "./pages/day/EditDay";
import Setting from "./pages/user/Setting";

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/signin" element={<SignIn />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/setting" element={<Setting />} />
        <Route path="/challenge/:id" element={<Challenge />} />
        <Route path="/challenge/create" element={<CreateChallenge />} />
        <Route path="/challenge/update/:id" element={<EditChallenge />} />
        <Route path="/day/create/:id" element={<CreateDay />} />
        <Route path="/day/edit/:id/:day_id" element={<EditDay />} />
        <Route
          path="/*"
          element={
            <div>
              404 not found!<Link to="/home">back to home</Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
