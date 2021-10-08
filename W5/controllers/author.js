const { authors, addAuthor } = require('../models/author')

function getAuthors(req, res, next) {
    // req.data is valid
    addAuthor()
    res.json(authors);
}

function getAuthorById(req, res, next) {
    res.json(authors.find(author => author.id == req.params.authorId) ?? {
        message: "No author found"
    });
}

module.exports = {
    getAuthors,
    getAuthorById,
}