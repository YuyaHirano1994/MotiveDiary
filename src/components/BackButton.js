import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

const BackButton = (props) => {
  return (
    <>
      <Link to={props?.to ? props.to : -1}>
        <Button variant="outlined" size="small">
          <KeyboardReturnIcon />
          Back
        </Button>
      </Link>
    </>
  );
};

export default BackButton;
