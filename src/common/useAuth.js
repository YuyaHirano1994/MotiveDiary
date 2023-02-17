import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabase";

const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const getSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      if (data === null) {
        navigate("/user/signin");
      } else {
        setUser(data.session.user);
      }
    } catch (error) {
      alert("Database error");
      console.log(error.error_description || error.message);
      navigate("/");
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  return user;
};

export default useAuth;
