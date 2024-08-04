// controllers/userController.js
const UserModel = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const registerUser = async (req, res) => {
  try {
    const { name, email, password, city, age } = req.body;

    // Check password requirements
    if (!isValidPassword(password)) {
      return res.status(400).json({ error: 'Invalid password format' });
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      city,
      age,
    });

    // Save the user to the database
    const registeredUser = await newUser.save();

    res.status(200).json({ msg: 'The new user has been registered', registeredUser });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to register user' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Check if the password is correct
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, { expiresIn: '2m' });
    const refreshToken = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, { expiresIn: '5m' });

    res.status(200).json({ msg: 'Login successful!', token, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to login' });
  }
};

const logoutUser = async (req, res) => {
  try {
    // Implement user logout logic (optional, as tokens are stateless)
    res.status(200).json({ msg: 'User has been logged out' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to logout user' });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    // Create a new access token
    const newToken = jwt.sign({ user: { id: decoded.user.id } }, process.env.JWT_SECRET, { expiresIn: '2m' });

    res.status(200).json({ newToken });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to refresh token' });
  }
};

// Helper function to check password requirements
const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
};
