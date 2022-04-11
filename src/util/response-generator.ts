import { MingoChanError } from '@errors/mingochan-error';
import { HTTP_STATUS } from './http-status';

interface HttpResponse {
  success: boolean;
  msg: string;
  error_code: string | null;
}

export const responseGenerator = (status: number, msg?: string): HttpResponse => {
  switch (status) {
    case HTTP_STATUS.SUCCESS.code:
      return {
        success: true,
        msg: msg ?? 'success',
        error_code: null
      };
    case HTTP_STATUS.BAD_REQUEST.code:
      return {
        success: false,
        msg: msg ?? 'bad reuqest',
        error_code: HTTP_STATUS.BAD_REQUEST.name
      };
    case HTTP_STATUS.UNATHORIZED.code:
      return {
        success: false,
        msg: msg ?? 'unathorized',
        error_code: HTTP_STATUS.UNATHORIZED.name
      };
    case HTTP_STATUS.NOT_FOUND.code:
      return {
        success: false,
        msg: msg ?? 'not found',
        error_code: HTTP_STATUS.NOT_FOUND.name
      };
    case HTTP_STATUS.INTERNAL_SERVER_ERROR.code:
      return {
        success: false,
        msg: msg ?? 'interal server error',
        error_code: HTTP_STATUS.INTERNAL_SERVER_ERROR.name
      };
    default: throw new MingoChanError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR.code,
      'No such HTTP status configured in responseGenerator'
    );
  }
};
