import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

// FIND ========================================================================

async function findTicketTypeById(id: number) {
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

async function findByUserId(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true
    }
  });
}

// CREATE ======================================================================

async function insert(createTicket: CreateTicketParams) {
  return prisma.ticket.create({
    data: createTicket,
    include: {
      TicketType: true
    }
  });
}

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">;

// EXPORT ======================================================================

const ticketsRepository = {
  insert,
  findTicketTypeById,
  findManyTypes,
  findByUserId,
  findTicketByEnrollmentId
};

export default ticketsRepository;
