// services/userService.js

const User = require('../models/userModel');

// Get all users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error('Unable to fetch users');
  }
};

// Create a new user
const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error('Unable to create user');
  }
};

// Get user by ID
const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    throw new Error('Unable to fetch user');
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
};
