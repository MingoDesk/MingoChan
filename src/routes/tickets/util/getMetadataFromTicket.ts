import { ITicket, ITicketMetaData } from '../controllers/ticketController';


export const getMetadataFromTicket = (data: ITicket[]): ITicketMetaData[] => {
  const metadata = data;
  let flattenedMessage = '';

  // Take all the messages put them together into a single string and if the string is equals or grater than 50 return. Once 50 add three dots at the end of te string and return that as previewString

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  metadata[0].messages[0].body.content.forEach(message => {
    message.content?.forEach(content => {
      if (flattenedMessage.length >= 50) return;
      if (content.type === 'text' && typeof content.text === 'string') {
        flattenedMessage += flattenedMessage.concat(' ', content.text);
      }
    });
  });

  metadata[0].previewText = flattenedMessage.slice(0, 50).concat('...');

  // Map out all the parameters I don't want to return to the FE
  const retunMetaData = metadata.map(({ rating, personnelView, notes, messages, ...metaData }) => metaData);

  return retunMetaData;
};
