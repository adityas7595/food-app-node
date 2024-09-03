const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "category title is required."],
    },
    imageUrl: {
      type: String,
      default:
        "https://similarpng.com/good-food-logo-design-on-transparent-background-png/",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
