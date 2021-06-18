import { NextFunction, Request, Response } from 'express';
import { responseGenerator } from '@util/responseGenerator';
import { SysAdmin, StaffAdmin, Staff, OrgUser, User } from '@user/controllers/userController';

const check = (userPerms, ref) => ref.every((v) => userPerms.includes(v));

const validateSysAdminPerms = (req: Request, res: Response, next: NextFunction) => {
	if (req.user!.permissions == undefined) {
		return res
			.status(400)
			.send({ ...responseGenerator(400, "You don't have the permissions to perform this action!") });
	}

	if (!check(req.user!.permissions, SysAdmin.permissions)) {
		return res
			.status(400)
			.send({ ...responseGenerator(400, "You don't have the permissions to perform this action!") });
	}

	next();
};

const validateStaffAdminPerms = (req: Request, res: Response, next: NextFunction) => {
	if (req.user!.permissions == undefined) {
		return res
			.status(400)
			.send({ ...responseGenerator(400, "You don't have the permissions to perform this action!") });
	}

	if (!check(req.user!.permissions, StaffAdmin.permissions)) {
		return res
			.status(400)
			.send({ ...responseGenerator(400, "You don't have the permissions to perform this action!") });
	}

	next();
};

const validateStaffPerms = (req: Request, res: Response, next: NextFunction) => {
	if (req.user!.permissions == undefined) {
		return res
			.status(400)
			.send({ ...responseGenerator(400, "You don't have the permissions to perform this action!") });
	}

	if (!check(req.user!.permissions, Staff.permissions)) {
		return res
			.status(400)
			.send({ ...responseGenerator(400, "You don't have the permissions to perform this action!") });
	}

	next();
};

const validateOrgUserPerms = (req: Request, res: Response, next: NextFunction) => {
	if (req.user!.permissions == undefined) {
		return res.status(400).send({ ...responseGenerator(400) });
	}

	if (!check(req.user!.permissions, OrgUser.permissions)) {
		return res.status(400).send({ ...responseGenerator(400) });
	}

	next();
};

const validateUserPerms = (req: Request, res: Response, next: NextFunction) => {
	console.log('halO!');
	if (req.user!.permissions == undefined) {
		return res.status(400).send({ ...responseGenerator(400) });
	}

	if (!check(req.user!.permissions, User.permissions)) {
		return res.status(400).send({ ...responseGenerator(400) });
	}

	next();
};

export { validateSysAdminPerms, validateStaffAdminPerms, validateStaffPerms, validateOrgUserPerms, validateUserPerms };
