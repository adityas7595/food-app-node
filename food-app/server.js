const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const { connectDB } = require("./config/dbConn");

//dotenv config
dotenv.config();

//DB Connection
connectDB();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to food app");
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, (req, res) => {
  console.log(`Server is running ${PORT}`);
});
