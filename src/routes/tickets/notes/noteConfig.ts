import { Router } from 'express';
import { createNote } from './controllers/createNote';
import { editNote } from './controllers/editNote';
import { validate } from './controllers/noteController';
import { secured as validateSession } from '../../../middleware/validateSession';

const router = Router();

//@ts-ignore
router.patch('/new', validateSession, validate('note'), createNote);

//@ts-ignore
// E
router.patch('/edit', validateSession, validate('editNote'), editNote);

export default router;
