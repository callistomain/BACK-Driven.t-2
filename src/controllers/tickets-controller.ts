import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

// GET ========================================================================

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const types = await ticketsService.getAllTypes();
    return res.send(types);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  try {
    const ticket = await ticketsService.getTicketByUserId(req.userId);
    return res.send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

// POST =======================================================================

export async function postCreateTicket(req: AuthenticatedRequest, res: Response) {
  const { body, userId } = req;

  try {
    const ticket = await ticketsService.createTicket(body, userId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.BAD_REQUEST);
    if (error.name === "EnrollmentNotFound") return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
