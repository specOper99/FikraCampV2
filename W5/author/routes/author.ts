import { json, Router } from 'express';

const router = Router();

import { getAuthors, getAuthorById, createNewAuthor, deleteAuthor, updateAuthor } from '../controllers/author';
import isAdmin from '../../middlewares/isAdmin';

router.get('/:authorId', getAuthorById)
router.get('/', getAuthors);

router.delete('/:authorId', deleteAuthor)

router.use(json());

// a hand written middleware for checking the permissions
router.use(isAdmin);

router.post('/',
    createNewAuthor)

router.put('/:authorId', updateAuthor);

export default router;