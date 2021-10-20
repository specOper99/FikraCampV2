const { getAuthors: getAuthorsModel, addAuthor, getAuthorById: getAuthorByIdModel, deleteAuthor: deleteAuthorModel, updateAuthor: updateAuthorModel } = require('../models/author')

function getAuthors(req, res, next) {
    getAuthorsModel().then(authors => res.json(authors));
}

function getAuthorById(req, res, next) {
    getAuthorByIdModel(req.params.authorId).then(authors =>
        res.status(authors ? 200 : 404).json(authors ?? {
            message: "No author found"
        }));
}

function deleteAuthor(req, res, next) {
    if (getAuthorByIdModel(req.params.authorId))
        return res.json(deleteAuthorModel(req.params.authorId));
    return res.json({ message: 'Author not found' });
}

async function createNewAuthor(req, res, next) {
    const body = req.body;

    if (!body.name)
        return res.status(400).json({ message: "Your name is required" })
    if (body.name.length < 3)
        return res.status(400).json({ message: "Your name is too short" })
    if (!body.age)
        return res.status(400).json({ message: "Your age is required" })
    if (body.age < 15)
        return res.status(400).json({ message: "You are too young" })
    if (!body.email)
        return res.status(400).json({ message: "Your email is required" })
    if ((body.email.length < 3) || (body.email.indexOf("@") === -1))
        return res.status(400).json({ message: "Your email is invalid" })
    if (!body.password)
        return res.status(400).json({ message: "Your password is required" })
    if (body.password.length < 8)
        return res.status(400).json({ message: "Your password is too short" })

    await addAuthor(body).then(author => {
        res.json(author);
    })
}

function updateAuthor(req, res, next) {
    const body = req.body;

    if ((body.name) && (body.name.length < 3))
        return res.status(400).json({ message: "Your name is too short" })
    if ((body.age) && (body.age < 15))
        return res.status(400).json({ message: "You are too young" })
    if ((body.password) && (body.password.length < 8))
        return res.status(400).json({ message: "Your password is too short" })


    res.json(updateAuthorModel(req.params.authorId, body));
}

module.exports = {
    getAuthors,
    getAuthorById,
    createNewAuthor,
    deleteAuthor,
    updateAuthor,
}