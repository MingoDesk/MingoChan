import {
  verifyEmail,
  verifyPassword,
  IReturnError,
  IReturnEmail,
  IReturnPassword,
} from "./verifyUserInput";

interface ILoginInput {
  email: IReturnError | IReturnEmail;
  password: IReturnError | IReturnPassword;
}

const verifyLoginInput = async (_email: string, _password: string): Promise<ILoginInput> => {
  return new Promise(async (resolve, reject) => {
    try {
      const email = await verifyEmail(_email);
      const password = await verifyPassword(_password);
      //@ts-ignore
      return resolve({ email: email.email, password: password.password });
    } catch (error) {
      console.error("Catch in verifyLoginInput");
      console.error(error);
      return reject({
        error: "Email or password was incorrect",
        msg: "Email or password was incorrect",
      });
    }
  });
};

export { verifyLoginInput };
