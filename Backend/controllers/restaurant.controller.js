const Restaurant = require('../models/restaurant.model');

const restaurantController = {
  getAll: async (req, res) => {
    try {
      const restaurants = await Restaurant.find();
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getOne: async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.id);
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      res.json(restaurant);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  post: async (req, res) => {
    try {
      const { CompanyName, logo, openTime, rating } = req.body;
      const newRestaurant = new Restaurant({ CompanyName, logo, openTime, rating });
      await newRestaurant.save();
      res.status(201).json(newRestaurant);
    }  catch (error) {
  console.error('Error creating restaurant:', error);   // BUNU ƏLAVƏ ET
  res.status(500).json({ error: 'Internal Server Error' });
}
  },

  patch: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedRestaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      res.json(updatedRestaurant);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
      if (!deletedRestaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      res.json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = restaurantController;
