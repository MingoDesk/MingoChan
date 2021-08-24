import { validateStaffAdminPerms } from '@middleware/validatePermissions';
import { secured as validateSession } from '@middleware/validateSession';
import { Router } from 'express';
import { createOrganisation } from './controllers/createOrganisation';
import { getOrganisation } from './controllers/getOrganisation';
import { getOrganisations } from './controllers/getOrganisations';
import { validate } from './controllers/organisationController';
import { updateOrganisation } from './controllers/updateOrganisation';

const router: Router = Router();

// Create a new organisation of users | only staffAdmin's can do this

router.post('/new', validateSession, validateStaffAdminPerms, validate('/new'), createOrganisation);
router.patch('/update', validateSession, validateStaffAdminPerms, validate('/update'), updateOrganisation);
router.get('/organisation/:id', validateSession, validateStaffAdminPerms, getOrganisation);
router.get('/', validateSession, validateStaffAdminPerms, getOrganisations);

export default router;
