import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import supabase from "../common/supabase";
import { useRecoilValue } from "recoil";
import { sessionState } from "../atom/sessionAtom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { DialogModal } from "../common/DialogModal";
import { Navigate, useNavigate } from "react-router-dom";

function LikeButton({ challenge_id }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // イイネ数の状態を管理するステート
  const session = useRecoilValue(sessionState);
  const [modalConfig, setModalConfig] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(); // ボタンの初期状態とイイネ数を取得
  }, []);

  const fetchData = async () => {
    await fetchLikeCount(); // イイネ数を取得
    await checkIfLiked(); // ボタンの初期状態を確認
  };

  const fetchLikeCount = async () => {
    const { count, error } = await supabase
      .from("likes")
      .select("challenge_id", { count: "exact" })
      .eq("challenge_id", challenge_id);

    if (count !== null && error === null) {
      setLikeCount(count); // イイネ数を更新
    }
  };

  const checkIfLiked = async () => {
    if (session?.id) {
      const { data, error } = await supabase
        .from("likes")
        .select("challenge_id")
        .eq("challenge_id", challenge_id)
        .eq("user_id", session.id);

      if (data && data.length > 0) {
        setLiked(true); // いいね済みの場合はボタンを変更
      }
    }
  };

  const handleLike = async () => {
    try {
      if (session?.id) {
        if (liked) {
          // いいねが登録されている場合は削除
          const { error } = await supabase
            .from("likes")
            .delete()
            .eq("challenge_id", challenge_id)
            .eq("user_id", session.id);
          if (error) throw error;
        } else {
          // いいねが登録されていない場合は追加
          const { error } = await supabase.from("likes").insert([{ challenge_id: challenge_id, user_id: session.id }]);
          if (error) throw error;
        }
        setLiked(!liked); // ボタンの状態を反転させる
        await fetchLikeCount(); // イイネ数を更新
      } else {
        await new Promise((resolve) => {
          setModalConfig({
            onClose: resolve,
            title: "Please Sign in",
            message: "",
            type: false,
          });
        });
        navigate("/user/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {modalConfig && <DialogModal {...modalConfig} />}
      <Button variant={liked ? "contained" : "outlined"} size="small" onClick={handleLike}>
        {liked ? <ThumbUpAltIcon sx={{ fontSize: "20px" }} /> : <ThumbUpOffAltIcon />}
        <span>{likeCount}</span> {/* イイネ数を表示する */}
      </Button>
    </>
  );
}

export default LikeButton;
