import { MissingEnvError } from './envError';
import { envFilter as filter } from '@config/config';

const checkEnvVars = (): void => {
	filter.forEach((key) => {
		if (!process.env.hasOwnProperty(key)) throw new MissingEnvError(`Missing environment variable: ${key}`);
		console.log(`Found key: ${key}`);
	});
};

export { checkEnvVars };
