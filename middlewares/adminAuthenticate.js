const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Restaurants = require('../models/restaurant');


const adminAuthenticate = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).send("شما مجوز لازم برای این کار را ندارید!")
    }
    try {
        const user = jwt.verify(token, process.env.jwtPrivateKey);
        req.user = user;
    } catch (err) {
        return res.status(401).send("توکن اشتباه است و یا منقضی شده است.")
    }

    // secure view by checking Admin password $$ username:
    try {
        const restaurant = await Restaurants.findOne({adminUsername: req.user.username})
        if(!restaurant) {
            res.status(404).send("ادمین یا رستوران مورد نظر یافت نشد!")
        }
        if(restaurant.adminPassword === req.user.password && restaurant.adminUsername === req.user.username) {
            return next()
        }
        res.status(404).send("ادمین یا رستوران مورد نظر موجود نیست!")
    } catch (error) {
        res.status(500).send("خطا در پردازش اطلاعات. دوباره امتحان کنید")
    }
}


module.exports = adminAuthenticate;