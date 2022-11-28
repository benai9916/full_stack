import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box, Button, Typography, Paper, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// local
import LoadingHOC from "components/common/LoadingHOC";
import { getSellersById } from "store/slices/buyerSlice";

const SellerDetail = (props) => {
  const { setLoading } = props;
  const dispatch = useDispatch();
  const { sellerId } = useParams();
  const { isLoading, sellerDetail } = useSelector(
    (state) => state.buyer
  );

  useEffect(() => {
    dispatch(getSellersById(sellerId));
    setLoading(isLoading);
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom mb={6}>
        Sellers Detail
      </Typography>
      {sellerDetail && (
        <Paper
          sx={{
            p: 4,
            backgroundColor: "#1A2027",
          }}
        >
          <Box display="flex" sx={{ gap: 3, flexGrow: 1 }}>
            <Typography variant="h7" gutterBottom>
              Seller Name:
            </Typography>
            <Typography variant="subtitle1" gutterBottom textAlign="left">
              {sellerDetail.sellerName}
            </Typography>
          </Box>
          <Box display="flex" sx={{ gap: 12, mt: 3 }} textAlign="left">
            <Typography variant="h5" gutterBottom>
              Seller Shop
            </Typography>
            <Divider />
          </Box>
          {sellerDetail.shop.length > 0 ? (
            <>
          <Typography variant="subtitle1" gutterBottom>
            Shop id: {sellerDetail.shop[0].id}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Shop Name: {sellerDetail.shop[0].shopName}
          </Typography>

          <Button variant="contained" color="info" size="large" sx={{ mt: 3 }}>
            <Link to={`/sellers/${sellerId}/books`} replace>
              Browse Books
            </Link>
          </Button>
          </>
          ) : (
            <Typography variant="h6" gutterBottom color="error">
              Seller dont have any Shop
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default LoadingHOC(SellerDetail);
