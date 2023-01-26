import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

// GET ========================================================================

/* export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const types = await ticketsService.getAllTypes();
    return res.send(types);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  try {
    const types = await ticketsService.getTicketByUserId(req.userId);
    return res.send(types);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
} */

// POST =======================================================================

export async function postCreatePayment(req: AuthenticatedRequest, res: Response) {
  try {
    const payment = await paymentsService.createPayment(req.body, req.userId);
    return res.send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
