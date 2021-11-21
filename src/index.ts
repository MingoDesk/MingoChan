import express, { Application } from 'express';
import dotenv from 'dotenv';
import { init } from './app';

dotenv.config();

const app: Application = express();

const start = async () => {
  await init(app);
};

// eslint-disable-next-line no-console
start().catch(err => console.error(err));
