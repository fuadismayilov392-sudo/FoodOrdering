const Product = require('../models/food.model');

const productController = {
    getAll :  async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},

    getByRestaurant: async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const products = await Product.find({ restaurantId });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by restaurant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},

getByCategory: async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},

   post: async (req, res) => {
  try {
    const { FoodName, Price, imageUrl, description,category, restaurantId } = req.body;
    const newProduct = new Product({ FoodName, Price, imageUrl, description,category, restaurantId });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
  console.error('Error creating restaurant:', error);  
  res.status(500).json({ error: 'Internal Server Error' });
}
},

    patch :  async (req, res) => {
  try {
    const { id } = req.params;   
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},

    delete : async (req, res) => {
      try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
      } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
}

module.exports = productController;
