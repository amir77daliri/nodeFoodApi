const router = require("express").Router();

// controllers :
const {
    getRestaurantsList, 
    getRestaurant, 
    createRestaurant, 
    updateRestaurant, 
    deleteRestaurant,
    adminLogin,
} = require('../controllers/restauranController')

// permissions :
const isSuperUser = require('../middlewares/permissions/isSuperUser');


// restaurant routes : CRUD 
router.get('/all', getRestaurantsList) // rest list
router.post('/add', isSuperUser, createRestaurant) // create new restaurant
router.put('/edit/:id', isSuperUser, updateRestaurant) // update restaurant info
router.delete('/delete/:id', isSuperUser, deleteRestaurant) // delete restaurant
router.post('/admin/login', adminLogin) // restaurant detail
router.get('/:id', getRestaurant) // restaurant detail


module.exports = router;