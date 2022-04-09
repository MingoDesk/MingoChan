interface IHTTP_STATUS {
  [key: string]: { code: number; name: string };
}

export const HTTP_STATUS: IHTTP_STATUS = {
  SUCCESS: { code: 200, name: 'SUCCESS' },
  BAD_REQUEST: { code: 400, name: 'ERR_BAD_REQUEST' },
  UNATHORIZED: { code: 401, name: 'ERR_UNATHORIZED' },
  NOT_FOUND: { code: 404, name: 'ERR_NOT_FOUND' },
  INTERNAL_SERVER_ERROR: { code: 500, name: 'ERR_INTERNAL_SERVER_ERROR' },
};
