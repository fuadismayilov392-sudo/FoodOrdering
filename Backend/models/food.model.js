const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    FoodName: String,
    Price: Number,
    imageUrl: String,
    description: String,
    restaurantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    }
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;