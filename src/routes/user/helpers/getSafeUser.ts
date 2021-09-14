import { Request } from 'express';

const getSafeUser = (req: Request) => {
	const u = req.user;

	if (!u) return null;
	return {
		permissions: u.permissions,
		providerId: u.providerId,
		email: u._id,
		isVerified: u.email,
		locale: u.locale,
		name: u.name,
		picture: u.picture
	};
};

export { getSafeUser };
