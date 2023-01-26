import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { postCreateTicket } from "@/controllers";
import { createTicketSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types")
  .get("/")
  .post("/", validateBody(createTicketSchema), postCreateTicket);

export { ticketsRouter };
