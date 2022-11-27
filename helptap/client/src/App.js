import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
// local import
import Auth from "pages/auth";
import { SellerRoute } from "pages/seller/SellerRoute";
import { BuyerRoute } from "pages/buyer/BuyerRoute";
import SellerHome from "pages/seller/Home";

const PageNotFound = lazy(() => import("pages/NotFound"));
const SellerAuth = lazy(() => import("pages/auth/seller"));
const SellerSignup = lazy(() => import("pages/auth/seller/SignUp"));
const SellerLogin = lazy(() => import("pages/auth/seller/Login"));
const ListOrders = lazy(() => import("pages/seller/ListOrders"));
const AddBooks = lazy(() => import("pages/seller/Books/AddBooks"));
const ListBooks = lazy(() => import("pages/seller/Books/ListBooks"));

const BuyerAuth = lazy(() => import("pages/auth/buyer"));
const BuyerSignup = lazy(() => import("pages/auth/buyer/SignUp"));
const BuyerLogin = lazy(() => import("pages/auth/buyer/Login"));
const BuyerHome = lazy(() => import("pages/buyer/Home"));
const Books = lazy(() => import("pages/buyer/Books"));
const Cart = lazy(() => import("pages/buyer/Cart"));
const Order = lazy(() => import("pages/buyer/Order"));
const ListAllSellers = lazy(() => import("pages/buyer/ListAllSellers"));
const SellerDetail = lazy(() => import("pages/buyer/SellerDetail"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
         <Toaster toastOptions={{ style: { textAlign: 'center' } }} />
        <Routes>
          <Route path="/" element={<Auth />} />

          <Route path="buyer">
            <Route index element={<BuyerAuth />} />
            <Route path="new" element={<BuyerSignup />} />
            <Route path="login" element={<BuyerLogin />} />
          </Route>

          <Route path="seller">
            <Route index element={<SellerAuth />} />
            <Route path="new" element={<SellerSignup />} />
            <Route path="login" element={<SellerLogin />} />
          </Route>

          <Route path="/seller" element={<SellerRoute />}>
            <Route index path=":sellerId" element={<SellerHome />} />
            <Route path=":sellerId/books" element={<ListBooks />} />
            <Route path=":sellerId/books/new" element={<AddBooks />} />
            <Route path=":sellerId/orders" element={<ListOrders />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>

          <Route path="/buyer" element={<BuyerRoute />}>
            <Route index path=":buyerId" element={<BuyerHome />} />
            <Route path=":buyerId/cart" element={<Cart />} />
            <Route path=":buyerId/order" element={<Order />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>

          <Route path="/sellers" element={<BuyerRoute />}>
            <Route index element={<ListAllSellers />} />
            <Route path=":sellerId" element={<SellerDetail />} />
            <Route path=":sellerId/books" element={<Books />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
