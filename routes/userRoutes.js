const router = require("express").Router();

// permissions :
const isAuthenticate = require('../middlewares/isAuthenticated');

// controllers :
const {
    userLogin,
    userRegister,
    verifyRegister,

    addFactor
} = require('../controllers/userController');

router.post('/login', userLogin) // login user
router.post('/signup', userRegister) // register user
router.post('/signup/verify', verifyRegister) // send account activate code

// shopping 
router.post('/add-factor', isAuthenticate, addFactor)


module.exports = router;