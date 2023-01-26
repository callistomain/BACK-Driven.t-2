import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function postCreateTicket(req: AuthenticatedRequest, res: Response) {
  const { body, userId } = req;

  try {
    await ticketsService.createTicket(body, userId);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
