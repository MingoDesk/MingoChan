import { IPersonnelView, INote, IMessage } from '../controllers/ticketController';

/**
 * This function takes the id's from the personnelView and fills them with it's real data such as a note or a reply for sending to the front-end
 *
 * @param notes
 * @param personnelView
 * @param messages
 * @returns IPersonnelView
 */

const populatePersonnelView = (
	notes: INote[],
	personnelView: IPersonnelView[],
	messages: IMessage[],
): IPersonnelView[] => {
	const map = {};

	notes.forEach((note) => {
		map[note.id] = note;
	});

	messages.forEach((message) => {
		map[message.id] = message;
	});

	return personnelView.map((v) => map[v.id] || v.id);
};

export { populatePersonnelView };
