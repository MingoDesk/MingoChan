import { ITicket, ITicketMetaData } from '../controllers/ticketController';

export const getMetadataFromTicket = (data: ITicket[]): ITicketMetaData[] => {
	const metadata = data;

	metadata[0].previewText = metadata[0].messages[0].text.slice(0, 50);

	const retunMetaData = metadata.map(({
		rating, personnelView, notes, messages, ...metaData
	}) => metaData);

	return retunMetaData;
};
