import { Router } from "express";
import { getDB } from "../../database/db";
import bcrypt from "bcrypt";
import { verifyLoginInput } from "./helpers/verifyLoginInput";
import { ReqCtx } from "../../@types/res";

const router = Router();

router.post("/login", async (req: ReqCtx, res) => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    const input = await verifyLoginInput(email, password);

    const data = await getDB().users.findOne({ email: input.email });
    if (!data)
      return res.status(400).send({
        error: "Email or password was incorrect",
        msg: "Email or password was incorrect",
      });

    const validPass = await bcrypt.compare(input.password, data.password);
    if (!validPass)
      return res.status(400).send({
        error: "Email or password was incorrect",
        msg: "Email or password was incorrect",
      });

    req.session.user = { isLoggedIn: true, ...data };
    return res
      .status(200)
      .send({ success: true, msg: `Welcome ${req.session.user.name.split(" ")[0]}!` });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      error: "Email or password was incorrect",
      msg: "Email or password was incorrect",
    });
  }
});

export default router;
