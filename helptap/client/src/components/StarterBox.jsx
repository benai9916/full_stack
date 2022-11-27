import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { pink } from "@mui/material/colors";
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone";

const StarterBox = ({ signUppath, loginPath, mode }) => {
  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      justifyContent="center"
    >
      <Grid item xs={8} mb={4}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon sx={{ color: pink[500] }} />}
        >
          <Link to="/">Back</Link>
        </Button>
      </Grid>
      <Grid item xs={12} mb={4}>
        <Typography
          variant="h2"
          gutterBottom
          textAlign={"center"}
          mb={1}
          mt={6}
        >
          <AutoStoriesTwoToneIcon /> BookFair for {mode}
        </Typography>
      </Grid>
      <Grid item xs={2} textAlign={"center"}>
        <Button size="large" variant="contained" color="secondary">
          <Link to={signUppath}>Signup</Link>
        </Button>
      </Grid>
      <Grid item xs={2} textAlign={"center"}>
        <Button size="large" variant="contained" color="primary">
          <Link to={loginPath}>Login</Link>
        </Button>
      </Grid>
    </Grid>
  );
};

export default StarterBox;
