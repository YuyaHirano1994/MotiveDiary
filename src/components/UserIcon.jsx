import React, { useState, useEffect } from "react";
import supabase from "../common/supabase";
import { Avatar } from "@mui/material";

// user_id
// width Size
// height Size
// 返り値はAvatarそのものを返す

// sample: 6f9d6f2b-b5b5-435e-a403-d08b51235af6

/**
 *
 * @param {userID} string // string
 * @param {width} string // number
 * @param {height} string // number
 * @returns
 */

const UserIcon = (props) => {
  // props = userID,width,height
  const userID = props.userID;
  const [src, setSrc] = useState("");

  const getProfile = async () => {
    try {
      const { data, error } = await supabase.from("profile").select("*").eq("user_id", userID);
      if (error) {
        throw error;
      }
      return data[0];
    } catch (error) {
      console.log(error);
    }
  };

  const getAvatar = async () => {
    const userProfile = await getProfile();
    let filePath = userProfile.avatar_url;
    const { data } = await supabase.storage.from("avatars").getPublicUrl(filePath);
    const imageUrl = data.publicUrl;
    setSrc(imageUrl);
  };

  useEffect(() => {
    getAvatar();
  }, [userID]);

  return (
    <Avatar src={src} sx={{ width: props.width ? props.width : 120, height: props.height ? props.height : 120 }} />
  );
};

export default UserIcon;
