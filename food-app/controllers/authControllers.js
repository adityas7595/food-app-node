const userModels = require("../models/userModels");

const registerController = async (req, res) => {
  try {
    const { userName, email, password, address, phone, usertype, profile } =
      req.body;
    if (!userName || !email || !password || !address || !phone) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    let userExist = await userModels.findOne({ email });
    if (userExist) {
      return res.status(500).send({
        success: false,
        message: "User already exits.",
      });
    }

    const user = await userModels.create({
      userName,
      email,
      password,
      address,
      phone,
      usertype,
      profile,
    });
    res.status(201).send({
      success: true,
      message: "Registered Successfully.",
      data: user,
    });
  } catch (error) {
    console.log("error======>", error);
    return res.status(500).send({
      success: false,
      message: "Error in register API",
    });
  }
};

module.exports = registerController;
