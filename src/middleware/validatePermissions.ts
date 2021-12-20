import { NextFunction, Request, Response } from 'express';
import { responseGenerator } from '@util/responseGenerator';
import { SysAdmin, StaffAdmin, Staff, OrgUser, User } from '@user/controllers/userController';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const check = (userPerms: any, ref: any[]) => ref.every(v => userPerms.includes(v));

const validateSysAdminPerms = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.permissions) {
    return res
      .status(401)
      .send({ ...responseGenerator(401, "You don't have the permissions to perform this action!") });
  }

  if (!check(req.user.permissions, SysAdmin.permissions)) {
    return res
      .status(401)
      .send({ ...responseGenerator(401, "You don't have the permissions to perform this action!") });
  }

  next();
};

const validateStaffAdminPerms = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.permissions) {
    return res
      .status(401)
      .send({ ...responseGenerator(401, "You don't have the permissions to perform this action!") });
  }

  if (!check(req.user.permissions, StaffAdmin.permissions)) {
    return res
      .status(401)
      .send({ ...responseGenerator(401, "You don't have the permissions to perform this action!") });
  }

  next();
};

const validateStaffPerms = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.permissions) {
    return res
      .status(401)
      .send({ ...responseGenerator(401, "You don't have the permissions to perform this action!") });
  }

  if (!check(req.user.permissions, Staff.permissions)) {
    return res
      .status(401)
      .send({ ...responseGenerator(401, "You don't have the permissions to perform this action!") });
  }

  next();
};

const validateOrgUserPerms = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.permissions) {
    return res.status(401).send({ ...responseGenerator(401) });
  }

  if (!check(req.user.permissions, OrgUser.permissions)) {
    return res.status(401).send({ ...responseGenerator(401) });
  }

  next();
};

const validateUserPerms = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.permissions) {
    return res.status(401).send({ ...responseGenerator(401) });
  }

  if (!check(req.user.permissions, User.permissions)) {
    return res.status(401).send({ ...responseGenerator(401) });
  }

  next();
};

export { validateSysAdminPerms, validateStaffAdminPerms, validateStaffPerms, validateOrgUserPerms, validateUserPerms };
