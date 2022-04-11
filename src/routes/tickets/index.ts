import { Router } from 'express';
import { createTicket } from './create-ticket';
import { validate } from './ticket-validators';

const router = Router();

router.post('/tickets/create', validate('createTicket'), createTicket);

export default router;
