// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/userController');

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/logout', UserController.logoutUser);
router.get('/refreshtoken', UserController.refreshToken);

module.exports = router;
