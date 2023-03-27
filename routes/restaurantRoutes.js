const router = require("express").Router();

// controllers :
const {
    getRestaurantsList, 
    getRestaurant, 
    createRestaurant, 
    updateRestaurant, 
    deleteRestaurant,
    adminLogin
} = require('../controllers/restauranController')



// restaurant routes : CRUD 
router.get('/all', getRestaurantsList) // rest list
router.post('/add', createRestaurant) // create new restaurant
router.post('/admin/login', adminLogin) // restaurant detail
router.put('/edit/:id', updateRestaurant) // update restaurant info
router.delete('/delete/:id', deleteRestaurant) // delete restaurant
router.post('/admin/login', getRestaurant) // restaurant detail
router.get('/:id', getRestaurant) // restaurant detail

module.exports = router;