const NodeCache = require('node-cache');

const User = require('../models/User');
const bcrypt = require('bcrypt');

const sendCode = require('../utils/sendCode');


// my cache :
const cacheCode = new NodeCache({stdTTL: 2*60*60, checkperiod:60*60})

// handle login
exports.userLogin = async (req, res) => {
    const {mobile, password} = {...req.body}
    if(!mobile || !password) {
        return res.status(400).send("شماره موبایل و رمز عبور خود را وارد کنید.")
    }
    try {
        const user = await User.findOne({mobile});
        if(!user || user?.is_active===false) {
            return res.status(404).send("کاربری با این مشخصات یافت نشد")
        }
        const matchPasswords = await bcrypt.compare(password, user.password);
        if(!matchPasswords) {
            return res.status(404).send("کاربری با این مشخصات یافت نشد")
        }
        const token = user.generateAuthToken();
        res.status(200).send({
            message: "ورود با موفقیت انجام شد",
            token
        })
    } catch (error) {
        res.status(400).send(error)
    }
};

// handle sign up :
exports.userRegister = async (req, res) => {
    // check inputs :
    try {
        await User.userValidation(req.body);
    } catch (err) {
        return res.status(400).send(err.errors);
    }

    const {fullname= 'کاربر عادی', mobile, password} = {...req.body};
    
    // sign up progress 
    try {
        let user = await User.findOne({mobile});
        if(!user ) {
            user = await User.create({fullname, mobile, password})
        }

        if(user.is_active) {
            return res.status(400).send("کاربری با این شماره تلفن از قبل موجود است")
        }

        // senc account activate code to user mobile number
        const code = sendCode(mobile)
        console.log(code)
        // cache code for check later :
        cacheCode.set(mobile, code, 2*60*60);

        res.status(200).send("کد تایید برای شماره شما ارسال شد. ")
    } catch (error) {
        res.send(error)
    }
}

exports.verifyRegister = async (req, res) => {
    const {mobile, code} = {...req.body}
    if(!mobile || !code) {
        return res.status(400).send("شماره موبایل به همراه کد تایید را وارد کنید");
    }
    const cachedCode = cacheCode.get(mobile);
    if(!cachedCode || (cachedCode !== code)) {
        return res.status(400).send("کد وارد شده نادرست و یا منقضی شده است!")
    }
    try {
        let user = await User.findOne({mobile})
        if(!user) {
            return res.status(400).send("کد وارد شده نادرست و یا منقضی شده است!")
        }
        user.is_active = true
        await user.save()
        return res.status(200).send("حساب کاربری با موفقیت فعال شد.")
    } catch (error) {
        res.status(500).send(error)
    }
}


// shopping actions -->

exports.addFactor = async (req, res) => {
    const {restaurantId, foods, totalPrice} = {...req.body};
    if(!foods) {
        return res.status(400).send("سبد خرید نباید خالی باشد.")
    }
    if(!restaurantId || !totalPrice) {
        return res.status(400).send("اطلاعات ارسالی ناقص است، شناسه رستوران و مبلغ فاکتور را ارسال کنید.")
    }

    
}
