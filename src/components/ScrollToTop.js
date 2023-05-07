import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { CSSTransition } from "react-transition-group";
import "../App.css";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isTop = scrollTop === 0;
    const isBottom = scrollTop + window.innerHeight === document.documentElement.scrollHeight;

    setShowButton(!isTop && !isBottom);
  };

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <CSSTransition in={showButton} timeout={300} classNames="fade" unmountOnExit>
      <div className="scroll-to-top">
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={returnTop}
          endIcon={<KeyboardDoubleArrowUpIcon />}
        >
          go top
        </Button>
      </div>
    </CSSTransition>
  );
};

export default ScrollToTop;
