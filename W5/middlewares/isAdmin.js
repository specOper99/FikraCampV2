function isAdmin(req, res, next) {
    if (!req.userPrivileges)
        return res.json({ message: 'You are not authorized to create new authors' });
    next();
}

module.exports = isAdmin