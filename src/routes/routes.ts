import { Application } from "express";
import clientRegisterRouter from "./user/clientRegister";

const setupRoutes = async (app: Application): Promise<void> => {
  app.use("/api/users", clientRegisterRouter);
  //app.use("/api/threads");
};

export { setupRoutes };
