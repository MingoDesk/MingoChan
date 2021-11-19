import { envFilter as filter } from '@config/config';
import { MissingEnvError } from './envError';

const checkEnvVars = (): void => {
	filter.forEach(key => {
		if (!process.env.hasOwnProperty(key)) throw new MissingEnvError(`Missing environment variable: ${key}`);
	});
};

export { checkEnvVars };
