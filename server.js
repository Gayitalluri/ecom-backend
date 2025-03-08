const express = require("express")
const cors = require("cors")
const connect = require("./config/db")
require("dotenv").config("./.env")

const app = express();
app.use(express.json())
app.use(cors());

const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoute");
const orderRoutes = require("./routes/orderRoute");


app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => res.send("E-Shop Express API Running"));

connect();
const PORT = process.env.PORT

app.listen(PORT, ()=>{
console.log(`Server is running on ${PORT}`)    
})