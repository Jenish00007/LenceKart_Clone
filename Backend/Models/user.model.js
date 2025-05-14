const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, require: true },
  password: { type: String, require: true },
  ph_no: Number
}, {
  timestamps: true  // This will add createdAt and updatedAt fields
});

const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel,
};
