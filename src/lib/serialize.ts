import { getDB } from '@database/db';
import { ObjectId } from 'mongodb';
import { Request } from 'express';

export function serialize(user: Request['user'], done) {
  done(null, user!.providerId);
}

export function deserialize(id: ObjectId, done: any) {
  getDB().users.findOne({ providerId: id }, (err, res) => {
    // eslint-disable-next-line
		if (err) return done(err);
    done(null, res);
  });
}
