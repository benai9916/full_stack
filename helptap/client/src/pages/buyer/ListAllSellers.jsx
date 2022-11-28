import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box, Grid, Typography, Paper, Stack, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// local
import LoadingHOC from "components/common/LoadingHOC";
import { getAllSellers } from "store/slices/buyerSlice";

const ListAllSellers = (props) => {
  const { setLoading } = props;
  const dispatch = useDispatch();
  const { buyerId } = useParams();
  const { isLoading, isError, allSellers } = useSelector(
    (state) => state.buyer
  );

  useEffect(() => {
    dispatch(getAllSellers(buyerId));
    setLoading(isLoading);
  }, []);

  return (
    <Box sx={{ mt: 2, p: 3 }}>
      <Typography variant="h4" gutterBottom mb={6}>
        Sellers List
      </Typography>
      {allSellers && (
        <Grid
          container
          rowSpacing={6}
          columnSpacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent="center"
          textAlign="center"
        >
          {allSellers.map((seller, ix) => (
            <Grid key={ix} item xs={4}>
              <Link to={`${seller.id}`}>
                <Paper
                  sx={{
                    position: "relative",
                    height: 190,
                    p: 4,
                    backgroundColor: "#1A2027",
                  }}
                >
                  <Box display="flex" sx={{ gap: 3, flexGrow: 1 }}>
                    <Typography variant="h7" gutterBottom>
                      Seller Name:
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      textAlign="left"
                    >
                      {seller.sellerName}
                    </Typography>
                  </Box>
                  <Box display="flex" sx={{ gap: 10 }} textAlign="left">
                    <Typography variant="h7" gutterBottom>
                      Seller Email:
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {seller.email}
                    </Typography>
                  </Box>
                  <Box sx={{ position: "absolute", bottom: "22px" }}>
                    <Button variant="outlined" color="error" size="small">
                      Checkout
                    </Button>
                  </Box>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default LoadingHOC(ListAllSellers);
