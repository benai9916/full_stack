import React from "react";
import { Button, Box, Grid, Typography, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { pink } from "@mui/material/colors";
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone";
import { useNavigate } from "react-router-dom";

const LoginSignUpBox = ({
  mode,
  errors,
  handleSubmit,
  handleChange,
}) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ height: "100vh", mt: 10 }}>
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
            onClick={() => navigate(-1)}
          >
            Go Back
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
            <AutoStoriesTwoToneIcon fontSize="large" /> BookFair {mode}
          </Typography>
        </Grid>
        <Grid item xs={3} textAlign={"center"}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { mb: 4, width: "100%" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            {mode !== "login" && (
              <TextField
                error={errors.name ? true : false}
                helperText={errors.name}
                name="name"
                label="Name"
                variant="standard"
                onChange={handleChange}
              />
            )}
            <TextField
              error={errors.email ? true : false}
              helperText={errors.email}
              name="email"
              label="Email"
              variant="standard"
              onChange={handleChange}
            />
            <Button
              type="submit"
              size="large"
              variant="outlined"
              color="secondary"
            >
              {mode}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginSignUpBox;
