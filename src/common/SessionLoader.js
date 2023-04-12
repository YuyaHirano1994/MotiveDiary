// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import supabase from "./supabase";
// import { useRecoilState } from "recoil";
// import { sessionState } from "../atom/sessionAtom";

// const SessionLoader = () => {
//   const navigate = useNavigate();
//   const [session, setSession] = useRecoilState(sessionState);

//   useEffect(() => {
//     const getSession = async () => {
//       try {
//         const { data, error } = await supabase.auth.getSession();
//         if (error) {
//           throw error;
//         }
//         if (data) {
//           setSession(data);
//         } else {
//           navigate("/home");
//         }
//       } catch (error) {
//         setSession({});
//         navigate("/home");
//         alert("SessionLoader Database connect error");
//         console.log(error.error_description || error.message);
//       }
//     };
//     getSession();
//   }, []);
// };

// export default SessionLoader;
