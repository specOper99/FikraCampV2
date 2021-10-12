const express = require('express');

const router = express.Router();

const { getBooks, getBookById, createNewBook, deleteBook, updateBook } = require('../controllers/Book');

router.get('/:bookId', getBookById)
router.delete('/:bookId', deleteBook)

router.get('/', getBooks);

router.use(express.json());

router.post('/', createNewBook)
router.put('/:bookId', updateBook);

module.exports = router;