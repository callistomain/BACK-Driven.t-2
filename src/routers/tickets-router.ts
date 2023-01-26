import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicket, getTicketTypes, postCreateTicket } from "@/controllers";
import { createTicketSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .get("/", getTicket)
  .post("/", validateBody(createTicketSchema), postCreateTicket);

export { ticketsRouter };
