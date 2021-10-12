const jwt = require('jsonwebtoken');

function isAuth(req, res, next) {
    if (!req.headers['authorization'])
        return res.json({ message: 'Authorization token is required' });

    const token = req.headers['authorization'].split(' ')[1];
    try {
        jwt.verify(token, `${process.env.secret}`);
        next()
    } catch (error) {
        res.json({ message: "Token is invalid" });
    }
}

module.exports = isAuth