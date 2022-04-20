/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
// which contains the path mapping (ie the `compilerOptions.paths` option):
module.exports = {
	displayName: 'mingochan',
	verbose: true,
	coverageDirectory: './src/',
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFiles: ['dotenv/config'],
	moduleNameMapper: {
		'^@middleware/(.*)$': '<rootDir>/src/middleware/$1',
		'^@database/(.*)$': '<rootDir>/src/database/$1',
		'^@routes/(.*)$': '<rootDir>/src/routes/$1',
		'^@util/(.*)$': '<rootDir>/src/util/$1',
		'^@errors/(.*)$': '<rootDir>/src/errors/$1',
		'^@config/(.*)$': '<rootDir>/src/config/$1',
		'^@lib/(.*)$': '<rootDir>/src/lib/$1',
		'^@tickets/(.*)$': '<rootDir>/src/routes/tickets/$1',
		'^@analytics/(.*)$': '<rootDir>/src/routes/analytics/$1',
		'^@auth/(.*)$': '<rootDir>/src/routes/auth/$1',
		'^@system/(.*)$': '<rootDir>/src/routes/system/$1',
		'^@user/(.*)$': '<rootDir>/src/routes/user/$1',
		'^@security/(.*)$': '<rootDir>/src/security/$1',
		'^@@types/(.*)$': '<rootDir>/src/types/$1',
	}
};
