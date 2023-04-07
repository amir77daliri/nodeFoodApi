const jwt = require('jsonwebtoken');


// authenticate user
const isAuthenticate = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).send("ابتدا وارد سایت شوید.")
    }
    try {
        const user = jwt.verify(token, process.env.jwtPrivateKey);
        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).send("توکن اشتباه است و یا منقضی شده است.")
    }
}


module.exports = isAuthenticate;