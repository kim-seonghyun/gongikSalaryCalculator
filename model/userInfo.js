const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

const userInfoSchema = new Schema({
  eslistmentDay: {
    type: Date,
    required: true,
  },
  foodExpenses: {
    type: Number,
    required: true,
  },
  transportationCost: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("UserInfo", userInfoSchema);
