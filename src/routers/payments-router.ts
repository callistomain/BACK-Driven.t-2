import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPayment, postCreatePayment } from "@/controllers";
import { createPaymentSchema } from "@/schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPayment)
  .post("/process", validateBody(createPaymentSchema), postCreatePayment);

export { paymentsRouter };
