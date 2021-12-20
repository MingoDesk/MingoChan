import { ITicket, ITicketMetaData } from '../controllers/ticketController';

// getMetadataTicket returns a metadata response with a previewText on the return object.
// The previewText is the messages put them together into a single string (flatmapping it) and if the string is equals or grater than 50 return. Once 50 add three dots at the end of the string and return that as previewString on the return object


export const getMetadataFromTicket = (data: ITicket[]): ITicketMetaData[] => {
  const metadata = data;


  metadata.forEach((ticket, index) => {
    ticket.messages.forEach(message => {
      let flattenedMessage = '';
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      message.body.content.forEach(markdown => {
        markdown.content?.forEach(content => {
          if (flattenedMessage.length >= 50) return;
          if (content.type === 'text' && typeof content.text === 'string') {
            flattenedMessage += flattenedMessage.concat(' ', content.text);
          }
        });
      });
      metadata[index].previewText = flattenedMessage.slice(0, 50).concat('...');
    });
  });


  // Map out all the parameters I don't want to return to the FE
  const retunMetaData = metadata.map(({ rating, personnelView, notes, messages, ...metaData }) => metaData);

  return retunMetaData;
};
