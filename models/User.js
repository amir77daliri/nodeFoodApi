const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userValidationSchema = require('../validators/userValidator');


const factorSchema = mongoose.Schema({
    restaurantId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurants"
    },
    foods : [
        {
            name: String,
            foodId: String,
            price: Number
        }
    ],
    totalPrice: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
        default: "کاربر عادی"
    },
    mobile: {
        type: String,
        maxLength: 11,
        unique: true,
        required: true
    },
    password : {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 255
    },
    role: {
        type: String,
        enum : ['user', 'admin', 'superUser'],
        default: 'user'
    },
    is_active: {
        type: Boolean,
        default: false
    },

    carts: [factorSchema]

})



// set jwt token for logined user:
userSchema.methods.generateAuthToken = function () {
    const data = {
        _id: this._id,
        mobile: this.mobile,
        password: this.adminPassword,
        role: this.role
    }
    
    return jwt.sign(data, process.env.jwtPrivateKey)
}

userSchema.statics.userValidation = function(body) {
    return userValidationSchema.validate(body, {abortEarly: false})
}

userSchema.pre("save", async function(next) {
    let user = this;
    if(!user.isModified('password')) return next();
    try {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        next();
    } catch (err) {
        return next(err);
    }
})


module.exports = mongoose.model("Users", userSchema);