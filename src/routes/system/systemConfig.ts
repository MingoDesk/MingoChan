import { Router } from 'express';
import { updateSystemSettingsRoute } from './controllers/updateSystemSettings';
import { getSystemSettings } from './controllers/getSystemSettings';
import { validate } from './controllers/systemsController';
import { secured as validateSession } from '../../middleware/validateSession';

const router = Router();

router.get('/', getSystemSettings);
//@ts-ignore
router.patch('/update', validateSession, validate('update'), updateSystemSettingsRoute);

export default router;
