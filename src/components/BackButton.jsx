import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <Button variant="outlined">
      <Link to={-1} className="button">
        BACK
      </Link>
    </Button>
  );
};

export default BackButton;
