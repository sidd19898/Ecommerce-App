import {
  Routes,
  Route
} from "react-router-dom";

import Home
from "../pages/products/Home";

import ProductDetails
from "../pages/products/ProductDetails";

import Login
from "../pages/auth/Login";

import Signup
from "../pages/auth/Signup";

import Profile
from "../pages/profile/Profile";

import ManageAddresses
from "../pages/profile/ManageAddresses";

import Cart
from "../pages/cart/Cart";

import Wishlist
from "../pages/wishlist/Wishlist";

import Orders
from "../pages/orders/Orders";

import Address
from "../pages/address/Address";

import AdminDashboard
from "../pages/admin/AdminDashboard";

import AdminProducts
from "../pages/admin/AdminProducts";

import AdminOrders
from "../pages/admin/AdminOrders";

import AdminCategories
from "../pages/admin/AdminCategories";

import PrivateRoute
from "./PrivateRoute";

import AdminRoute
from "./AdminRoute";

export default function AppRoutes() {

  return (

    <Routes>

      {/* Public Routes */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/product/:id"
        element={<ProductDetails />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* User Protected Routes */}

      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
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
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
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
        path="/orders"
        element={
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        }
      />

      <Route
        path="/address"
        element={
          <PrivateRoute>
            <Address />
          </PrivateRoute>
        }
      />

      {/* Admin Routes */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
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
        path="/admin/orders"
        element={
          <AdminRoute>
            <AdminOrders />
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

    </Routes>

  );

}