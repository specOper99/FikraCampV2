const { books, addBook, findById } = require('../models/book')

function getBooks(req, res, next) {
    res.json(books);
}

function getBookById(req, res, next) {
    res.json(findById(req.params.bookId));
}



module.exports = {
    getBooks,
    getBookById,
}