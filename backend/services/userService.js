const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create user
exports.createUser = async (userData) => {
  const { name, email, password } = userData;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: hashedPassword
  });

  await newUser.save();
  return newUser;
};

// Get all users
exports.getAllUsers = async () => {
  return await User.find();
};
