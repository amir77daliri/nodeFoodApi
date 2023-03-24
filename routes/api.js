const router = require("express").Router();
const restaurantRoutes = require('./restaurantRoutes')

// App Api Routes :
router.use('/restaurant', restaurantRoutes);


module.exports = router;


//? next Time :
// TODO : edit update controller
// TODO : check create controller && hash password
// TODO : return errors better 
// TODO : return errors better 