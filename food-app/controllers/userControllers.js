const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    user.password = undefined;
    res.status(200).send({
      message: "Success",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: "Error in get user API",
      success: false,
      error,
    });
  }
};

const getAllUserController = async (req, res) => {
  try {
    const user = await userModel.find({});
    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    user.password = undefined;
    res.status(200).send({
      message: "Success",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: "Error in get All user API",
      success: false,
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    const { userName, address, phone } = req.body;

    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    await user.save();
    res.status(200).send({
      data: user,
      success: true,
      message: "User Updated successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: "Error in update user API",
      success: false,
      error,
    });
  }
};

const resetPasswordControllers = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(404).send({
        message: "Please provide all fields.",
        success: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    let salt = bcrypt.genSaltSync(10);
    const hashPassowrd = await bcrypt.hash(newPassword, salt);
    user.password = hashPassowrd;
    await user.save();
    res.status(200).send({
      message: "Password reset Successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: "Error in reset password API",
      success: false,
      error,
    });
  }
};

const updatePassswordControllers = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        message: "User not found.",
        success: false,
      });
    }
    const { password, newPassword } = req.body;
    if (!password || !newPassword) {
      return res.status(404).send({
        message: "Please provide old or new password.",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).send({
        message: "Invalid old password.",
        success: false,
      });
    }

    let salt = bcrypt.genSaltSync(10);
    const hashPassowrd = await bcrypt.hash(newPassword, salt);
    user.password = hashPassowrd;
    await user.save();
    res.status(200).send({
      message: "Password Updated successfully.",
      success: false,
    });
  } catch (error) {
    console.log(error);

    res.status(404).send({
      error,
      message: "Error in Update password API.",
      success: false,
    });
  }
};

const deleteUserControllers = async (req, res) => {
  try {
    await userModel.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).send({
      message: "User account deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(404).send({
      error,
      message: "Error in delete user API.",
      success: false,
    });
  }
};

module.exports = {
  getUserController,
  getAllUserController,
  updateUserController,
  resetPasswordControllers,
  updatePassswordControllers,
  deleteUserControllers,
};
