import { useTheme } from "@emotion/react";
import { Button, useMediaQuery } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

const BackButton = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {isMobile ? (
        <>
          <Link to={props?.to ? props.to : -1}>
            <Button variant="outlined" size="small">
              <KeyboardReturnIcon />
              Back
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Link to={props?.to ? props.to : -1}>
            <Button variant="outlined" size="small">
              <KeyboardReturnIcon />
              Back
            </Button>
          </Link>
        </>
      )}
    </>
  );
};

export default BackButton;
