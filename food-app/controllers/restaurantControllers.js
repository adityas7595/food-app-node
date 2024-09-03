const restaurantModel = require("../models/restaurantModel");

const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please provide all details.",
      });
    }

    const newRestaurant = await restaurantModel.create({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    res.status(200).send({
      success: true,
      message: "Restaurant Created successfully.",
      newRestaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create restaurant API",
      error,
    });
  }
};

const getAllRestController = async (req, res) => {
  try {
    const getAllRestaurant = await restaurantModel.find({});
    if (!getAllRestaurant) {
      return res.status(500).send({
        success: false,
        message: "Restaurant not found",
      });
    }
    res.status(200).send({
      totalCount: getAllRestaurant.length,
      data: getAllRestaurant,
      success: true,
      message: "Success.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all restaurant API",
      error,
    });
  }
};

const getRestController = async (req, res) => {
  try {
    const restaurantID = req.params.id;
    const restaurant = await restaurantModel.findById({ _id: restaurantID });
    if (!restaurant) {
      return res.status(500).send({
        success: false,
        message: "Restaurant not found.",
      });
    }

    res.status(200).send({
      data: restaurant,
      message: "Success.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get restaurant API",
      error,
    });
  }
};

const deleteController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "No restaurant found or provide restaurant ID.",
      });
    }

    await restaurantModel.findByIdAndDelete({
      _id: restaurantId,
    });

    res.status(200).send({
      success: true,
      message: "Restaurant Deleted Successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in delete restaurant API.",
      error,
    });
  }
};

module.exports = {
  createRestaurantController,
  getAllRestController,
  getRestController,
  deleteController,
};
