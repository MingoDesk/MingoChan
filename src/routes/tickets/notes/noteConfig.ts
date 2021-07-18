import { Router } from 'express';
import { createNote } from './controllers/createNote';
import { editNote } from './controllers/editNote';
import { validate } from './controllers/noteController';
import { secured as validateSession } from '@middleware/validateSession';
import { validateStaffPerms, validateSysAdminPerms } from '@middleware/validatePermissions';

const router = Router();

router.patch('/new', validateSession, validateStaffPerms, validate('note'), createNote);
router.patch('/edit', validateSession, validateSysAdminPerms, validate('editNote'), editNote);

export default router;
