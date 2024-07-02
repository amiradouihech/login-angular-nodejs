const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth');

router.post(
    '/signup',
    [
        body('name').trim().not().isEmpty(),
        body('email').isEmail().withMessage('Please enter a valid email.')
            .custom(async (email) => {
                const user = await User.find(email);
                if (user[0].length > 0) {
                    return Promise.reject('Email address already exists!');
                }
            })
            .normalizeEmail(),
        body('password').trim().isLength({ min: 7 })
    ],
    authController.signup // Utilisez le contrôleur pour gérer l'inscription
);

router.post(
    '/login',
    authController.login // Utilisez le contrôleur pour gérer la connexion
);

module.exports = router;
