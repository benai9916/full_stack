import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box, Grid, Typography, Button, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// local
import LoadingHOC from "components/common/LoadingHOC";
import { buyerProfile } from "store/slices/buyerSlice";

const BuyerHome = (props) => {
  const { setLoading } = props;
  const dispatch = useDispatch();
  const { buyerId } = useParams();
  const { isLoading, isError, profile } = useSelector((state) => state.buyer);

  useEffect(() => {
    dispatch(buyerProfile(buyerId));
    setLoading(isLoading);
  }, []);

  return (
    <>
      {!isLoading && !isError && profile?.data !== undefined && (
        <Box sx={{ height: "100vh", mt: 2 }}>
          <Typography variant="h4" gutterBottom mb={6}>
            Profile
          </Typography>
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
                  {profile?.data?.buyerName}
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
                  No of Orders
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {profile?.data?.order.length}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={4} textAlign="center" mt={10}>
              <Button variant="contained" color="secondary" size="large">
                <Link to={`order`}>View Orders</Link>
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default LoadingHOC(BuyerHome);
