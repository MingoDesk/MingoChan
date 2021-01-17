import { getDB } from "../../database/db";
import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  verifyRegistrationInput,
  IReturnRegistrationInput,
  IReturnError,
} from "./helpers/verifyUserInput";

const router = Router();

interface IUserInput {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

// @TODO Add email verification

router.post("/client/register", async (req: Request, res: Response) => {
  const { email, password, name, phoneNumber }: IUserInput = req.body;

  try {
    const input: IReturnRegistrationInput | IReturnError = await verifyRegistrationInput(
      email,
      password,
      name,
      phoneNumber
    );

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(input.password, salt);

    const newUser = await getDB().users.insertOne({
      name: input.name,
      password: hashPassword,
      email: input.email,
      phoneNumber: input.phoneNumber,
      emailVerified: false,
      verifiedCustomer: false,
    });

    return res.status(200).send({
      success: true,
      message: `Sucess, you have now registered! We will verify these details and your account shortly ${
        newUser.ops[0].name.split(" ")[0]
      }.`,
      user: {
        email: newUser.ops[0].email,
        name: newUser.ops[0].name,
      },
    });
  } catch (error) {
    return res.status(400).send({ success: false, error });
  }
});

export default router;
