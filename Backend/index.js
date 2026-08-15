const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const productRouter = require('./routes/products.router');
const restaurantRouter = require('./routes/restaurant.router');
const authRouter = require('./routes/auth.router');

const uploadRouter = require('./routes/upload.router');

dotenv.config();

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // şəkilləri "göstərmək" üçün
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT;
app.use('/auth', authRouter);

app.use('/upload', uploadRouter);




// Routesler mildvarelerden sonra olur
app.use(productRouter);
app.use('/restaurants', restaurantRouter);


app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  mongoose.connect(process.env.DB_URL)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
});