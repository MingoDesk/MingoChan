import express, { Application } from "express";
import dotenv from "dotenv";
import { init } from "./app";
dotenv.config();

const app: Application = express();

const start = async () => {
  await init(app);
};

start().catch((err) => console.log(err));
