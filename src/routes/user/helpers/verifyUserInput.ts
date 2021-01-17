import parsePhoneNumberFromString, { PhoneNumber } from "libphonenumber-js";
import { getDB } from "../../../database/db";

const emailReg: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface IReturnError {
  error: string;
  message: string;
}

interface IReturnPassword {
  password: string;
  error: null;
}

interface IReturnEmail {
  email: string;
  error: null;
}

export interface IReturnRegistrationInput {
  email: string;
  name: string;
  password: string;
  phoneNumber: PhoneNumber;
}

export interface IReturnRegistrationInputError {
  email: null;
  name: null;
  password: null;
  phoneNumber: null;
}

const verifyPassword = (_password: string): Promise<IReturnError | IReturnPassword> => {
  return new Promise((resolve, reject) => {
    const password = _password.trim();
    if (password.length < 6 || password.length > 128)
      return reject({
        error: "Password failed validation",
        message: "Password must be at least 6 characters long and a maximum of 128 characters",
      });
    resolve({ password, error: null });
  });
};

const verifyEmail = (_email: string): Promise<IReturnError | IReturnEmail> => {
  return new Promise(async (resolve, reject) => {
    const email = _email.toLocaleLowerCase().trim();
    const emailExist = await getDB().users.findOne({ email });

    if (emailExist)
      return reject({
        error: "Email already exists",
        message: "There is already an account with that email.",
      });

    if (emailReg.test(email) !== true || email.length < 3) {
      return reject({
        error: "Email failed validation",
        message: "Email wasn't valid, please try again.",
      });
    }

    return resolve({ email, error: null });
  });
};

const verifyRegistrationInput = async (
  _email: string,
  _password: string,
  _name: string,
  _phoneNumber: string
): Promise<IReturnRegistrationInputError | IReturnRegistrationInput> => {
  return new Promise(async (resolve, reject) => {
    const name = _name.trim();
    const phoneNumber: PhoneNumber | undefined = parsePhoneNumberFromString(_phoneNumber);
    if (!phoneNumber)
      reject({
        error: "Phone number failed validation",
        message: "Please enter a valid phone number",
      });

    try {
      const email = await verifyEmail(_email);
      const password = await verifyPassword(_password);
      if (name.length < 1)
        return reject({ error: "Name failed validation", message: "Please enter a valid name" });
      // @ts-ignore
      resolve({ email: email.email, name, password: password.password, phoneNumber });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export { verifyRegistrationInput };
