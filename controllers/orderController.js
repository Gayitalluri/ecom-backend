const Order = require("../models/order");
const Product = require("../models/product");

// 📌 Place an Order
const placeOrder = async (req, res) => {
  try {
    const { products, totalAmount } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in the order" });
    }

    const newOrder = new Order({
      user: req.user._id,
      products,
      totalAmount,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
};

// 📌 Get All Orders (Admin Only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("products.product", "name price");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

// 📌 Get User's Orders (Customer)
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("products.product", "name price");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user orders", error: error.message });
  }
};

// 📌 Update Order Status (Admin Only)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { orderStatus: status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error: error.message });
  }
};

// 📌 Delete Order (Admin Only)
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error: error.message });
  }
};

module.exports = { placeOrder, getAllOrders, getUserOrders, updateOrderStatus, deleteOrder };
