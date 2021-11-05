import { json, Router } from 'express';

const router = Router();

import { getAuthors, getAuthorById, createNewAuthor, deleteAuthor, updateAuthor } from '../controllers/author';
import isAdmin from '../../middlewares/isAdmin';

router.get('/:authorId', getAuthorById)
router.delete('/:authorId', deleteAuthor)

router.get('/', getAuthors);

router.use(json());

router.post('/',
    isAdmin,
    createNewAuthor)
router.put('/:authorId', updateAuthor);

export default router;