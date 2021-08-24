import { Router } from 'express';
import { createTicket } from './controllers/createTicket';
import { getTicket } from './controllers/getTicket';
import { replyTicket } from './controllers/replyTicket';
import { getUnassignedTickets } from './controllers/getUnassignedTickets';
import { getAssignedTickets } from './controllers/getAssignedTickets';
import { validate } from './controllers/ticketController';
import { secured as validateSession } from '../../middleware/validateSession';
import noteRouter from './notes/noteConfig';
import { getUserAuthoredTickets } from './controllers/getUserAuthoredTickets';
import { assignTicket } from './controllers/assignTicket';
import { leaveTicketSatisfaction } from './controllers/leaveTicketSatisfaction';
import { validateStaffPerms, validateUserPerms } from '@middleware/validatePermissions';
import { updateTicketStatus } from './controllers/updateTicketStatus';

const router = Router();

router.post('/new', validateSession, validateUserPerms, validate('createTicket'), createTicket);
router.patch('/reply', validateSession, validateUserPerms, validate('replyTicket'), replyTicket);
router.get('/:id', validateSession, validateUserPerms, getTicket);
router.patch('/assignee', validateSession, validateStaffPerms, validate('assignTicket'), assignTicket);
router.patch('/status', validateSession, validateStaffPerms, validate('updateTicketStatus'), updateTicketStatus);

router.patch(
	'/satisfaction',
	validateSession,
	validateUserPerms,
	validate('ticketSatisfaction'),
	leaveTicketSatisfaction,
);
router.get('/unassigned/feed', validateSession, validateStaffPerms, getUnassignedTickets);
router.get('/assigned/feed', validateSession, validateStaffPerms, getAssignedTickets);
router.get('/authored/feed', validateSession, validateUserPerms, getUserAuthoredTickets);
router.use('/notes', noteRouter);

export default router;
