import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { postCreatePayment } from "@/controllers";
import { createPaymentSchema } from "@/schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/")
  .post("/process", validateBody(createPaymentSchema), postCreatePayment);

export { paymentsRouter };
