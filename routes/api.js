const router = require("express").Router();
const restaurantRoutes = require('./restaurantRoutes')
const foodRoutes = require('./foodRoutes');
const userRoutes = require('./userRoutes');

// App Api Routes :
router.use('/restaurant/foods', foodRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/users', userRoutes);


module.exports = router;



