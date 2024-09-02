const express = require("express");
const {
  getUserController,
  updateUserController,
  resetPasswordControllers,
  updatePassswordControllers,
  deleteUserControllers,
} = require("../controllers/userControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");
const router = express.Router();

router.get("/getUser", authMiddlewares, getUserController);
router.post("/updateUser", authMiddlewares, updateUserController);
router.post("/resetPassword", authMiddlewares, resetPasswordControllers);
router.post("/updatePassword", authMiddlewares, updatePassswordControllers);
router.delete("/deleteUser/:id", authMiddlewares, deleteUserControllers);

module.exports = router;
