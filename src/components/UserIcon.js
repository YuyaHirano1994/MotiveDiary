import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { useRecoilValue } from "recoil";
import { sessionState } from "../atom/sessionAtom";
import { profileState } from "../atom/profileAtom";
import supabase from "../common/supabase";

/**
 *
 * @param {userID} string // string
 * @param {width} string // number
 * @param {height} string // number
 * @returns
 */

const UserIcon = (props) => {
  const session = useRecoilValue(sessionState);
  const profile = useRecoilValue(profileState);
  const userID = props?.userID || session?.id || undefined;
  const [src, setSrc] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data, error } = await supabase.from("profile").select("*").eq("user_id", userID);
        if (error) throw error;
        getAvatar(data[0]);
      } catch (error) {
        console.log(error.error_description || error.message);
      }
    };

    const getAvatar = async (profile) => {
      if (profile) {
        try {
          const { data } = await supabase.storage.from("avatars").getPublicUrl(profile.avatar_url);
          const imageUrl = data.publicUrl;
          setSrc(imageUrl);
        } catch (error) {
          console.log(error.error_description || error.message);
        }
      }
    };

    getProfile();
  }, [userID, profile]);

  return (
    <Avatar
      src={src}
      sx={{
        width: props.width ? props.width : 80,
        height: props.height ? props.height : 80,
        "@media screen and (min-width:600px)": {
          width: props.width ? props.width : 120,
          height: props.height ? props.height : 120,
        },
      }}
    />
  );
};

export default UserIcon;
