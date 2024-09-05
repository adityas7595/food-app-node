const foodModels = require("../models/foodModels");
const orderModels = require("../models/orderModels");

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

const getAllFoodController = async (req, res) => {
  try {
    const getAllFood = await foodModels.find({});
    if (!getAllFood) {
      return res.status(404).send({
        success: false,
        message: "Food not found.",
      });
    }
    res.status(200).send({
      data: getAllFood,
      success: true,
      message: "Success.",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in get all food API.",
      error,
    });
  }
};

const getFoodByIdController = async (req, res) => {
  try {
    const getFood = await foodModels.findById({ _id: req.params.id });
    if (!getFood) {
      return res.status(404).send({
        success: false,
        message: "Food not found.",
      });
    }
    res.status(200).send({
      data: getFood,
      success: true,
      message: "Success.",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in get by id food API.",
      error,
    });
  }
};

const getFoodByRestController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Restaurant ID not found.",
      });
    }
    const getFood = await foodModels.find({ restaurant: restaurantId });
    if (!getFood) {
      return res.status(404).send({
        success: false,
        message: "Food not found in this restaurant.",
      });
    }
    res.status(200).send({
      data: getFood,
      success: true,
      message: "Success.",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in get food by restaurant food API.",
      error,
    });
  }
};

const updateFoodController = async (req, res) => {
  try {
    const FoodId = req.params.id;
    if (!FoodId) {
      return res.status(404).send({
        success: false,
        message: "Food ID not found.",
      });
    }
    const getFood = await foodModels.findById({ _id: FoodId });
    if (!getFood) {
      return res.status(404).send({
        success: false,
        message: "Food not found.",
      });
    }
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

    const updateFood = await foodModels.findByIdAndUpdate(
      FoodId,
      {
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
      },
      { new: true }
    );
    if (updateFood) {
      res.status(200).send({
        data: updateFood,
        success: true,
        message: "Food Updated Successfully.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in update food API.",
      error,
    });
  }
};

const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Food ID not found.",
      });
    }
    const food = await foodModels.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food not found.",
      });
    }
    await foodModels.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food Items deleted.",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in delete food API.",
      error,
    });
  }
};

const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      res.status(200).send({
        success: true,
        message: "Please provide food cart or payment method.",
      });
    }
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModels({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });

    await newOrder.save();

    res.status(200).send({
      success: true,
      message: "Order placed Successfully.",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "Error in Place order API.",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  getFoodByRestController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
};
