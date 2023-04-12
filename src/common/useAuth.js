import React, { useState, useEffect } from "react";
import supabase from "./supabase";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useAuth is reading...");
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

  return { user, error };
}
