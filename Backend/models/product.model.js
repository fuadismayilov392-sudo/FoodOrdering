const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  name: String,
  foodname: String,
  price: Number,
  imageUrl: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;