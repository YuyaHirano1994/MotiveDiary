import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

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
              ReactJS | Material UI | Recoil | Supabase
              <br />
              <a href="https://storyset.com/people">People illustrations by Storyset</a>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
