const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  CompanyName: String,
  FoodName: String,
  price: Number,
  imageUrl: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;