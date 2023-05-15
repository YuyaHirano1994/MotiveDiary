import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import supabase from "../common/supabase";
import { useRecoilValue } from "recoil";
import { sessionState } from "../atom/sessionAtom";
import FeedbackModal from "./FeedBackModal";
import { DialogModal } from "../common/DialogModal";

const FeedbackButton = () => {
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const session = useRecoilValue(sessionState);
  const [formValue, setFormValue] = useState({
    title: "",
    email: "",
    feedback: "",
  });
  const [modalConfig, setModalConfig] = useState();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("feedback").insert([
        {
          user_id: session?.id,
          title: formValue.title,
          email: formValue.email,
          feedback: formValue.feedback,
        },
      ]);
      if (error) throw error;
      setFormValue({ title: "", email: "", feedback: "" });
      await new Promise((resolve) => {
        setModalConfig({
          onClose: resolve,
          title: "SUBMITTED",
          message: `Thank you for your feedback!`,
          type: true,
        });
      });
      setModalConfig(undefined);
      closeModal();
    } catch (error) {
      await new Promise((resolve) => {
        setModalConfig({
          onClose: resolve,
          title: "Something wrong!",
          message: `please email us (yuyahirano.dev@gmail.com)`,
          type: true,
        });
      });
      setModalConfig(undefined);
      console.log(error);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "50%",
        right: "20px",
        transform: "translate(50%, 50%) rotate(-90deg)",
        transformOrigin: "center",
        writingMode: "vertical-rl",
        textOrientation: "mixed",
        zIndex: 9999,
        display: !session?.id || isMobile ? "none" : "block",
      }}
    >
      {modalConfig && <DialogModal {...modalConfig} />}
      <Button variant="contained" onClick={openModal}>
        Feedback
      </Button>
      <Modal open={modalOpen} onClose={closeModal}>
        <FeedbackModal
          formValue={formValue}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  );
};

export default FeedbackButton;
