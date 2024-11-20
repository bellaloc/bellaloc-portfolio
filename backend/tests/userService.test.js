// test/userService.test.js

const mongoose = require('mongoose');
const User = require('../models/userModel');
const userService = require('../services/userService');

// Mock mongoose methods
jest.mock('mongoose');
jest.mock('../models/userModel');

describe('userService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get all users', async () => {
    const mockUsers = [{ username: 'testuser', email: 'test@example.com' }];
    User.find.mockResolvedValue(mockUsers);

    const users = await userService.getAllUsers();
    expect(users).toEqual(mockUsers);
  });

  it('should create a new user', async () => {
    const mockUserData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password',
    };

    const newUser = { ...mockUserData, _id: new mongoose.Types.ObjectId() };
    User.prototype.save.mockResolvedValue(newUser);

    const createdUser = await userService.createUser(mockUserData);
    expect(createdUser).toEqual(newUser);
  });

  it('should get user by ID', async () => {
    const mockUser = { username: 'testuser', email: 'test@example.com' };
    User.findById.mockResolvedValue(mockUser);

    const user = await userService.getUserById(mockUser._id);
    expect(user).toEqual(mockUser);
  });
});
