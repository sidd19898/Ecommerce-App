import {
  Routes,
  Route
}
from "react-router-dom";

import ProductDetails
from "../pages/products/ProductDetails";

import Profile
from "../pages/profile/Profile";

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
import AdminRoute from "./AdminRoute";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminCategories
from "../pages/admin/AdminCategories";
import ManageAddresses from "../pages/profile/ManageAddresses";

export default function AppRoutes() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

<Route
  path="/admin/categories"
  element={
    <AdminRoute>
      <AdminCategories />
    </AdminRoute>
  }
/>

<Route
  path="/admin/orders"
  element={
    <AdminRoute>
      <AdminOrders />
    </AdminRoute>
  }
/>

<Route
  path="/admin/products"
  element={
    <AdminRoute>
      <AdminProducts />
    </AdminRoute>
  }
/>


<Route
  path="/manage-addresses"
  element={
    <PrivateRoute>
      <ManageAddresses />
    </PrivateRoute>
  }
/>

<Route
  path="/profile"
  element={<Profile />}
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