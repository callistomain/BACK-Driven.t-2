import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

// GET ========================================================================

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const payment = await paymentsService.getPaymentByTicketId(+ticketId, req.userId);
    return res.send(payment);
  } catch (error) {
    if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

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
