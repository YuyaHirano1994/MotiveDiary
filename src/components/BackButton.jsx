import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const BackButton = (props) => {
  return (
    <Button variant="outlined" size="small">
      <Link to={props?.to ? props.to : -1} className="button">
        BACK
      </Link>
    </Button>
  );
};

export default BackButton;
