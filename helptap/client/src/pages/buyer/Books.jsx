import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box, Grid, Typography, Button, Paper, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// local
import LoadingHOC from "components/common/LoadingHOC";
import {
  getBookBySellerId,
  cartItems,
  updateCartItem,
} from "store/slices/buyerSlice";

const Books = (props) => {
  const { setLoading } = props;
  const dispatch = useDispatch();
  const { sellerId } = useParams();
  const { isLoading, isError, sellerBook, cart, buyerId } = useSelector(
    (state) => state.buyer
  );

  useEffect(() => {
    dispatch(getBookBySellerId(sellerId));
    setLoading(isLoading);
  }, []);

  const handleAddToCart = (book, sellerName) => {
    let data = { ...book, ["sellerName"]: sellerName };
    if (cart.length > 0) {
      let seller = new Set([data.sellerId]);
      for (let c of cart) {
        seller.add(c.sellerId);
      }
      if (seller.size > 1) {
        dispatch(updateCartItem(data));
      } else {
        dispatch(cartItems(data));
      }
    } else {
      dispatch(cartItems(data));
    }
  };

  return (
    <>
      {!isLoading && !isError && sellerBook && (
        <Box sx={{ height: "100vh", mt: 2 }}>
          <Typography variant="h4" gutterBottom mb={6}>
            Books
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            justifyContent="center"
            textAlign="left"
          >
            <Grid item xs={11}>
              <Paper
                sx={{
                  mr: "auto",
                  p: 3,
                  backgroundColor: "#1A2027",
                }}
              >
                <Box display={"flex"}>
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      Seller Name
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {sellerBook?.sellerName}
                    </Typography>
                  </Box>
                  {cart.length > 0 && (
                    <Button
                      variant="contained"
                      color="warning"
                      size="large"
                      sx={{ height: "40px", ml: 20 }}
                    >
                      <Link to={`/buyer/${buyerId}/cart`} replace>
                        Go to Cart
                      </Link>
                    </Button>
                  )}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={11}>
              <Box sx={{ width: "60%" }}>
                <Stack spacing={2}>
                  <Paper
                    sx={{
                      p: 1,
                      display: "flex",
                      justifyContent: "space-evenly",
                      gap: 10,
                      backgroundColor: "#1A2027",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      No
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Book Name
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Book count
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Add to cart
                    </Typography>
                  </Paper>
                  {sellerBook?.books?.map((book, i) => (
                    <Paper
                      key={i}
                      sx={{
                        p: 1,
                        display: "flex",
                        justifyContent: "space-evenly",
                        gap: 10,
                        backgroundColor: "#1A2027",
                      }}
                    >
                      <Typography variant="subtitle1" gutterBottom>
                        {book?.id}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        {book?.bookName}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        {book?.stockCount}
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={() =>
                          handleAddToCart(book, sellerBook?.sellerName)
                        }
                      >
                        Add
                      </Button>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default LoadingHOC(Books);
