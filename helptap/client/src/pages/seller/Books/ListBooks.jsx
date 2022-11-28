import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box, Grid, Typography, Button, Paper, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// local
import LoadingHOC from "components/common/LoadingHOC";
import { getBook } from "store/slices/sellerSlice";

const ListBooks = (props) => {
  const { setLoading } = props;
  const dispatch = useDispatch();
  const { sellerId } = useParams();
  const { isLoading, isError, booksList } = useSelector(
    (state) => state.seller
  );

  useEffect(() => {
    dispatch(getBook(sellerId));
    setLoading(isLoading);
    // eslint-disable-next-line
  }, []); 

  return (
    <>
      {!isLoading && !isError && booksList && (
        <Box sx={{ height: "100vh", mt: 2 }}>
          <Typography variant="h4" gutterBottom mb={6}>
            Books
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
                  </Paper>
                  {booksList?.map((book, i) => (
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
                    </Paper>
                  ))}
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={11} textAlign="left" mt={10}>
              <Button variant="contained" color="success" size="large">
                <Link to={`new`}>Add Books</Link>
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default LoadingHOC(ListBooks);
