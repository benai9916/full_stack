import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SellIcon from "@mui/icons-material/Sell";
import { Link } from "react-router-dom";
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone";
import "./styles.scss";

const Auth = () => {
  return (
    <Box sx={{ height: "100vh", flexGrow: 1, mt: 16 }}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="center"
      >
        <Grid item xs={12} mb={4}>
          <Typography
            variant="h1"
            gutterBottom
            textAlign={"center"}
            mb={1}
            mt={6}
          >
            BookFair
            <AutoStoriesTwoToneIcon fontSize="large" />
          </Typography>
          <Typography variant="subtitle1" gutterBottom textAlign={"center"}>
            Please select how you want to use BookFair
          </Typography>
        </Grid>

        <Grid item xs={2} textAlign={"center"}>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            startIcon={<SellIcon />}
          >
            <Link to="/seller">Seller</Link>
          </Button>
        </Grid>
        <Grid item xs={2} textAlign={"center"}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            startIcon={<ShoppingCartIcon />}
          >
            <Link to="/buyer">Buyer</Link>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Auth;
