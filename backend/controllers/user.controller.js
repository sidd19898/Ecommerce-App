const User = require("../models/User");

const addAddress = async (req, res) => {
  try {

    const user = await User.findById(req.userId);

    user.addresses.push(req.body);

    await user.save();

    res.status(201).json(user.addresses);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const getAddresses = async (req, res) => {
  try {

    const user = await User.findById(req.userId);

    res.json(user.addresses);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const updateAddress = async (req, res) => {
  try {

    const user = await User.findById(req.userId);

    const address = user.addresses.id(
      req.params.id
    );

    if (!address) {
      return res.status(404).json({
        message: "Address not found"
      });
    }

    Object.assign(address, req.body);

    await user.save();

    res.json(address);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const deleteAddress = async (req, res) => {
  try {

    const user = await User.findById(req.userId);

    const address = user.addresses.id(
      req.params.id
    );

    if (!address) {
      return res.status(404).json({
        message: "Address not found"
      });
    }

    address.deleteOne();

    await user.save();

    res.json({
      message: "Address deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const getProfile = async (req, res) => {
  try {

    const user = await User.findById(
      req.userId
    ).select("-password");

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


const updateProfile = async (
  req,
  res
) => {

  try {

    const user = await User.findById(
      req.userId
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.name =
      req.body.name ?? user.name;

    user.email =
      req.body.email ?? user.email;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


module.exports = {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  getProfile,
  updateProfile
};