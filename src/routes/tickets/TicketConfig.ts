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
import {
	validateStaffPerms,
	validateOrgUserPerms,
	validateUserPerms,
	validateStaffAdminPerms,
	validateSysAdminPerms,
} from '@middleware/validatePermissions';

const router = Router();

// create a ticket

router.post(
	'/new',
	validateSession,
	validateUserPerms,
	// @ts-ignore
	validate('createTicket'),
	createTicket,
);
// @ts-ignore reply to a ticket
router.patch('/reply', validateSession, validateUserPerms, validate('replyTicket'), replyTicket);

// Get specific ticket
router.get('/:id', validateSession, validateUserPerms, getTicket);

// eslint-disable-next-line
// @ts-ignore
router.patch('/assignee', validateSession, validateStaffPerms, validate('assignTicket'), assignTicket);

// eslint-disable-next-line
router.patch(
	'/satisfaction',
	validateSession,
	validateUserPerms,
	// @ts-ignore
	validate('ticketSatisfaction'),
	leaveTicketSatisfaction,
);

// Feeds
router.get('/unassigned/feed', validateSession, validateStaffPerms, getUnassignedTickets);
router.get('/assigned/feed', validateSession, validateStaffPerms, getAssignedTickets);

// The tickets you have created
router.get('/authored', validateSession, validateUserPerms, getUserAuthoredTickets);

// Notes
router.use('/notes', noteRouter);

export default router;
