import { HTTP_STATUS } from '../util/http-status';
import { Request, Response } from 'express';
import { responseGenerator } from '@util/response-generator';


export const handle404 = (_req: Request, res: Response) => res.status(HTTP_STATUS.NOT_FOUND.code).send({ ...responseGenerator(HTTP_STATUS.NOT_FOUND.code) });
