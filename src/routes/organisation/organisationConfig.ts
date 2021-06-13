import { validateStaffAdminPerms } from '@middleware/validatePermissions';
import { secured as validateSession } from '@middleware/validateSession';
import { Router } from 'express';
import { createOrganisation } from './controllers/createOrganisation';
import { validate } from './controllers/organisationController';

const router: Router = Router();

// Create a new organisation of users | only staffAdmin's can do this

//@ts-ignore
router.post('/new', validateSession, validateStaffAdminPerms, validate('new'), createOrganisation);

export default router;
