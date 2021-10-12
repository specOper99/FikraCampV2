const express = require('express');

const router = express.Router();

const { login, signup } = require('../controllers/');


router.use(express.json());

router.post('/login', login)
router.post('/signup', signup);

module.exports = router;