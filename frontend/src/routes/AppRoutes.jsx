import {
  Routes,
  Route
}
from "react-router-dom";

import Login
from "../pages/auth/Login";

import Signup
from "../pages/auth/Signup";

import Home
from "../pages/products/Home";

import Cart
from "../pages/cart/Cart";

import PrivateRoute
from "./PrivateRoute";

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