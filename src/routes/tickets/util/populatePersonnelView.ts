import { IPersonnelView, INoteData } from "../controllers/ticketController";

const populateNotes = (notes: INoteData[], messages: IPersonnelView[]): IPersonnelView[] => {
  messages.forEach((message, index) => {
    for (let note of notes) {
      if (note.id != message.id) continue;
      messages[index] = { ...note };
      return;
    }
  });

  return messages;
};

export { populateNotes };
