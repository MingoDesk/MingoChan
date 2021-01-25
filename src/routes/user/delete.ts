import { Router, Response, Request } from 'express';
import { verifyUser } from '../../middleware/verifyUser';
import { getDB } from '../../database/db';
import { ObjectId } from 'mongodb';

const router = Router();

router.delete('/delete', verifyUser, async (req: Request, res: Response) => {
  const deleteUser = await getDB().users.findOneAndDelete({
    _id: new ObjectId(req.session.user!._id),
  });
  if (deleteUser.ok !== 1)
    return res
      .status(500)
      .send({ error: 'Failed to delete user', msg: 'Failed due to bad user information/session' });
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .send({ success: false, msg: 'Failed to logout, please try again!', err });
    }
    return res
      .clearCookie(process.env.SID)
      .status(200)
      .send({ success: true, msg: "We're sad to see you go!" });
  });
});

export default router;
