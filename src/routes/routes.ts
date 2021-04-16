import { Application } from "express";
import { Request, Router } from "express";
import callbackRouter from "./auth/controllers/callback";
import loginRouter from "./auth/controllers/login";
import logoutRouter from "./auth/controllers/logout";
import ticketsRouter from "./tickets/ticketConfig";
import systemRouter from "./system/systemConfig";

const router = Router();

const setupRoutes = async (app: Application): Promise<void> => {
  app.use(
    router.get("/", (req: Request, res) => {
      return res.send({ isLoggedIn: req.user ? true : false });
    })
  );

  app.use("/api", loginRouter, callbackRouter, logoutRouter);
  app.use("/api/tickets", ticketsRouter);
  app.use("/api/system", systemRouter);
};

export { setupRoutes };
