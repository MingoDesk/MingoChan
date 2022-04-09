import { HTTP_STATUS } from '@util/http-status';
import { MingoChanError } from './MingoChanError';

export class MissingEnvError extends MingoChanError {
  public constructor(type: string, msg = 'Missing environment variable') {
    super(HTTP_STATUS.INTERNAL_SERVER_ERROR.code, msg, true, type);
    this.name = 'Missing env variable error';
  }
}
