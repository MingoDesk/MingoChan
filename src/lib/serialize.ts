import { getDB } from '../database/db';

function auth0Serialize(user, done) {
	done(null, user._id);
}

function auth0Deserialize(id, done: any) {
	getDB().users.findOne({ _id: id }, (err, res) => {
		// eslint-disable-next-line
		if (err) return done(err);
		done(null, res);
	});
}

export { auth0Serialize, auth0Deserialize };
