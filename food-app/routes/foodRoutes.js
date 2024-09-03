const express = require("express");
const authMiddlewares = require("../middlewares/authMiddlewares");
const { createFoodController } = require("../controllers/foodControllers");
const router = express.Router();

router.post("/create", authMiddlewares, createFoodController);

module.exports = router;
