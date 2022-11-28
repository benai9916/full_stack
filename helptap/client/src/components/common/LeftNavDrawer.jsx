import * as React from "react";
import { Box, Badge } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone";
import { Outlet, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// local
import { BUYER, SELLER } from "constants";
import LeftNavLink from "./LeftNavLink";
import { sellerProfile } from "store/slices/sellerSlice";

const drawerWidth = 240;

export const PermanentDrawerLeft = ({ clientType }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth?.data);
  const { shopName } = useSelector((state) => state.seller);
  const { buyerId: buyerIds, cart } = useSelector((state) => state.buyer);
  let { sellerId, buyerId } = useParams();
  let ids = localStorage.getItem("id");

  React.useEffect(() => {
    if (!shopName && clientType === SELLER) {
      dispatch(sellerProfile(sellerId));
    }
  }, []);

  if (clientType === BUYER) {
    if (!buyerId) buyerId = id || buyerIds || ids;
  } else {
    if (!sellerId) sellerId = id || ids;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar sx={{ opacity: 1, zIndex: 111111 }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            textTransform={"capitalize"}
          >
            {clientType}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            textTransform={"capitalize"}
          >
            BookFair&nbsp;
          </Typography>
          <Typography variant="h5" noWrap component="div" mt={1}>
            <AutoStoriesTwoToneIcon fontSize="large" />
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {clientType === BUYER && (
            <>
              <LeftNavLink path={`/buyer/${buyerId}`} text="Home" />
              <LeftNavLink path={`/buyer/${buyerId}/cart`} text="Cart">
                <Badge badgeContent={cart.length} color="warning">
                  <ShoppingCartIcon color="action" />
                </Badge>
              </LeftNavLink>
              <LeftNavLink path={`/sellers`} text="Sellers" />
              <LeftNavLink path={`/buyer/${buyerId}/order`} text="Order" />
              <LeftNavLink path={`/search`} text="Search" />
            </>
          )}
          {clientType === SELLER && (
            <>
              <LeftNavLink path={`/seller/${sellerId}`} text="Home" />
              {shopName && (
                <>
                  <LeftNavLink
                    path={`/seller/${sellerId}/books`}
                    text="Book List"
                  />
                  <LeftNavLink
                    path={`/seller/${sellerId}/books/new`}
                    text="Add Books"
                  />
                  <LeftNavLink
                    path={`/seller/${sellerId}/orders`}
                    text="Orders"
                  />
                </>
              )}
            </>
          )}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
