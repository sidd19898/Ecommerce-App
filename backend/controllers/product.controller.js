const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      images,
    } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      images,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      minPrice,
      maxPrice,
    } = req.query;

    let query = {};

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
    }

    if (minPrice) {
      query.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query)
      .populate("category")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    ).populate("category");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSearchSuggestions = async (
  req,
  res
) => {

  try {

    const query = req.query.q;

    if (!query) {
      return res.json([]);
    }

    const products =
      await Product.find({
        name: {
          $regex: query,
          $options: "i"
        }
      })
      .select("name")
      .limit(10);

    const suggestions =
      products.map(
        product => product.name
      );

    res.json(suggestions);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getSearchSuggestions
};
