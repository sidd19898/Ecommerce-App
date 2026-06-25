const Review = require("../models/Review");
const Product = require("../models/Product");

const updateAverageRating = async (
  productId
) => {

  const reviews =
    await Review.find({
      product: productId
    });

  if (!reviews.length) {

    await Product.findByIdAndUpdate(
      productId,
      {
        averageRating: 0
      }
    );

    return;
  }

  const total =
    reviews.reduce(
      (sum, review) =>
        sum + review.rating,
      0
    );

  const average =
    total / reviews.length;

  await Product.findByIdAndUpdate(
    productId,
    {
      averageRating: average
    }
  );
};

const createReview = async (
  req,
  res
) => {

  try {

    const {
      productId,
      rating,
      comment
    } = req.body;

    const existingReview =
      await Review.findOne({
        user: req.userId,
        product: productId
      });

    if (existingReview) {
      return res.status(400).json({
        message:
          "Review already exists"
      });
    }

    const review =
      await Review.create({
        user: req.userId,
        product: productId,
        rating,
        comment
      });

    await updateAverageRating(
      productId
    );

    res.status(201).json(review);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const getReviews = async (
  req,
  res
) => {

  try {

    const reviews =
      await Review.find({
        product:
          req.params.productId
      }).populate(
        "user",
        "name _id"
      );

    res.json(reviews);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const updateReview = async (
  req,
  res
) => {

  try {

    const review =
      await Review.findById(
        req.params.reviewId
      );

    if (!review) {
      return res.status(404).json({
        message:
          "Review not found"
      });
    }

    if (
      review.user.toString() !==
      req.userId
    ) {
      return res.status(403).json({
        message:
          "Access denied"
      });
    }

    review.rating =
      req.body.rating ??
      review.rating;

    review.comment =
      req.body.comment ??
      review.comment;

    await review.save();

    await updateAverageRating(
      review.product
    );

    res.json(review);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const deleteReview = async (
  req,
  res
) => {

  try {

    const review =
      await Review.findById(
        req.params.reviewId
      );

    if (!review) {
      return res.status(404).json({
        message:
          "Review not found"
      });
    }

    if (
      review.user.toString() !==
      req.userId
    ) {
      return res.status(403).json({
        message:
          "Access denied"
      });
    }

    const productId =
      review.product;

    await review.deleteOne();

    await updateAverageRating(
      productId
    );

    res.json({
      message:
        "Review deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  createReview,
  getReviews,
  updateReview,
  deleteReview
};