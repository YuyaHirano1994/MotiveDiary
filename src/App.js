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
import Footer from "./components/Footer";
import EditDay from "./pages/day/EditDay";
import Setting from "./pages/user/Setting";
import useAuth from "./common/useAuth";
import { createTheme, Snackbar, ThemeProvider, responsiveFontSizes } from "@mui/material";
import { themeOptions } from "./theme-options";

const App = () => {
  const { user, error } = useAuth();
  let theme = createTheme(themeOptions);
  theme = responsiveFontSizes(theme);

  // const NotSignedRoute = ({ children }) => {
  //   if (user) {
  //     return <Navigate to="/home" />;
  //   } else {
  //     return children;
  //   }
  // };

  // const SignedRoute = ({ children }) => {
  //   if (user) {
  //     return children;
  //   } else {
  //     return <Navigate to="/user/signin" />;
  //   }
  // };

  return (
    <RecoilRoot>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
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
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
