const express = require("express");

const {
  placeOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders
} = require("../controllers/order.controller");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const router = express.Router();

// User Routes

router.post(
  "/",
  authMiddleware,
  placeOrder
);

router.get(
  "/",
  authMiddleware,
  getMyOrders
);

router.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  getAllOrders
);

router.get(
  "/:id",
  authMiddleware,
  getOrderById
);

// Admin Route

router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

module.exports = router;