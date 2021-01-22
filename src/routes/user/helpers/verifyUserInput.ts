import parsePhoneNumberFromString, { E164Number, PhoneNumber } from 'libphonenumber-js';
import { getDB } from '../../../database/db';

const emailReg: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface IPhoneData {
  country?: string;
  phoneNumber?: E164Number;
  isValid?: boolean;
}

export interface IReturnError {
  error: string;
  msg: string;
}

export interface IReturnPassword {
  password: string;
  error: null;
}

export interface IReturnEmail {
  email: string;
  error: null;
}

export interface IReturnRegistrationInput {
  email: string;
  name: string;
  password: string;
  phoneData: IPhoneData;
}

export interface IReturnRegistrationInputError {
  email: null;
  name: null;
  password: null;
  phoneData: null;
}

export const verifyPassword = (_password: string): Promise<IReturnError | IReturnPassword> => {
  return new Promise((resolve, reject) => {
    const password = _password.trim();
    if (password.length < 6 || password.length > 128)
      return reject({
        error: 'Password failed validation',
        msg: 'Password must be at least 6 characters long and a maximum of 128 characters',
      });
    resolve({ password, error: null });
  });
};

export const verifyEmail = (_email: string): Promise<IReturnError | IReturnEmail> => {
  return new Promise(async (resolve, reject) => {
    const email = _email.toLocaleLowerCase().trim();

    if (emailReg.test(email) !== true || email.length < 3) {
      return reject({
        error: 'Email failed validation',
        msg: "Email wasn't valid, please try again.",
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
): Promise<IReturnRegistrationInput> => {
  return new Promise(async (resolve, reject) => {
    const name = _name.trim();
    const phoneNumber: PhoneNumber | undefined = parsePhoneNumberFromString(_phoneNumber);
    if (!phoneNumber)
      reject({
        error: 'Phone number failed validation',
        msg: 'Please enter a valid phone number',
      });

    const phoneData: IPhoneData = {
      country: phoneNumber?.country,
      phoneNumber: phoneNumber?.number,
      isValid: phoneNumber?.isValid(),
    };

    try {
      const email = await verifyEmail(_email);
      const password = await verifyPassword(_password);
      if (name.length < 1)
        return reject({ error: 'Name failed validation', msg: 'Please enter a valid name' });
      // @ts-ignore
      resolve({ email: email.email, name, password: password.password, phoneData });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export { verifyRegistrationInput };
