import {
  Routes,
  Route
}
from "react-router-dom";

import ProductDetails
from "../pages/products/ProductDetails";

import Login
from "../pages/auth/Login";

import Signup
from "../pages/auth/Signup";

import Home
from "../pages/products/Home";

import Orders
from "../pages/orders/Orders";

import Address from "../pages/address/Address";

import Cart
from "../pages/cart/Cart";

import PrivateRoute
from "./PrivateRoute";

import Wishlist
from "../pages/wishlist/Wishlist";

export default function AppRoutes() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

<Route
  path="/wishlist"
  element={
    <PrivateRoute>
      <Wishlist />
    </PrivateRoute>
  }
/>

      <Route
  path="/product/:id"
  element={<ProductDetails />}
/>

<Route
  path="/orders"
  element={<Orders />}
/>

<Route
  path="/address"
  element={<Address />}
/>
      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />

    </Routes>

  );
}