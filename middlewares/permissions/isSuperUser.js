const jwt = require('jsonwebtoken');

const User = require('../../models/User');

// authenticate super user
const isSuperUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).send("دسترسی به این امکان فقط برای مدیر سایت امکان پذیر است!")
    }
    try {
        const user = jwt.verify(token, process.env.jwtPrivateKey);
        if(user.role === 'superUser') {
            return next()
        }
        return res.status(401).send("شما مجوز لازم برای این کار را ندارید!")
    } catch (err) {
        return res.status(401).send("توکن اشتباه است و یا منقضی شده است.")
    }
    
}


module.exports = isSuperUser;