const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

const userInfoSchema = new Schema({
  eslistmentDay: {
    type: Date,
    required: true,
  },
  foodExpenses: {
    type: Number,
    min:2000,
    max:10000,
    required: true,
  },
  transportationCost: {
    type: Number,
    min:2000,
    max:10000,
    required: true,
  },
  restDay: {
    type: Number,
  }
});

module.exports = mongoose.model("UserInfo", userInfoSchema);
