export interface IInput {
  name?: string;
  password?: string;
}

export interface IReturnBBuilder {
  $set: IInput;
}

export async function userEditBodyBuilder({ name, password }: IInput): Promise<IReturnBBuilder> {
  return new Promise(async (resolve, reject) => {
    if (!name && !password)
      return reject({ error: 'Bad request', msg: 'No valid key to update was supplied.' });

    const body = { name, password };

    resolve({
      $set: body,
    });
  });
}
