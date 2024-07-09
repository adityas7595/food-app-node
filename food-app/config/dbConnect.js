const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("Database connected Successfully.");
  } catch (error) {
    console.log("error==>", error);
  }
};

module.exports = connectDB;
