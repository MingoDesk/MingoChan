import { Request, Response } from 'express';
import { responseGenerator } from '../util/responseGenerator';
import { SysAdmin, StaffAdmin, Staff, OrgUser, User } from '../routes/user/controllers/userController';

const check = (userPerms, ref) => ref.every((v) => userPerms.includes(v));

const validateSysAdminPerms = (req: Request, res: Response) => {
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
};

const validateStaffAdminPerms = (req: Request, res: Response) => {
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
};

const validateStaffPerms = (req: Request, res: Response) => {
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
};

const validateOrgUserPerms = (req: Request, res: Response) => {
	if (req.user!.permissions == undefined) {
		return res.status(400).send({ ...responseGenerator(400) });
	}

	if (!check(req.user!.permissions, OrgUser.permissions)) {
		return res.status(400).send({ ...responseGenerator(400) });
	}
};

const validateUserPerms = (req: Request, res: Response) => {
	if (req.user!.permissions == undefined) {
		return res.status(400).send({ ...responseGenerator(400) });
	}

	if (!check(req.user!.permissions, User.permissions)) {
		return res.status(400).send({ ...responseGenerator(400) });
	}
};

export { validateSysAdminPerms, validateStaffAdminPerms, validateStaffPerms, validateOrgUserPerms, validateUserPerms };
