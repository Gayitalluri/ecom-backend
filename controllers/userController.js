const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const registerUser = async (req,res) => {
  const { name, email, password } = req.body;
    const existing =await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
};


  
  // User Login
  const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
    res.json({ message: "Login successful", token });
  };
module.exports = { registerUser, loginUser };
