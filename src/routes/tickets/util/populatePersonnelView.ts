import { IPersonnelView, INoteData, IMessage } from "../controllers/ticketController";

const populatePersonnelView = (
  notes: INoteData[],
  personnelData: IPersonnelView[],
  messages: IMessage[]
): IPersonnelView[] => {
  personnelData.forEach((data, index) => {
    for (let note of notes) {
      if (note.id != data.id) continue;
      personnelData[index] = { ...note };
      return;
    }

    for (let message of messages) {
      if (message.id != data.id) continue;
      personnelData[index] = { ...message };
      return;
    }
  });

  return personnelData;
};

export { populatePersonnelView };
