const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

// Public routes
router.post('/register', userController.createUser);
router.get('/', authenticateToken, userController.getUsers);

module.exports = router;
