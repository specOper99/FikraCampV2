const { getBooks: getBooksModel, addBook, getBookById: getBookByIdModel, deleteBook: deleteBookModel, updateBook: updateBookModel } = require('../models/Book')

function getBooks(req, res, next) {
    res.json(getBooksModel());
}

function getBookById(req, res, next) {
    res.json(getBookByIdModel(req.params.bookId) ?? {
        message: "No book found"
    });
}

function deleteBook(req, res, next) {
    if (getBookByIdModel(req.params.bookId))
        return res.json(deleteBookModel(req.params.bookId));
    return res.json({ message: 'Book not found' });
}

function createNewBook(req, res, next) {
    const body = req.body;

    console.log(req.file);

    if (!body.title)
        return res.status(400).json({ message: "Your title is required" })
    if (body.title.length < 3)
        return res.status(400).json({ message: "Your title is too short" })
    if (!body.price)
        return res.status(400).json({ message: "Your price is required" })
    if (body.price < 0.99)
        return res.status(400).json({ message: "You price is too low" })
    if ((!body.authorId) || (isNaN(parseInt(body.authorId))))
        return res.status(400).json({ message: "Not valid author id" })

    res.json(addBook({ ...body, imagePath: req.file.path }));
}

function updateBook(req, res, next) {
    const body = req.body;

    if (body.title.length < 3)
        return res.status(400).json({ message: "Your title is too short" })
    if (body.price < 0.99)
        return res.status(400).json({ message: "You price is too low" })


    res.json(updateBookModel(req.params.BookId, body));
}

module.exports = {
    getBooks,
    getBookById,
    createNewBook,
    deleteBook,
    updateBook,
}