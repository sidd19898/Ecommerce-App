const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getSearchSuggestions
} = require("../controllers/product.controller");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const validate = require("../middleware/validate.middleware");

const {
  productSchema
} = require("../validations/product.validation");

const router = express.Router();

router.get("/", getProducts);

router.get(
  "/suggestions",
  getSearchSuggestions
);

router.get("/:id", getProductById);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(productSchema),
  createProduct
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(productSchema),
  updateProduct
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);

module.exports = router;