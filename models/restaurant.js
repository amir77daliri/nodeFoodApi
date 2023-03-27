const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const restaurantValidator = require('../validators/restaurantValidator');
const restaurantAdminValidator = require('../validators/loginValidator');


// Embedded Documents

const commentSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    score: Number
})


const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price : {
        type: String,
        required: true
    },
    score: Number,
    photo: String,
    comments: [commentSchema]
})


const restaurantShema = mongoose.Schema({
    adminUsername: {
        type: String,
        required: true,
    },
    adminPassword: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 100
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        maxLength: 200
    },
    description: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0,
    },
    photo: {
        type: String,
    },
    address : String,
    comments: [commentSchema],
    foods: [foodSchema]

})


restaurantShema.statics.Validation = function (data) {
    return restaurantValidator.validate(data, {abortEarly: false});
}

restaurantShema.statics.adminValidation = function (data) {
    return restaurantAdminValidator.validate(data, {abortEarly: false});
}

// set jwt token for admin:
restaurantShema.methods.generateAuthToken = function () {
    const data = {
        _id: this._id,
        username: this.adminUsername,
        role: "restaurant"
    }
    
    return jwt.sign(data, process.env.jwtPrivateKey)
}



restaurantShema.pre("save", async function(next) {
    let restaurant = this;
    if(!restaurant.isModified('adminPassword')) return next()
    try {
        const hash = await bcrypt.hash(restaurant.adminPassword, 10);
        restaurant.adminPassword = hash;
        next()
    } catch (error) {
        return next(error)
    }
})


module.exports = mongoose.model("Restaurants", restaurantShema);