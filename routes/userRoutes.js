const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router
	.route('/')
	.get(authController.protect, userController.getAllUsers)

router
	.route('/:id')
	.get(userController.getUser)
	.patch(authController.protect, userController.updateUser)
	.delete(authController.protect, userController.deleteUser);

module.exports = router;
