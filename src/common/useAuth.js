import { useState, useEffect } from "react";
import supabase from "./supabase";
import { sessionState } from "../atom/sessionAtom";
import { profileState } from "../atom/profileAtom";
import { useSetRecoilState } from "recoil";

export default function useAuth() {
  const [error, setError] = useState(null);
  const setSession = useSetRecoilState(sessionState);
  const setProfile = useSetRecoilState(profileState);
  useEffect(() => {
    async function fetchAuthUser() {
      try {
        const { data: session, error } = await supabase.auth.getSession();
        setError(null);
      } catch (error) {
        console.log(error.error_description || error.message);
        setError(error);
      }
    }
    fetchAuthUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
        setProfile(null);
        if (authListener) {
          authListener?.subscription.unsubscribe();
        }
      } else if (event == "PASSWORD_RECOVERY") {
        setSession(null);
        setProfile(null);
      } else {
        setSession(session?.user || null);
      }
    });
  }, []);

  async function signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
        rememberMe: true,
      });
      if (error) throw error;
      setSession(data.user);
      return { result: true };
    } catch (error) {
      console.log(error.error_description || error.message);
      setError(error);
      return { result: false, msg: error.message };
    }
  }

  async function signUp(email, password) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      return { result: true };
    } catch (error) {
      console.log(error.error_description || error.message);
      setError(error);
      return { result: false, msg: error.message };
    }
  }

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return true;
    } catch (error) {
      console.log(error.error_description || error.message);
      setError(error);
      return false;
    }
  }

  async function resetPass(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://motive-diary.vercel.app/changepasswordform",
      });
      if (error) throw error;
      return true;
    } catch (error) {
      console.log(error.error_description || error.message);
      setError(error);
      return false;
    }
  }

  async function sendResetPass(newPassword) {
    try {
      const { data, error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      if (data) return { result: true };
    } catch (error) {
      console.log(error.error_description || error.message);
      setError(error);
      return { result: false, msg: error.message };
    }
  }

  return { error, signIn, signUp, signOut, resetPass, sendResetPass };
}
