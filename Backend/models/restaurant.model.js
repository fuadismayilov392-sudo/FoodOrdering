const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    CompanyName: String, 
    logo: String,
    openTime: String,
    raiting: Number,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;