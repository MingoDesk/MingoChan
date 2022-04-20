import request from 'supertest';
import { init } from '../src/app';
import { getDB } from '../src/database/db';

import express, { Application } from 'express';

const app: Application = express();

beforeAll(async () => { await init(app); });
afterAll(async () => { await getDB().disconnect(); });

describe('App should return a 404 on non defined routes', () => {
  test('Catch-all route', async () => {
    const res = await request(app).get('/');
    expect(res.body).toEqual({
      success: false,
      msg: 'not found',
      error_code: 'ERR_NOT_FOUND'
    });
    expect(res.statusCode === 404);
  });
});
