import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../../common/supabase";
import { useRecoilState } from "recoil";
import { sessionState } from "../../atom/sessionAtom";

const Setting = () => {
  const navigate = useNavigate();
  const [session, setSession] = useRecoilState(sessionState);
  const user = session.session?.user || null;

  const [formValue, setFormValue] = useState({});
  const [imageSrc, setImageSrc] = useState();
  const [avatar, setAvatar] = useState({
    file: "",
    filepath: "",
    filename: "",
  });

  console.log(avatar);

  const getProfile = async () => {
    try {
      const { data, error } = await supabase.from("profile").select("*").eq("user_id", user.id);

      if (error) {
        throw error;
      }

      setFormValue({ ...formValue, ...data[0] });
    } catch (error) {
      console.log(error);
    }
  };

  const getAvatar = async () => {
    let filePath = formValue.avatar_url;
    console.log(filePath);
    const { data } = await supabase.storage.from("avatars").getPublicUrl(filePath);
    const imageUrl = data.publicUrl;
    setImageSrc(imageUrl);
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    getAvatar();
  }, [formValue, getAvatar]);

  const handleChange = (e) => {
    e.preventDefault();
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    console.log("target");
    console.log(e.target.files);
    try {
      if (e.target.files.length === 0) {
        console.log("cancel event");
        return;
      }

      // ファイルネームはUserName＋なにかにしていればいいんじゃないか？
      // そしてファイルは常に上書きすればいいのでは？
      // avatar_urlには保存した画像のURLを保存するのが一番はやい！！！
      const file = e.target.files[0];
      const file_name = file.name;
      const file_url = URL.createObjectURL(file);
      console.log(file_url);
      console.log(file_name);
      setAvatar({ ...avatar, file: file, filepath: file_url, filename: file_name });
      setFormValue({ ...formValue, avatar_url: file_name });
      setImageSrc(file_url);
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };

  console.log(avatar);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    try {
      console.log("user: " + user.id);
      const { error } = await supabase
        .from("profile")
        .update([
          {
            nickname: formValue.nickname,
            avatar_url: formValue.avatar_url,
            updated_at: now,
          },
        ])
        .eq("user_id", user.id);
      if (error) {
        throw error;
      }

      const { data1, error1 } = await supabase.storage.from("avatars").upload(avatar.filename, avatar.file);

      if (error1) {
        throw error1;
      }

      // 登録時のURLをアカウントごとに登録
      // すでに登録されている場合は既存の画像を削除
      // 画面読み込み時に画像をURLから取得？たぶん
      console.log(data1);
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
    <div>
      <h1>Settings</h1>
      <div>
        <img src={avatar.filepath ? avatar.filepath : imageSrc} alt="sample" width="250" height="250"></img>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Nickname:</label>
        <div>
          <input value={formValue.nickname} onChange={handleChange} type="text" name="nickname" required />
        </div>
        {/* <div>
          <label>Avatar: </label>
          <textarea value={formValue.avatar_url} onChange={handleChange} type="text" name="avatar_url" required />
        </div> */}
        <label>Avatar:</label>
        <div>
          <input
            // value={formValue.avatar_url}
            type="file"
            name="avatar_url"
            accept=".png, .jpeg"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Update</button>
        <hr />
        <button onClick={backHome}>BACK</button>
      </form>
    </div>
  );
};

export default Setting;
