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

const router = Router();

// @ts-ignore create a ticket
router.post('/new', validateSession, validate('createTicket'), createTicket);
// @ts-ignore reply to a ticket
router.patch('/reply', validateSession, validate('replyTicket'), replyTicket);

// Get specific ticket
router.get('/:id', validateSession, getTicket);

// Feeds
router.get('/unassigned/feed', validateSession, getUnassignedTickets);
router.get('/assigned/feed', validateSession, getAssignedTickets);
router.get('/authored', validateSession, getUserAuthoredTickets);

// Notes
router.use('/notes', noteRouter);

export default router;
