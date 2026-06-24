const express = require("express");

const {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  getProfile,
  updateProfile
} = require("../controllers/user.controller");

const authMiddleware = require("../middleware/auth.middleware");

const validate = require("../middleware/validate.middleware");

const {
  addressSchema
} = require("../validations/address.validation");

const router = express.Router();

router.use(authMiddleware);

router.get("/profile", getProfile);

router.put("/profile", updateProfile);

router.post(
  "/address",
  validate(addressSchema),
  addAddress
);

router.get("/address", getAddresses);

router.put(
  "/address/:id",
  validate(addressSchema),
  updateAddress
);

router.delete(
  "/address/:id",
  deleteAddress
);

module.exports = router;