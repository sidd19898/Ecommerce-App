const express = require("express");

const {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart
} = require("../controllers/cart.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getCart);
router.post("/add", addToCart);
router.put("/update", updateCart);
router.delete("/remove/:productId", removeFromCart);
router.delete("/clear", clearCart);

module.exports = router;