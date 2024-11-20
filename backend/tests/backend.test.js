const request = require('supertest');
const app = require('../app');
const User = require('../models/userModel');

describe('User Routes', () => {
  beforeAll(async () => {
    await User.deleteMany();  // Clear all users before tests
  });

  // Test POST /api/users/register
  it('should create a new user', async () => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123'
    };
    
    const res = await request(app).post('/api/users/register').send(user);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('name', 'John Doe');
    expect(res.body).toHaveProperty('email', 'johndoe@example.com');
  });

  // Test GET /api/users
  it('should get all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
