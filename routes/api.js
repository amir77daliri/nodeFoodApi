const router = require("express").Router();
const restaurantRoutes = require('./restaurantRoutes')

// App Api Routes :
router.use('/restaurant', restaurantRoutes);


module.exports = router;



