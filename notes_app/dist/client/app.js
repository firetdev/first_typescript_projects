import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { getNotes } from './getNotes.js';
import { createNote } from './createNote.js';
import { resetNotes } from './resetNotes.js';
console.log('Welcome to notes CLI');
// Create rl interface
const rl = readline.createInterface({ input, output });
async function init() {
    let command = await rl.question('Enter "get" to get notes or "create" to create a note.  Enter "reset" to delete all notes. ');
    if (command == 'reset') {
        await resetNotes();
        console.log('Notes reset! ');
    }
    else if (command == 'get') {
        const notes = await getNotes();
        console.log('Notes:', notes);
    }
    else if (command == 'create') {
        let noteName = await rl.question('What is the note\'s name? ');
        let content = await rl.question('What is the note\'s content? ');
        let res = await createNote(noteName, content);
        if (res.success == true)
            console.log('Successfully created note!');
        else
            console.log(res.message);
    }
    else {
        console.log('Error: invalid command');
    }
    init();
}
init();
