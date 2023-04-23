import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
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
import Footer from "./components/Footer";
import EditDay from "./pages/day/EditDay";
import Setting from "./pages/user/Setting";
import useAuth from "./common/useAuth";
import { createTheme, Snackbar, ThemeProvider, responsiveFontSizes } from "@mui/material";
import { themeOptions } from "./theme-options";
import { sessionState } from "./atom/sessionAtom";
import { useRecoilState } from "recoil";

const App = () => {
  let theme = createTheme(themeOptions);
  theme = responsiveFontSizes(theme);

  const [session, setSession] = useRecoilState(sessionState);

  /* サインインしていない指定のページにアクセスさせない制御 */
  const SignedRoute = ({ children }) => {
    if (session) {
      return children;
    } else {
      return <Navigate to="/user/signin" />;
    }
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/user/signin" element={<SignIn />} />
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
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
