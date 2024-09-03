const express = require("express");
const authMiddlewares = require("../middlewares/authMiddlewares");
const {
  AddCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryControllers");
const router = express.Router();

router.post("/create", authMiddlewares, AddCategoryController);
router.post("/getAll", authMiddlewares, getAllCategoryController);
router.put("/update/:id", authMiddlewares, updateCategoryController);
router.delete("/delete/:id", authMiddlewares, deleteCategoryController);

module.exports = router;
