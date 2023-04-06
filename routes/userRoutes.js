const router = require("express").Router();

// controllers :
const {
    userLogin,
    userRegister,
    verifyRegister
} = require('../controllers/userController');

router.post('/login', userLogin) // login user
router.post('/signup', userRegister) // register user
router.post('/signup/verify', verifyRegister) // send account activate code

module.exports = router;