import { Router } from 'express';
import { createTicket } from './controllers/createTicket';
import { getTicket } from './controllers/getTicket';
import { replyTicket } from './controllers/replyTicket';
import { getUnassignedTickets } from './controllers/getUnassignedTickets';
import { getAssignedTickets } from './controllers/getAssignedTickets';
import { validate } from './controllers/ticketController';
import { secured as validateSession } from '../../middleware/validateSession';
import noteRouter from './notes/noteConfig';

const router = Router();

//@ts-ignore
router.post('/new', validateSession, validate('createTicket'), createTicket);
//@ts-ignore
router.patch('/reply', validateSession, validate('replyTicket'), replyTicket);
router.get('/:id', validateSession, getTicket);
router.get('/unassigned/feed', getUnassignedTickets);
router.get('/assigned/feed', getAssignedTickets);
router.use('/notes', noteRouter);

export default router;
