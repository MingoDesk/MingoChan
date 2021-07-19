import { ITicket, ITicketMetaData } from '../controllers/ticketController';

export const getMetadataFromTicket = (data: ITicket[]): ITicketMetaData[] => {
	return data.map(({ rating, messages, personnelView, notes, ...metaData }) => metaData);
};
