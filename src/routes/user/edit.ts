import { getDB } from '../../database/db';
import { Router, Response, Request } from 'express';
import { verifyUser } from '../../middleware/verifyUser';
import { verifyPassword, IReturnPassword } from './helpers/verifyUserInput';
import bcrypt from 'bcrypt';
import { userEditBodyBuilder, IReturnBBuilder } from './helpers/bodyBuilder';
import { ObjectId } from 'mongodb';

const router = Router();

// TODO: Just fix the final bug lol

router.post('/edit', verifyUser, async (req: Request, res: Response) => {
  const _name: string = req.body.name;
  const _password: string = req.body.password;
  let body: IReturnBBuilder;

  const salt = await bcrypt.genSalt(10);

  let returnPassword: IReturnPassword;

  if (_password || _name.length > 0) {
    const name: string = _name.trim();

    try {
      returnPassword = await verifyPassword(_password);
    } catch (error) {
      console.error(error);
      return res.status(400).send({ success: false, ...error });
    }

    const password: string = await bcrypt.hash(returnPassword.password, salt);

    body = await userEditBodyBuilder({ name, password });
    const user = await getDB().users.findOneAndUpdate(
      { _id: new ObjectId(req.session.user!._id) },
      body,
      {
        returnOriginal: false,
      }
    );
    console.log(user);
    if (!user || user.ok !== 1 || user.value == null)
      return res.status(400).send({
        success: false,
        error: 'Bad request',
        msg: 'Something went wrong, probably due to bad data',
      });

    // @ts-ignore
    return res.status(200).send({ success: true, data: { name: user.ops[0].name } });
  } else if (_name && !_password) {
    const name: string = _name.trim();

    body = await userEditBodyBuilder({ name });

    const user = await getDB().users.findOneAndUpdate({ _id: req.session.user!._id }, body, {
      returnOriginal: false,
    });
    if (!user || user.ok !== 1 || user.value == null)
      return res.status(400).send({
        success: false,
        error: 'Bad request',
        msg: 'Something went wrong, probably due to bad data',
      });

    // @ts-ignore
    return res.status(200).send({ success: true, data: { name: user.ops[0].name } });
  } else if (!_name && _password) {
    try {
      returnPassword = await verifyPassword(_password);
    } catch (error) {
      console.error(error);
      return res.status(400).send({ success: false, ...error });
    }

    const password: string = await bcrypt.hash(returnPassword.password, salt);

    body = await userEditBodyBuilder({ password });

    const user = await getDB().users.findOneAndUpdate({ _id: req.session.user!._id }, body, {
      returnOriginal: false,
    });

    if (!user || user.ok !== 1 || user.value == null)
      return res.status(400).send({
        success: false,
        error: 'Bad request',
        msg: 'Something went wrong, probably due to bad data',
      });

    // @ts-ignore
    return res.status(200).send({ success: true, msg: 'Success!' });
  }

  return res
    .status(400)
    .send({ success: false, error: 'Bad request', msg: 'Did not recive any proper data.' });
});

export default router;
