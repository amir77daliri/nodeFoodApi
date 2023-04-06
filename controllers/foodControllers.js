const appRoot = require('app-root-path');

const Restaurants = require('../models/restaurant');
const foodValidator = require('../validators/foodValidator')


// fetch all foods :
exports.getAllFood = async (req, res) => {
    try {
        const restaurant = await Restaurants.findById(req.user._id);
        if(!restaurant) {
            return res.status(404).send("رستوران یافت نشد")
        }
        res.status(200).send(restaurant.foods);
    } catch (error) {
        res.status(500).send("خطا در سرور، دوباره تلاش کنید")
    }
}

// Add food for restaurant : 
exports.addFood = async (req, res) => {
    try {
        let photo = req.file;
        const uploadPath = `${appRoot}/public/uploads/food_photos/${photo.filename}`
        req.body = {...req.body, photo} 
        console.log("req.body : ", req.body)
        const restaurant = await Restaurants.findById(req.user._id);
        await(foodValidator.validate(req.body, {abortEarly: false}));
        const {name, price, description=''} = {...req.body}
        restaurant.foods.push({name, price, description, photo: photo.filename})
        await restaurant.save();
        res.status(201).send({
            message: "غذا با موفقیت اضافه شد",
            food: restaurant.foods[restaurant.foods.length - 1]
        })
    } catch (err) {
        res.status(400).send(err.errors)
    }
}


// delete food : 
exports.deleteFood = async (req, res) => {
    try {
        const foodId = req.params.foodId;
        const restaurant = await Restaurants.findById(req.user._id);
        if(!restaurant) {
            return res.status(404).send("رستوران یافت نشد")
        }
        const foodIndex = restaurant.foods.findIndex(food => {
            return food._id == foodId;
        })
        restaurant.foods.splice(foodIndex, 1);
        await restaurant.save()
        res.status(200).send(restaurant.foods)
    } catch (error) {
        res.status(500).send("خطا در پردازش اطلاعات")
    }
}
