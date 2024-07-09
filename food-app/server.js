const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnect");
const Router = require("./routes/authRoutes");

// dotenv config
dotenv.config();

// DB Connect
connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
// app.get("/", (req, res) => {
//   return res.status(200).send(`<h1>Welcome to food server</h1>`);
// });

app.use("/api/v1/auth", Router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
  console.log(`Server is starting on port ${PORT}`);
});
