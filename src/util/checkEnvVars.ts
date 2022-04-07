import { ENV_FILTER as filter } from '@config/config';
import { MissingEnvError } from '../errors/envError';

const checkEnvVars = (): void => {
  filter.forEach((key: string) => {
    if (!process.env.hasOwnProperty(key)) throw new MissingEnvError(`Missing environment variable: ${key}`);
  });
};

export { checkEnvVars };
