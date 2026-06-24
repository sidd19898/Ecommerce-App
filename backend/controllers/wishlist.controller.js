const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

const getWishlist = async (req, res) => {
  try {

    const wishlist =
      await Wishlist.findOne({
        user: req.userId
      }).populate("products");

    res.json(wishlist);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const addToWishlist = async (
  req,
  res
) => {

  try {

    const { productId } = req.body;

    const product =
      await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    let wishlist =
      await Wishlist.findOne({
        user: req.userId
      });

    if (!wishlist) {

      wishlist =
        await Wishlist.create({
          user: req.userId,
          products: []
        });

    }

    const exists =
      wishlist.products.includes(productId);

    if (!exists) {

      wishlist.products.push(productId);

      await wishlist.save();

    }

    res.json(wishlist);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const removeFromWishlist = async (
  req,
  res
) => {

  try {

    const wishlist =
      await Wishlist.findOne({
        user: req.userId
      });

    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist not found"
      });
    }

    wishlist.products =
      wishlist.products.filter(
        product =>
          product.toString() !==
          req.params.productId
      );

    await wishlist.save();

    res.json(wishlist);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist
};