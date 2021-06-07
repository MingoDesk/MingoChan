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
import { checkSysAdminPermissions } from '../../middleware/permissions';
import { authorizeAccessToken } from '../../middleware/checkAuthToken';

const router = Router();

// @ts-ignore create a ticket
router.post(
	'/new',
	validateSession,
	authorizeAccessToken,
	checkSysAdminPermissions,
	// @ts-ignore
	validate('createTicket'),
	createTicket,
);
// @ts-ignore reply to a ticket
router.patch('/reply', validateSession, validate('replyTicket'), replyTicket);

// Get specific ticket
router.get('/:id', validateSession, getTicket);

// eslint-disable-next-line
// @ts-ignore
router.patch('/assignee', validate('assignTicket'), assignTicket);

// eslint-disable-next-line
// @ts-ignore
router.patch('/satisfaction', validate('ticketSatisfaction'), leaveTicketSatisfaction);

// Feeds
router.get('/unassigned/feed', validateSession, getUnassignedTickets);
router.get('/assigned/feed', validateSession, getAssignedTickets);
router.get('/authored', validateSession, getUserAuthoredTickets);

// Notes
router.use('/notes', noteRouter);

export default router;
