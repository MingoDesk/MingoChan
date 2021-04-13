const data = require("./data.json");
const { populateNotes } = require("../dist/routes/tickets/util/populatePersonnelView");

console.log(populateNotes(data.data.notes, data.data.personnelView));
