const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { userName, email, password, address, phone } = req.body;
    if (!userName || !email || !password || !phone || !address) {
      return res.status(500).send({
        success: false,
        message: "Please provide all details.",
      });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "This User already exists.",
      });
    }

    //Hash Password
    let salt = bcrypt.genSaltSync(10);
    const hashPassowrd = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      userName,
      email,
      password: hashPassowrd,
      address,
      phone,
    });

    if (user) {
      return res.status(201).send({
        success: true,
        message: "User added Successfully.",
        data: user,
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "User not added.",
      });
    }
  } catch (error) {
    console.log("error===>", error);
    return res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Missing email or password.",
      });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "user not found.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials.",
      });
    }

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    return res.status(201).send({
      success: true,
      message: "Login Successfully.",
      user,
      token,
    });
  } catch (error) {
    console.log("error===>", error);
    return res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
