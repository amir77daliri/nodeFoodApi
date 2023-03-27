const router = require("express").Router();

const {
    addFood,
    getAllFood,
    deleteFood
} = require('../controllers/foodControllers');

const adminAuthenticate = require('../middlewares/adminAuthenticate');

router.get('/get-all', adminAuthenticate , getAllFood) // Get foods of restaurant
router.post('/add', adminAuthenticate , addFood) // Add food for restaurant
router.delete('/delete/:foodId', adminAuthenticate , deleteFood) // delete food from restaurant


module.exports = router;