const mongoose = require("mongoose");

const order = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    products : [{
        product :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : true
    },
        quantity: { type: Number, required: true },
    }],
    totalAmount : {type : Number,required : true },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" }, // Change to String
     orderStatus: { type: String, enum: ["Processing", "Shipped", "Delivered"], default: "Processing" }, 
    createdAt : {type : Date, defaut: Date.now}
})

module.exports = mongoose.model("Order Collection", order)