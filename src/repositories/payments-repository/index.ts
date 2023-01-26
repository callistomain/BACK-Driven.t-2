import { prisma } from "@/config";
import { Payment } from "@prisma/client";

// FIND ========================================================================

/* async function findTicketTypeById(id: number) {
  return await prisma.ticketType.findFirst({
    where: { id }
  });
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: { enrollmentId }
  });
}

async function findManyTypes() {
  return await prisma.ticketType.findMany();
}

async function findByEnrollmentId(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true
    }
  });
} */

// CREATE ======================================================================

async function insert(createPayment: CreatePaymentParams) {
  return prisma.payment.create({
    data: createPayment
  });
}

export type CreatePaymentParams = Omit<Payment, "id" | "createdAt" | "updatedAt">;

// EXPORT ======================================================================

const paymentsRepository = {
  insert
};

export default paymentsRepository;
