import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

const BackButton = (props) => {
  return (
    <>
      <Link to={props?.to ? props.to : -1}>
        <Button variant="outlined" size="small" sx={{ mb: 2 }}>
          <KeyboardReturnIcon />
          Back
        </Button>
      </Link>
    </>
  );
};

export default BackButton;
