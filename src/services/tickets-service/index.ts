import { Ticket } from "@prisma/client";
import ticketsRepository, { CreateTicketParams } from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError } from "@/errors";

async function createTicket(params: CreateTicket, userId: number) {
  const { ticketTypeId } = params;

  const ticketType = await ticketsRepository.findTicketType(ticketTypeId);
  if (!ticketType) throw notFoundError();

  const enrollment = await enrollmentRepository.findByUserId(userId);
  
  const createTicket = { 
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: "RESERVED"
  } as CreateTicketParams;
  
  await ticketsRepository.insert(createTicket);
}

type CreateTicket = Omit<Ticket, "id" | "enrollmentId" | "status" | "createdAt" | "updatedAt">;

const ticketsService = {
  createTicket,
};

export default ticketsService;
