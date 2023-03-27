const router = require("express").Router();
const restaurantRoutes = require('./restaurantRoutes')
const foodRoutes = require('./foodRoutes');

// App Api Routes :
router.use('/restaurant/foods', foodRoutes);
router.use('/restaurants', restaurantRoutes);


module.exports = router;



