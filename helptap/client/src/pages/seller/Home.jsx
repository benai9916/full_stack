import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, Paper, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
// local
import LoadingHOC from "components/common/LoadingHOC";
import { sellerProfile, addShopName } from "store/slices/sellerSlice";

const SellerHome = (props) => {
  const { setLoading } = props;
  const dispatch = useDispatch();
  const { sellerId } = useParams();
  const [shopNames, setShopName] = useState({});
  const { isLoading, isError, profile, shopName } = useSelector(
    (state) => state.seller
  );

  useEffect(() => {
    dispatch(sellerProfile(sellerId));
    setLoading(isLoading);
  }, []);

  const handleAddShop = (e) => {
    if (e) e.preventDefault();
    if (!shopNames.shopName) {
      toast.error("Please enter shop name", { id: "shop-name" });
    } else {
      let data = { ...shopNames, ["sellerId"]: sellerId };
      dispatch(addShopName(data));
      setLoading(isLoading);
    }
  };

  return (
    <>
      {!isLoading && !isError && profile?.data !== undefined && (
        <Box sx={{ height: "100vh", mt: 2 }}>
          <Typography variant="h4" gutterBottom mb={6}>
            Profile
          </Typography>
          {!shopName ? (
            <Box
              component="form"
              sx={{
                display: "grid",
                "& > :not(style)": { mb: 4, width: "40%" },
              }}
              noValidate
              autoComplete="on"
              onSubmit={handleAddShop}
            >
              <TextField
                name="shopName"
                label="Shop Name"
                variant="outlined"
                type="text"
                onChange={(e) =>
                  setShopName({ [e.target.name]: e.target.value })
                }
              />
              <Button
                type="submit"
                size="large"
                variant="outlined"
                color="secondary"
              >
                Add
              </Button>
            </Box>
          ) : (
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              justifyContent="center"
              textAlign="center"
            >
              <Grid item xs={3}>
                <Paper
                  sx={{
                    p: 4,
                    backgroundColor: "#1A2027",
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Name
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {profile?.data?.sellerName}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={3}>
                <Paper
                  sx={{
                    p: 4,
                    backgroundColor: "#1A2027",
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Email
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {profile?.data?.email}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={3}>
                <Paper
                  sx={{
                    p: 4,
                    backgroundColor: "#1A2027",
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Shop Name
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {shopName?.shopName}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={4} textAlign="center" mt={10}>
                <Button variant="contained" color="warning" size="large">
                  <Link to={`books`}>View Books</Link>
                </Button>
              </Grid>
              <Grid item xs={4} textAlign="center" mt={10}>
                <Button variant="contained" color="secondary" size="large">
                  <Link to={`orders`}>View Orders</Link>
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      )}
    </>
  );
};

export default LoadingHOC(SellerHome);
