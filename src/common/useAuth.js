import React, { useState, useEffect } from "react";
import supabase from "./supabase";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAuthUser() {
      try {
        const { data: session, error } = await supabase.auth.getSession();
        setUser(session?.session?.user ?? null);
        setError(null);
      } catch (error) {
        console.log(error.error_description || error.message);
        setError(error);
      }
    }
    fetchAuthUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
        if (authListener) {
          authListener.unsubscribe();
        }
      } else {
        setUser(session?.user ?? null);
      }
    });
  }, []);

  async function signIn(email, password) {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      setUser(user);
      setError(null);
      return true;
    } catch (error) {
      console.log(error.error_description || error.message);
      setError(error);
      return false;
    }
  }

  async function signUp(email, password) {
    try {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      setUser(user);
      setError(null);
      return true;
    } catch (error) {
      console.log(error.error_description || error.message);
      setError(error);
      return false;
    }
  }

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setError(null);
      return true;
    } catch (error) {
      console.log(error.error_description || error.message);
      setError(error);
      return false;
    }
  }

  return { user, error, signIn, signUp, signOut };
}
