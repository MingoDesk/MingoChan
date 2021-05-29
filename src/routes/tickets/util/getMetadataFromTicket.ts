import { ITicket } from '../controllers/ticketController';

export const getMetadataFromTicket = (data: ITicket[]) => {
	return data.map(({ rating, messages, personnelView, notes, ...metaData }) => metaData);
};
