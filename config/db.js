const mongoose = require("mongoose")

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGOURL,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log("MONGO CONNECTED") 
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
}

module.exports = connect