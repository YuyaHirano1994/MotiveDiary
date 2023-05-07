import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../common/supabase";
import { Box, Container } from "@mui/system";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { profileState } from "../../atom/profileAtom";
import { sessionState } from "../../atom/sessionAtom";

const Setting = () => {
  const navigate = useNavigate();
  const session = useRecoilValue(sessionState);
  const [profile, setProfile] = useRecoilState(profileState);
  const [isLoading, setIsLoading] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [imageSrc, setImageSrc] = useState();
  const [avatar, setAvatar] = useState({
    file: "",
    filepath: "",
    filename: "",
  });

  const getProfile = async () => {
    if (session?.id) {
      try {
        const { data, error } = await supabase.from("profile").select("*").eq("user_id", session?.id);
        if (error) {
          throw error;
        }
        setFormValue({ ...formValue, ...data[0] });
        setProfile({ ...profile, ...data[0] });
        setIsLoading(true);
      } catch (error) {
        console.log(error.error_description || error.message);
      }
    }
  };

  const getAvatar = async () => {
    let filePath = formValue.avatar_url;
    const { data } = await supabase.storage.from("avatars").getPublicUrl(filePath);
    const imageUrl = data.publicUrl;
    setImageSrc(imageUrl);
  };

  useEffect(() => {
    getProfile();
  }, [session]);

  useEffect(() => {
    getAvatar();
  }, [formValue]);

  const handleChange = (e) => {
    e.preventDefault();
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    try {
      if (e.target.files.length === 0) {
        console.log("cancel event");
        return;
      }
      const file = e.target.files[0];
      const file_name = file.name + session.id;
      const file_url = URL.createObjectURL(file);
      setAvatar({ ...avatar, file: file, filepath: file_url, filename: file_name });
      setFormValue({ ...formValue, avatar_url: file_name });
      setImageSrc(file_url);
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };

  const uploadAvatar = async () => {
    try {
      if (profile.avatar_url) {
        const { data, error } = await supabase.storage.from("avatars").remove([`${profile.avatar_url}`]);
        if (error) throw error;
      }
      const { data, error } = await supabase.storage.from("avatars").upload(avatar.filename, avatar.file);
      if (error) throw error;
      return; // Promiseの解決として何も返さない（undefinedを返す）
    } catch (error) {
      console.log(error.error_description || error.message);
      throw error; // エラーを再スローする
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    try {
      //アバターが変更され場合のみ実施
      if (profile.avatar_url !== formValue.avatar_url) {
        await uploadAvatar(); // uploadAvatarの完了を待つ
      }
      const { error } = await supabase
        .from("profile")
        .update([
          {
            nickname: formValue.nickname,
            avatar_url: formValue.avatar_url,
            comment: formValue.comment,
            updated_at: now,
          },
        ])
        .eq("user_id", session.id);
      if (error) throw error;
      getProfile();
      alert("Update your profile Success");
      navigate(`/mypage`);
    } catch (error) {
      alert("Failed");
      console.log(error);
    }
  };

  const backHome = () => {
    navigate("/mypage");
  };

  return (
    <>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" align="center">
            Setting
          </Typography>
          {isLoading ? (
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={avatar.filepath ? avatar.filepath : imageSrc}
                  sx={{ width: 250, height: 250, margin: "20px" }}
                ></Avatar>
                <label>
                  <Button variant="contained" component="span" sx={{ marginBottom: "20px" }}>
                    Choose Avatar
                  </Button>
                  <input
                    name="avatar_url"
                    onChange={handleImageChange}
                    type="file"
                    multiple
                    accept="image/*,.png,.jpg,.jpeg,.gif"
                    style={{ display: "none" }}
                  />
                </label>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextField
                  value={formValue.nickname}
                  onChange={handleChange}
                  margin="normal"
                  required
                  fullWidth
                  name="nickname"
                  label="Nickname"
                  type="text"
                  id="nickname"
                />
                <TextField
                  value={formValue.comment}
                  onChange={handleChange}
                  margin="normal"
                  required
                  fullWidth
                  name="comment"
                  label="Comment"
                  type="text"
                  id="comment"
                />
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Update Profile
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              <Typography>Now Loading...</Typography>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Setting;
