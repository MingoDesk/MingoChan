import { Response, Router, Request } from 'express';
import { verifyUser } from '../../middleware/verifyUser';

const router = Router();

router.post('/logout', verifyUser, async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .send({ success: false, msg: 'Failed to logout, please try again!', err });
    }
    return res
      .clearCookie(process.env.SID)
      .status(200)
      .send({ success: true, msg: "You've been logged out. Hope to see you soon!" });
  });
});

export default router;
