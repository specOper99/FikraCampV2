const express = require('express');
const { body } = require('express-validator')

const router = express.Router();

const { login, signup } = require('../controllers/');


router.use(express.json());

router.post('/login',
    body('email').isEmail(),
    body('password').trim().isLength({ min: 8, max: 256 }),
    login)
router.post('/signup', signup);

module.exports = router;