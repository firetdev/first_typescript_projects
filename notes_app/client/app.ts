import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import type { Note } from '../shared/types.js';

console.log('Welcome to notes CLI');

// Create interface
const rl = readline.createInterface({ input, output });

async function init(): Promise<void> {
  let command = await rl.question('Enter "get" to get notes or "create" to create a note. ');

  if (command == 'get') {

  } else if (command == 'create') {

  } else {
    console.log('Error: invalid command');
  }

  init();
}

init();