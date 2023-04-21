import React, { useState, useEffect } from "react";
import supabase from "../common/supabase";
import { Avatar } from "@mui/material";
import { userInfoState } from "../atom/userAtom";
import { useRecoilState } from "recoil";

/**
 *
 * @param {userID} string // string
 * @param {width} string // number
 * @param {height} string // number
 * @returns
 */

const UserIcon = (props) => {
  const userID = props.userID;
  const [src, setSrc] = useState("");
  const [userInfo] = useRecoilState(userInfoState);

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
    if (userProfile) {
      const { data } = await supabase.storage.from("avatars").getPublicUrl(userProfile.avatar_url);
      const imageUrl = data.publicUrl;
      setSrc(imageUrl);
    }
  };

  useEffect(() => {
    if (!userID) {
      return;
    }
    getAvatar();
  }, [userID, userInfo]);

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
