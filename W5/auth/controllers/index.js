const { addAuthor, getAuthorByCredentials } = require('../../author/models/author')
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { formatBodyErrorsResponse } = require('../../shared/formatResponse')

function login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: formatBodyErrorsResponse(errors) })
    }

    const body = req.body;

    const author = getAuthorByCredentials(body);

    if (!author)
        return res.status(404).json({ message: "No author with this credentials\nPlease signup!" })

    const token = jwt.sign({
        id: author.id,
        privileges: author.privileges,
    },
        `${process.env.secret}`,
        {
            expiresIn: 30 * 60,
        });
    res.json({
        id: author.id,
        token,
    });
}

async function signup(req, res, next) {
    const body = req.body;

    if (!body.email)
        return res.status(400).json({ message: "Your email is required" })
    if ((body.email.length < 3) || (body.email.indexOf("@") === -1))
        return res.status(400).json({ message: "Your email is invalid" })
    if (!body.password)
        return res.status(400).json({ message: "Your password is required" })
    if (body.password.length < 8)
        return res.status(400).json({ message: "Your password is too short" })
    if (!body.name)
        return res.status(400).json({ message: "Your name is required" })
    if (body.name.length < 3)
        return res.status(400).json({ message: "Your name is too short" })
    if (!body.age)
        return res.status(400).json({ message: "Your age is required" })
    if (body.age < 15)
        return res.status(400).json({ message: "You are too young" })

    res.json(await addAuthor(body));
}

module.exports = {
    login,
    signup,
}