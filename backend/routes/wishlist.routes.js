const express = require("express");

const {
  getWishlist,
  addToWishlist,
  removeFromWishlist
} = require("../controllers/wishlist.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getWishlist);

router.post("/add", addToWishlist);

router.delete(
  "/remove/:productId",
  removeFromWishlist
);

module.exports = router;