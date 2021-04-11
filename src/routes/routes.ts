import { Application } from "express";
import { Request, Router } from "express";
import callbackRouter from "./auth/callback";
import loginRouter from "./auth/login";
import logoutRouter from "./auth/logout";
import ticketsRouter from "./tickets/TicketConfig";

const router = Router();

const setupRoutes = async (app: Application): Promise<void> => {
  app.use(
    router.get("/", (req: Request, res) => {
      console.log(req.user);
      return res.send({ isLoggedIn: req.user ? true : false });
    })
  );

  app.use("/api", loginRouter, callbackRouter, logoutRouter);
  app.use("/api/tickets", ticketsRouter);
};

export { setupRoutes };
