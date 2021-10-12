const { getAuthors: getAuthorsModel, addAuthor, getAuthorById: getAuthorByIdModel, deleteAuthor: deleteAuthorModel, updateAuthor: updateAuthorModel } = require('../models/author')

function getAuthors(req, res, next) {
    res.json(getAuthorsModel());
}

function getAuthorById(req, res, next) {
    res.json(getAuthorByIdModel(req.params.authorId) ?? {
        message: "No author found"
    });
}

function deleteAuthor(req, res, next) {
    if (getAuthorByIdModel(req.params.authorId))
        return res.json(deleteAuthorModel(req.params.authorId));
    return res.json({ message: 'Author not found' });
}

function createNewAuthor(req, res, next) {
    const body = req.body;

    if (!body.name)
        return res.status(400).json({ message: "Your name is required" })
    if (body.name.length < 3)
        return res.status(400).json({ message: "Your name is too short" })
    if (!body.age)
        return res.status(400).json({ message: "Your age is required" })
    if (body.age < 15)
        return res.status(400).json({ message: "You are too young" })


    res.json(addAuthor(body));
}

function updateAuthor(req, res, next) {
    const body = req.body;

    if ((body.name) && (body.name.length < 3))
        return res.status(400).json({ message: "Your name is too short" })
    if ((body.age) && (body.age < 15))
        return res.status(400).json({ message: "You are too young" })


    res.json(updateAuthorModel(req.params.authorId, body));
}

module.exports = {
    getAuthors,
    getAuthorById,
    createNewAuthor,
    deleteAuthor,
    updateAuthor,
}