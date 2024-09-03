const express = require("express");
const authMiddlewares = require("../middlewares/authMiddlewares");
const {
  createRestaurantController,
  getAllRestController,
  getRestController,
  deleteController,
} = require("../controllers/restaurantControllers");
const router = express.Router();

//Create new restaurant
router.post("/create", authMiddlewares, createRestaurantController);

//Get all restaurant data
router.get("/getAllRest", getAllRestController);

//Get all restaurant data
router.get("/getRest/:id", getRestController);

//Delete Restaurant
router.delete("/delete/:id", authMiddlewares, deleteController);

module.exports = router;
