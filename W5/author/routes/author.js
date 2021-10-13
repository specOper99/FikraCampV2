const express = require('express');

const router = express.Router();

const { getAuthors, getAuthorById, createNewAuthor, deleteAuthor, updateAuthor } = require('../controllers/author');
const isAdmin = require('../../middlewares/isAdmin');

router.get('/:authorId', getAuthorById)
router.delete('/:authorId', deleteAuthor)

router.get('/', getAuthors);

router.use(express.json());

router.post('/',
    isAdmin,
    createNewAuthor)
router.put('/:authorId', updateAuthor);

module.exports = router;