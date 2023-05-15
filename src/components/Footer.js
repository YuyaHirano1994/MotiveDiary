import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const footerStyles = {
  width: "100%",
  backgroundColor: "primary.main",
  pt: 2,
  pb: 2,
};

const textStyles = {
  color: "textSecondary",
  variant: "subtitle1",
};

const linkStyles = {
  textDecoration: "underline",
  color: "lime",
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={footerStyles}>
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center" textAlign="center">
          <Grid item xs={12}>
            <Typography color="black" variant="h5">
              Challenge Diary
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={textStyles}>
              {`Copyright © ${currentYear} Yuya Hirano`}
              <br />
              <a href="https://react.dev/">ReactJS</a> | <a href="https://mui.com/Material">Material UI</a> |{" "}
              <a href="https://recoiljs.org/">Recoil</a> | <a href="https://supabase.com/">Supabase</a>
              <br />
              <Link to={"/term"} style={linkStyles}>
                Terms of Service
              </Link>{" "}
              |{" "}
              <Link to={"/policy"} style={linkStyles}>
                Privacy Policy
              </Link>
              {/* <a href="https://storyset.com/people">People illustrations by Storyset</a> */}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
