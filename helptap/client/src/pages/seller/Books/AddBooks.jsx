import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// local
import LoadingHOC from "components/common/LoadingHOC";
import { addBook, getBook } from "store/slices/sellerSlice";

const AddBooks = (props) => {
  const { setLoading } = props;
  const dispatch = useDispatch();
  let { sellerId } = useParams();
  const [errors, setErros] = useState({});
  const [value, setValue] = useState({});
  const { isLoading, isError, booksList, shopName } = useSelector(
    (state) => state.seller
  );

  useEffect(() => {
    dispatch(getBook(sellerId));
    setLoading(isLoading);
  }, []);

  useEffect(() => {
    if (booksList) {
      setValue((prev) => ({
        ...prev,
        ["shopId"]: shopName?.id,
        ["sellerId"]: sellerId,
      }));
    }
  }, [booksList]);

  const handleChange = (e) => {
    if (e.target.name === "stockCount") {
      setValue((prev) => ({
        ...prev,
        [e.target.name]: Number(e.target.value),
      }));
    } else {
      setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = (e) => {
    console.log(value);
    if (e) e.preventDefault();
    if (!value.stockCount) {
      setErros({ stockCount: "Please enter count" });
    } else if (!value.bookName) {
      setErros({ bookName: "Please enter book name" });
    } else {
      e.target.reset();
      setErros({});
      setValue({});
      dispatch(addBook(value));
      setLoading(isLoading);
    }
  };

  return (
    <Box sx={{ height: "100vh", mt: 0 }}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="center"
      >
        <Grid item xs={12} mb={4}>
          <Typography variant="h4" gutterBottom mb={1} mt={6}>
            Add book
          </Typography>
        </Grid>
        <Grid item xs={4} textAlign={"center"}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { mb: 4, width: "100%" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              error={errors.bookName ? true : false}
              helperText={errors.bookName}
              name="bookName"
              label="Book Name"
              variant="outlined"
              type="text"
              onChange={handleChange}
            />
            <TextField
              error={errors.stockCount ? true : false}
              helperText={errors.stockCount}
              name="stockCount"
              label="No of Book"
              variant="outlined"
              type="number"
              onChange={handleChange}
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
        </Grid>
        <Grid item xs={11} textAlign="left" mt={10}>
          <Button variant="contained" color="secondary" size="large">
            <Link to={`/seller/${sellerId}/books`} replace>
              List Books
            </Link>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoadingHOC(AddBooks);
