const Restaurants = require('../models/restaurant');


exports.getRestaurantsList = async (req, res) => {
    try {
        const restaurants = await Restaurants.find().limit(10).select("_id name description score address photo");
        res.send(restaurants)
    } catch (err) {
        console.log(err);
    }
};

exports.getRestaurant = async (req, res) => {
    try {
        const id = req.params.id;
        const restaurantData = await Restaurants.findById(id).select("-adminPassword")
        if(!restaurantData) {
            res.status(404).send("یافت نشد!");
        }
        res.send(restaurantData);
    } catch (err) {
        console.log(err)
    }
}

exports.createRestaurant = async (req, res) => {
    
    try {
        await Restaurants.Validation(req.body)
        const {name, description, address='', adminUsername, adminPassword} = req.body
        const restaurant = await Restaurants.create({name, description, address, adminUsername, adminPassword})
        res.send({adminPassword: _, ...restaurant})
        
    } catch (err) {
        res.status(400).send(err.errors);
    }
}

exports.updateRestaurant = async (req, res) => {

    try {
        const id = req.params.id;
        await Restaurants.Validation(req.body);
        const {name, description, address='', adminUsername, adminPassword} = req.body;
        const restaurant = await Restaurants.findByIdAndUpdate(id, {
            $set: {name, description, address, adminUsername, adminPassword}
        }, {new: true});
        if(!restaurant) {
            return res.status(500).send("خطای سرور در ویرایش اطلاعات");
        }
        res.send(restaurant)
    } catch (error) {
        return res.status(400).send("اطلاعات ورودی نادرست است!");
    }
}


exports.deleteRestaurant = async (req, res) => {
    try {
        const id = req.params.id;
        await Restaurants.findByIdAndDelete(id)
        res.status(204).send();
    } catch (error) {
        res.status(404).send("رستوران با آیدی مورد نظر یافت نشد.")
    }
}