const express = require("express");
const authMiddlewares = require("../middlewares/authMiddlewares");
const {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  getFoodByRestController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
} = require("../controllers/foodControllers");
const router = express.Router();

//Create Food
router.post("/create", authMiddlewares, createFoodController);

//Get all Food
router.get("/getAll", authMiddlewares, getAllFoodController);

//Get all Food
router.get("/get/:id", authMiddlewares, getFoodByIdController);

//Get Food by restaurant
router.get("/getByRest/:id", authMiddlewares, getFoodByRestController);

//Update Food
router.post("/update/:id", authMiddlewares, updateFoodController);

//Delete Food
router.delete("/delete/:id", authMiddlewares, deleteFoodController);

//Place Food Order
router.post("/placeorder", authMiddlewares, placeOrderController);

module.exports = router;
