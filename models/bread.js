const mongoose = require('mongoose');

// const ingredientSchema = new mongoose.Schema({
//   name: String,
//   amount: String
// });

const breadSchema = new mongoose.Schema({
  name: String,
  hasIngred: Boolean,
  // ingredients: [ingredientSchema]
});



const Bread = mongoose.model("Bread", breadSchema); // create model

module.exports = Bread;