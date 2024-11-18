const mongoose = require('mongoose');

const breadSchema = new mongoose.Schema({
  name: String,
  isProofed: Boolean,
});

const Bread = mongoose.model("Bread", breadSchema); // create model

module.exports = Bread;