const express = require("express");

const upload =
  require("../middleware/upload.middleware");

const {
  uploadImage
} = require(
  "../controllers/upload.controller"
);

const authMiddleware =
  require("../middleware/auth.middleware");

const adminMiddleware =
  require("../middleware/admin.middleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  uploadImage
);

module.exports = router;