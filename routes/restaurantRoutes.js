const router = require("express").Router();

// controllers :
const {
    getRestaurantsList, 
    getRestaurant, 
    createRestaurant, 
    updateRestaurant, 
    deleteRestaurant
} = require('../controllers/restauranController')



// restaurant routes : CRUD 
router.get('/all', getRestaurantsList) // rest list
router.post('/add', createRestaurant) // create new restaurant
router.put('/edit/:id', updateRestaurant) // update restaurant info
router.delete('/delete/:id', deleteRestaurant) // delete restaurant
router.get('/:id', getRestaurant) // restaurant detail

module.exports = router;