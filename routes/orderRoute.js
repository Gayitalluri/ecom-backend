const express = require("express");
const { placeOrder, getAllOrders, getUserOrders, updateOrderStatus, deleteOrder } = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// 📌 Place an Order (Authenticated Users Only)
router.post("/", protect, placeOrder);

// 📌 Get Logged-in User's Orders (Authenticated Users)
router.get("/myorders", protect, getUserOrders);

// 📌 Get All Orders (Admin Only)
router.get("/", protect, getAllOrders);

// 📌 Update Order Status (Admin Only)
router.put("/:id", protect, updateOrderStatus);

// 📌 Delete an Order (Admin Only)
router.delete("/:id", protect, deleteOrder);

module.exports = router;
