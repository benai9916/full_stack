import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box, Grid, Typography, Paper, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
// local
import LoadingHOC from "components/common/LoadingHOC";
import { getOrderDetail } from "store/slices/sellerSlice";

const ListOrders = (props) => {
  const { setLoading } = props;
  const dispatch = useDispatch();
  const { sellerId } = useParams();
  const { isLoading, isError, ordersDetails } = useSelector(
    (state) => state.seller
  );

  useEffect(() => {
    dispatch(getOrderDetail(sellerId));
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
                  {ordersDetails.length < 1 ? (
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
                          Buyer Name
                        </Typography>
                      </Paper>
                      {ordersDetails?.map((order, i) => (
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
                            {order?.bookId}
                          </Typography>
                          <Typography variant="subtitle1" gutterBottom>
                            {order?.books?.bookName}
                          </Typography>
                          <Typography variant="subtitle1" gutterBottom>
                            {order?.buyer?.buyerName}
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

export default LoadingHOC(ListOrders);
