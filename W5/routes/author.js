const express = require('express');

const router = express.Router();

const { getAuthors, getAuthorById, createNewAuthor, deleteAuthor } = require('../controllers/author');

router.get('/:authorId', getAuthorById)
router.delete('/:authorId', deleteAuthor)

router.get('/', getAuthors);

router.use(express.json());

router.post('/', createNewAuthor)

module.exports = router;