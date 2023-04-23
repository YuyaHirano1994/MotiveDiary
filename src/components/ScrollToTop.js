import { Button } from "@mui/material";
import React from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

const ScrollToTop = () => {
  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      variant="contained"
      size="large"
      color="secondary"
      onClick={returnTop}
      endIcon={<KeyboardDoubleArrowUpIcon />}
      sx={{ position: "fixed", bottom: "16px", right: "16px" }}
    >
      go top
    </Button>
  );
};

export default ScrollToTop;
