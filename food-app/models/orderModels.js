const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Preparing", "Prepare", "On the way", "Delivered"],
      default: "Preparing",
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Orders", orderSchema);
