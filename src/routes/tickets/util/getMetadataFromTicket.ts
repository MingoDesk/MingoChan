import { ITicket, ITicketMetaData } from '../controllers/ticketController';

export const getMetadataFromTicket = (data: ITicket[]): ITicketMetaData[] => {
	const metadata = data.map(({ rating, personnelView, notes, ...metaData }) => metaData);

	metadata[0].previewText = metadata[0].messages[0].text.slice(50);

	return metadata;
};
