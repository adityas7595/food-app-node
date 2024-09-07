const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
  const user = await userModel.findById(req.body.id);

  if (user.userType !== "admin") {
    return res.status(500).send({
      success: false,
      message: "Only Admin have access.",
    });
  } else {
    next();
  }
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Un-authroized User.",
      error,
    });
  }
};
