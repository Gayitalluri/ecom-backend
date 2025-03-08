const mongoose = require("mongoose")

const product = new mongoose.Schema({
    name:String,
    price:String,
    description:String,
    image:String,
    stock:Number,

})
module.exports = mongoose.model("product collection", product)