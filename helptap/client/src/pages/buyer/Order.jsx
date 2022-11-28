import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box, Grid, Typography, Paper, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
// local
import LoadingHOC from "components/common/LoadingHOC";
import { getOrderDetail } from "store/slices/buyerSlice";

const Order = (props) => {
  const { setLoading } = props;
  const dispatch = useDispatch();
  const { buyerId } = useParams();
  const { isLoading, isError, ordersDetails } = useSelector(
    (state) => state.buyer
  );

  useEffect(() => {
    dispatch(getOrderDetail(buyerId));
    setLoading(isLoading);
  }, []);

  return (
    <>
      {!isLoading && !isError && ordersDetails && (
        <Box sx={{ height: "100vh", mt: 2 }}>
          <Typography variant="h4" gutterBottom mb={6}>
            Orders
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            justifyContent="center"
            textAlign="center"
          >
            <Grid item xs={11}>
              <Box sx={{ width: "60%" }}>
                <Stack spacing={2}>
                  {ordersDetails[0]?.order.length < 1 ? (
                    <Typography variant="h5" gutterBottom>
                      No Orders
                    </Typography>
                  ) : (
                    <>
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
                          Book id
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          Book Name
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          Seller Name
                        </Typography>
                      </Paper>
                      {ordersDetails[0]?.order?.map((order, i) => (
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
                            {order?.id}
                          </Typography>
                          <Typography variant="subtitle1" gutterBottom>
                            {order?.books?.bookName}
                          </Typography>
                          <Typography variant="subtitle1" gutterBottom>
                            {order?.seller?.sellerName}
                          </Typography>
                        </Paper>
                      ))}
                    </>
                  )}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default LoadingHOC(Order);
