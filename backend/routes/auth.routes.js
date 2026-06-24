const express = require("express");

const {
  register,
  login,
  getCurrentUser
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");

const validate = require("../middleware/validate.middleware");

const {
  registerSchema,
  loginSchema
} = require("../validations/auth.validation");

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  register
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.get(
  "/me",
  authMiddleware,
  getCurrentUser
);

module.exports = router;