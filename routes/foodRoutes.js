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

const adminAuthenticate = require('../middlewares/adminAuthenticate');

router.get('/all', adminAuthenticate , getAllFood) // Get foods of restaurant
router.post('/add', [adminAuthenticate, upload.single("photo")] , addFood) // Add food for restaurant
router.delete('/delete/:foodId', adminAuthenticate , deleteFood) // delete food from restaurant


module.exports = router;