const foodModels = require("../models/foodModels");

const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvaiable,
      restaurant,
      rating,
    } = req.body;
    if (!title || !description || !price || !restaurant) {
      return res.status(404).send({
        success: false,
        message: "Please provide all fields.",
        error,
      });
    }

    const newFood = new foodModels({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvaiable,
      restaurant,
      rating,
    });
    await newFood.save();
    res.status(200).send({
      success: true,
      message: "Food Created Successfully.",
      newFood,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in add food API.",
      error,
    });
  }
};

module.exports = { createFoodController };
