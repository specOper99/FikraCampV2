const express = require('express');

const router = express.Router();

const { getAuthors, getAuthorById, createNewAuthor, deleteAuthor, updateAuthor } = require('../controllers/author');

router.get('/:authorId', getAuthorById)
router.delete('/:authorId', deleteAuthor)

router.get('/', getAuthors);

router.use(express.json());

router.post('/', createNewAuthor)
router.put('/:authorId', updateAuthor);

module.exports = router;