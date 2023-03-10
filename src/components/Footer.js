import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "primary.main",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center" textAlign={"center"}>
          <Grid item xs={12}>
            <Typography color="black" variant="h5">
              Challenge Diary
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1">
              {`Copyright © ${new Date().getFullYear()} Yuya Hirano`}
              <br />
              {`ReactJS | Material UI | Recoil | Supabase `}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
