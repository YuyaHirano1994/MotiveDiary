import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { RecoilRoot, useRecoilState } from "recoil";
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
import SessionLoader from "./common/SessionLoader";
import { sessionState } from "./atom/sessionAtom";

const App = () => {
  const NotSignedRoute = ({ children }) => {
    const [session, setSession] = useRecoilState(sessionState);
    const user = session.session?.user;
    console.log(user);
    if (user) {
      return <Navigate to="/home" />;
    } else {
      return children;
    }
  };

  const SignedRoute = ({ children }) => {
    const [session, setSession] = useRecoilState(sessionState);
    const user = session.session?.user;
    console.log(user);
    if (user) {
      return children;
    } else {
      return <Navigate to="/user/signin" />;
    }
  };

  return (
    <RecoilRoot>
      <BrowserRouter>
        <SessionLoader />
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/user/signup"
            element={
              <NotSignedRoute>
                <SignUp />
              </NotSignedRoute>
            }
          />
          <Route
            path="/user/signin"
            element={
              <NotSignedRoute>
                <SignIn />
              </NotSignedRoute>
            }
          />
          <Route
            path="/mypage"
            element={
              <SignedRoute>
                <MyPage />
              </SignedRoute>
            }
          />
          <Route
            path="/mypage/setting"
            element={
              <SignedRoute>
                <Setting />
              </SignedRoute>
            }
          />
          <Route
            path="/challenge/:id"
            element={
              <SignedRoute>
                <Challenge />
              </SignedRoute>
            }
          />
          <Route
            path="/challenge/create"
            element={
              <SignedRoute>
                <CreateChallenge />
              </SignedRoute>
            }
          />
          <Route
            path="/challenge/update/:id"
            element={
              <SignedRoute>
                <EditChallenge />
              </SignedRoute>
            }
          />
          <Route
            path="/day/create/:id"
            element={
              <SignedRoute>
                <CreateDay />
              </SignedRoute>
            }
          />
          <Route
            path="/day/edit/:id/:day_id"
            element={
              <SignedRoute>
                <EditDay />
              </SignedRoute>
            }
          />
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
    </RecoilRoot>
  );
};

export default App;
