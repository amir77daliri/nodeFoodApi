const router = require("express").Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/food_photos')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({storage: storage})


const {
    addFood,
    getAllFood,
    deleteFood
} = require('../controllers/foodControllers');

const isAdmin = require('../middlewares/permissions/isAdmin');

// this Actions are just for restaurant admin

router.get('/all', isAdmin , getAllFood) // Get foods of restaurant
router.post('/add', [isAdmin, upload.single("photo")] , addFood) // Add food for restaurant
router.delete('/delete/:foodId', isAdmin , deleteFood) // delete food from restaurant


module.exports = router;