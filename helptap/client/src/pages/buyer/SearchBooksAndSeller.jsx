import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
// local
import {
  searchBooks,
  searchSellers,
  cartItems,
  updateCartItem,
} from "store/slices/buyerSlice";
import LoadingHOC from "components/common/LoadingHOC";

const SearchBooksAndSeller = (props) => {
  const { setLoading } = props;
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { isLoading, bookSearch, cart, sellerSearch } = useSelector(
    (state) => state.buyer
  );

  const handleSearchText = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const tim = setTimeout(() => {
      setSearch(value);
    }, 160);
    return () => clearTimeout(tim);
  };

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const searchBook = () => {
    dispatch(searchBooks(search));
  };
  const handleSearchSeller = () => {
    dispatch(searchSellers(search));
  };

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
    <Box sx={{ height: "100vh", mt: 2 }}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="center"
        textAlign="center"
      >
        <Grid item xs={10}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-Search">Search</InputLabel>
            <OutlinedInput
              id="outlined-adornment-Search"
              onChange={handleSearchText}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              label="Search"
            />
          </FormControl>
        </Grid>
        <Grid item xs={9}>
          <Box>
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{ mt: 3, mr: 2 }}
              onClick={searchBook}
            >
              Search Books
            </Button>
            <Button
              variant="contained"
              color="info"
              size="large"
              sx={{ mt: 3, ml: 2 }}
              onClick={handleSearchSeller}
            >
              Search Seller
            </Button>
          </Box>
        </Grid>

        {bookSearch && (
          <Grid item xs={12}>
            <Grid item xs={11} mt={10}>
              <Box sx={{ width: "60%", ml: "auto", mr: "auto" }}>
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
                      Seller Name
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Add to cart
                    </Typography>
                  </Paper>
                  {bookSearch?.map((book, i) => (
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
                        {book?.seller?.sellerName}
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={() =>
                          handleAddToCart(book, book?.seller?.sellerName)
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
        )}
        {sellerSearch && (
          <>
            {sellerSearch.map((seller, id) => (
              <Grid item xs={4} mt={10}>
                <Link to={`/sellers/${seller.id}`}>
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
                        Seller Shop:
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        {seller.shop[0].shopName}
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
            {((sellerSearch && sellerSearch.length < 1) ||
              bookSearch.length < 1) && (
              <Grid item xs={4} mt={10}>
                <Typography variant="h4" gutterBottom>
                  No result
                </Typography>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default LoadingHOC(SearchBooksAndSeller);
