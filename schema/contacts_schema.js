const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  age: { type: String, required: false },
  address: { type: String, required: true },
  image_url: { type: String },
  createdAt: { type: Date },
  updateAt: { type: Date },
});

module.exports = mongoose.model("ContactSchema", contactSchema);
