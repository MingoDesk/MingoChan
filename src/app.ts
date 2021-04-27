import { Application } from "express";
import helmet from "helmet";
import "reflect-metadata";
import { setupDB } from "./database/db";
import { checkEnvVars } from "./util/checkEnvVars";
import express from "express";
import { setupRoutes } from "./routes/routes";
import { initializeAuth } from "./lib/setup.passport";

const init = async (app: Application): Promise<void> => {
  // Check that all env variables are set
  await checkEnvVars();

  // Setup mongo and redis
  await setupDB({ URI: process.env.MONGO_URI, name: process.env.DB_NAME });

  // Application configuration
  app.use(express.json({ limit: "100kb", strict: true, type: "application/json" }));
  app.use(helmet());
  await initializeAuth(app);

  await setupRoutes(app);

  app.listen(process.env.PORT, () => console.info(`Listening on http://localhost:${process.env.PORT}`));
};

export { init };
