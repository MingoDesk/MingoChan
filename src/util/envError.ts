export class MissingEnvError extends Error {
  constructor(type: string) {
    super(type);
    this.name = "Missing env variable error";
  }
}
