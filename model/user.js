const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userInfo: { type: Schema.Types.ObjectId, ref: "userInfo" },
});

module.exports = mongoose.model("User", userSchema);
