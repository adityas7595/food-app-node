const express = require("express");
const registerController = require("../controllers/authControllers");
const Router = express.Router();

Router.post("/register", registerController);
module.exports = Router;
