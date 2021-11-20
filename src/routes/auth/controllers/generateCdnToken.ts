import { getDB } from '@database/db';
import { responseGenerator } from '@util/responseGenerator';
import { Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import { IMessage, ITicket } from '@tickets/controllers/ticketController';
import jwt from 'jsonwebtoken';
import { check } from '@middleware/validatePermissions';
import { Staff, StaffAdmin, SysAdmin } from '@routes/user/controllers/userController';
import { ObjectId } from 'bson';

const shouldSeeTicket = (req: Request, ticket: ITicket): boolean => {
	if (!req.user) return false;

	if (
		check(req.user.permissions, SysAdmin.permissions) ||
		check(req.user.permissions, StaffAdmin.permissions) ||
		check(req.user.permissions, Staff.permissions)
	) {
		return true;
	}
	return ticket.authorId.toString() === req.user._id.toString();
};

export const generateCdnToken = async (req: Request, res: Response): Promise<any> => {
	const errors = validationResult(req);
	const inputData = matchedData(req);

	if (!errors.isEmpty()) {
		return res.status(400).send({
			success: false,
			msg: 'Bad request',
			errors: errors.array(),
		});
	}

	const ticketId = new ObjectId(inputData.ticketId);

	const ticketExists = await getDB().tickets.findOne({
		_id: ticketId,
	});

	if (!ticketExists) {
		return res.status(400).send({
			...responseGenerator(400, 'There is no such ticket'),
		});
	}

	if (!shouldSeeTicket(req, ticketExists)) {
		return res.status(500).send({
			...responseGenerator(
				500,
				"I don't know how you got here, but you did. Stop getting here please :)",
			),
		});
	}

	const messageIds: string[] = [];

	ticketExists.messages.forEach((message: IMessage) => {
		messageIds.push(message.id);
	});

	if (!messageIds.length) return res.status(500).send({ ...responseGenerator(500) });

	const token = jwt.sign(
		{
			ticketId: ticketExists._id,
			messageIds,
			authorId: ticketExists.authorId,
		},
		process.env.SIGNING_SECRET,
		{
			expiresIn: '30m',
		},
	);

	return res.status(200).send({ success: true, msg: 'sucess', data: { token } });
};
