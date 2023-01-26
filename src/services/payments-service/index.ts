import ticketsRepository from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError, unauthorizedError } from "@/errors";
import paymentsRepository, { CreatePaymentParams } from "@/repositories/payments-repository";

// FIND ========================================================================

async function getPaymentByTicketId(ticketId: number, userId: number) {
  const ticket = await ticketsRepository.findTicketById(ticketId);
  if (!ticket) throw notFoundError();
  
  const enrollment = await enrollmentRepository.findByUserId(userId);
  if (ticket.enrollmentId !== enrollment.id) throw unauthorizedError();
  
  return await paymentsRepository.findByTicketId(ticketId);
}

// CREATE ======================================================================

async function createPayment(params: CreatePayment, userId: number) {
  const { ticketId, cardData } = params;
  const cardIssuer = cardData.issuer;
  const cardLastDigits = cardData.number.slice(-4);

  const ticket = await ticketsRepository.findTicketById(ticketId);
  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findByUserId(userId);
  if (ticket.enrollmentId !== enrollment.id) throw unauthorizedError();

  const ticketType = await ticketsRepository.findTicketTypeById(ticket.ticketTypeId);
  await ticketsRepository.updateStatusById(ticketId, "PAID");
  
  const createPayment: CreatePaymentParams = { 
    ticketId,
    value: ticketType.price,
    cardIssuer,
    cardLastDigits
  };

  return await paymentsRepository.insert(createPayment);
}

type CreatePayment = {
	ticketId: number,
	cardData: {
		issuer: string,
    number: string,
    name: string,
    expirationDate: string,
    cvv: string
	}
};

// EXPORT ======================================================================

const paymentsService = {
  createPayment,
  getPaymentByTicketId
};

export default paymentsService;
