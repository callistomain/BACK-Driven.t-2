import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function findTicketType(id: number) {
  return await prisma.ticketType.findFirst({
    where: { id }
  });
}

async function insert(createTicket: CreateTicketParams) {
  return prisma.ticket.create({
    data: createTicket
  });
}

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">;

const ticketsRepository = {
  insert,
  findTicketType
};

export default ticketsRepository;
