import { ITicket, ITicketMetaData } from '../controllers/ticketController';

export const getMetadataFromTicket = (data: ITicket[]): ITicketMetaData[] => {
	const metadata = data;

	// Create a shorted down preview message for the front-end
	metadata.forEach((_v, index) => {
		const newMessageArr = metadata[index].messages[0].text.slice(0, 50).split('');
		newMessageArr.push('...');
		metadata[index].previewText = newMessageArr.join();
	});

	// Map out all the parameters I don't want to return to the FE
	const retunMetaData = metadata.map(({ rating, personnelView, notes, messages, ...metaData }) => metaData);

	return retunMetaData;
};
