const express = require('express');

const router = express.Router();

const { getAuthors,getAuthorById } = require('../controllers/author');

router.get('/:authorId', getAuthorById)
router.get('/', getAuthors);
// router.get('/', getAuthors)

module.exports = router;