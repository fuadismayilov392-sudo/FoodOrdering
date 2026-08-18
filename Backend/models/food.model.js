const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    FoodName: String,
    Price: Number,
    imageUrl: String,
    description: String,
    category: {
        type: String,
        enum: ['soup', 'salad', 'maincourse', 'deserts', 'drinks', 'snacks'],
        required: true,
    },
    restaurantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    }
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;