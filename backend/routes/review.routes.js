const express = require("express");

const {
  createReview,
  getReviews,
  updateReview,
  deleteReview
} = require("../controllers/review.controller");

const authMiddleware = require("../middleware/auth.middleware");

const validate = require("../middleware/validate.middleware");

const {
  reviewSchema
} = require("../validations/review.validation");

const router = express.Router();

router.get("/:productId", getReviews);

router.post(
  "/",
  authMiddleware,
  validate(reviewSchema),
  createReview
);

router.put(
  "/:reviewId",
  authMiddleware,
  validate(reviewSchema),
  updateReview
);

router.delete(
  "/:reviewId",
  authMiddleware,
  deleteReview
);

module.exports = router;