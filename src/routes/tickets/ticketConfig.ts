import { Router } from 'express';
import { validateStaffPerms, validateUserPerms } from '@middleware/validatePermissions';
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
import { updateTicketStatus } from './controllers/updateTicketStatus';

const router = Router();

router.post('/new', validateSession, validateUserPerms, validate('createTicket'), createTicket);

router.get('/:id', validateSession, validateUserPerms, getTicket);
router.get('/unassigned/feed', validateSession, validateStaffPerms, getUnassignedTickets);
router.get('/assigned/feed', validateSession, validateStaffPerms, getAssignedTickets);
router.get(
  '/authored/feed/:userId',
  validateSession,
  validateUserPerms,
  validate('getUserAuthoredTickets'),
  getUserAuthoredTickets
);

router.patch('/reply', validateSession, validateUserPerms, validate('replyTicket'), replyTicket);
router.patch(
  '/assignee',
  validateSession,
  validateStaffPerms,
  validate('assignTicket'),
  assignTicket,
);
router.patch(
  '/status',
  validateSession,
  validateStaffPerms,
  validate('updateTicketStatus'),
  updateTicketStatus,
);
router.patch(
  '/satisfaction',
  validateSession,
  validateUserPerms,
  validate('ticketSatisfaction'),
  leaveTicketSatisfaction,
);

router.use('/notes', noteRouter);

export default router;
