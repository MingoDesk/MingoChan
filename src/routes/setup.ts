import { Application } from "express";

const setupRoutes = async (app: Application): Promise<void> => {
  app.use("/api/users");
  app.use("/api/threads");
};

export { setupRoutes };
