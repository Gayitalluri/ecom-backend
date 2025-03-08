const mongoose = require("mongoose")

const user = new mongoose.Schema({
    name:String,
    email:{type:String,required:true,unique:true},
    password: String,
    isAdmin: { type: Boolean, default: false },
})
module.exports = mongoose.model("usercollection",user )