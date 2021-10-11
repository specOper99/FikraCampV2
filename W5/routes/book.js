const express = require('express');

const router = express.Router();

const { getBooks, getBookById } = require('../controllers/book');


router.get('/:bookId', getBookById)

router.get('/', getBooks);



module.exports = router