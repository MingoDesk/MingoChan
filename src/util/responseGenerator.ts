export const responseGenerator = (httpCode: number, msg?: string) => {
	switch (httpCode) {
		case 200:
		case 201:
			return { success: true, msg, errors: null };
		case 400:
			return { success: false, msg: msg || 'Please check and validate the parameters', errors: 'ERR_BAD_REQUEST' };
		case 401:
			return { success: false, msg: "You're not logged in!", errors: 'ERR_NOT_AUTHORIZED' };
		case 403:
			return { success: false, msg, errors: 'ERR_FORBIDDEN' };
		case 415:
			return {
				success: false,
				msg: 'This media format is not supported, please try another',
				errors: 'ERR_UNSUPPORTED_MEDIA_TYPE',
			};
		case 429:
			return {
				success: false,
				msg: msg || "You're beeing ratelimited, please don't spam :)",
				errors: 'ERR_TOO_MANY_REQUESTS',
			};
		case 500:
			return {
				success: false,
				msg,
				errors: 'ERR_INTERNAL_SERVER_ERROR',
			};
		default:
			throw new Error('No such HTTP method configured');
	}
};
