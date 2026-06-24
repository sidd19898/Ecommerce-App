const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      user: req.userId
    }).populate("items.product");

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const addToCart = async (req, res) => {

  try {

    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    let cart = await Cart.findOne({
      user: req.userId
    });

    if (!cart) {

      cart = await Cart.create({
        user: req.userId,
        items: []
      });

    }

    const existingItem =
      cart.items.find(
        item =>
          item.product.toString() === productId
      );

    if (existingItem) {

      existingItem.quantity += quantity;

    } else {

      cart.items.push({
        product: productId,
        quantity
      });

    }

    await cart.save();

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const updateCart = async (req, res) => {

  try {

    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({
      user: req.userId
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    const item = cart.items.find(
      item =>
        item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found"
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const removeFromCart = async (
  req,
  res
) => {

  try {

    const cart = await Cart.findOne({
      user: req.userId
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    cart.items = cart.items.filter(
      item =>
        item.product.toString() !==
        req.params.productId
    );

    await cart.save();

    res.json(cart);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const clearCart = async (req, res) => {

  try {

    const cart = await Cart.findOne({
      user: req.userId
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    cart.items = [];

    await cart.save();

    res.json({
      message: "Cart cleared"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart
};