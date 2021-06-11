export class MissingEnvError extends Error {
	public constructor(type: string) {
		super(type);
		this.name = 'Missing env variable error';
	}
}
