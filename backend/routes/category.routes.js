const express = require("express");

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require("../controllers/category.controller");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const validate = require("../middleware/validate.middleware");

const {
  categorySchema
} = require("../validations/category.validation");

const router = express.Router();

router.get("/", getCategories);

router.get("/:id", getCategoryById);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validate(categorySchema),
  updateCategory
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteCategory
);



router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validate(categorySchema),
  createCategory
);

module.exports = router;