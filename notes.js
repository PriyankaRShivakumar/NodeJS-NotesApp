const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  //to check duplicate- if filter returns true array length will be >0 else it will be 0
  //return true if title matches else false
  // const duplicateNotes = notes.filter(note => note.title === title);
  // filter will search through all the notes and even if a match is found it will still search other notes to prevent that we use find
  // find will stop if one match of the title is found
  const duplicateNote = notes.find(note => note.title === title); //will return only the duplicate title
  debugger;

  if (!duplicateNote) {
    //push data to notes array
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);
    console.log(chalk.green.inverse("A new note added!"));
  } else {
    console.log(chalk.red.inverse("Title taken!"));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  //notes.filter here will remove the matched title and remaining is stored in notesToKeep
  // return true if title not matched.
  const notesToKeep = notes.filter(note => note.title !== title);

  if (notes.length !== notesToKeep.length) {
    console.log(chalk.green.inverse("Note Removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No Note Found!"));
  }
};

const listNotes = () => {
  console.log(chalk.blueBright("Your Notes"));
  const notes = loadNotes();
  notes.forEach(note => {
    console.log(note.title);
  });
};

const readNote = title => {
  const notes = loadNotes();
  const notematched = notes.find(note => note.title === title);
  if (notematched) {
    console.log(chalk.blueBright(notematched.title));
    console.log(notematched.body);
  } else {
    console.log(chalk.red.inverse("Note Not Found!"));
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json"); //fails if notes.json is not present
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    return data;
  } catch (e) {
    return []; //returns empty array
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
