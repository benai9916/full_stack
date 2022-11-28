import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
// local
import {
  placeOrder
} from "store/slices/buyerSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { buyerId } = useParams();
  const { isLoading, cart } = useSelector((state) => state.buyer);

  const handelePlacedOrder = () => {
    let data = {'data': cart, 'buyerId': buyerId}
    dispatch(placeOrder(data));
  };

  return (
    <>
      {!isLoading && (
        <Box sx={{ height: "100vh", mt: 2 }}>
          <Typography variant="h4" gutterBottom mb={6}>
            Cart
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            justifyContent="center"
            textAlign="left"
          >
            {cart.length < 1 ? (
              <Typography variant="h4" gutterBottom>
                Cart is Empty
              </Typography>
            ) : (
              <>
                {cart.map((itm, idx) => (
                  <Grid key={idx} item xs={4}>
                    <Paper
                      sx={{
                        mr: "auto",
                        p: 3,
                        backgroundColor: "#1A2027",
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        Seller Id
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        {itm.sellerId}
                      </Typography>
                      <Divider />
                      <Typography variant="h6" gutterBottom>
                        Seller Name
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        {itm.sellerName}
                      </Typography>
                      <Divider />
                      <Typography variant="h6" gutterBottom>
                        Book Name
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        {itm.bookName}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
          {cart.length > 0 && (
            <Box textAlign="center" mt={8}>
              <Button
                variant="contained"
                color="success"
                size="large"
                onClick={handelePlacedOrder}
              >
                Place Order
              </Button>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default Cart;
