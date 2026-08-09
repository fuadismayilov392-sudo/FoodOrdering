const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant.controller');

router.get('/', restaurantController.getAll);
router.get('/:id', restaurantController.getOne);
router.post('/', restaurantController.post);
router.patch('/:id', restaurantController.patch);
router.delete('/:id', restaurantController.delete);

module.exports = router;