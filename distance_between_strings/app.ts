// TypeScript implementation of a random app I made in Python

import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

function letterDistance(a: string, b: string): number {
  if (a.length !== 1 || b.length !== 1)
    throw new Error("Inputs must be single letters");

  let count = 0;
  let counting = false;

  for (const i of alphabet) {
    if (!counting) {
      if (i === a || i === b)
        counting = true;
    } else {
      count += 1;
      if (i === a || i === b)
        return count;
    }
  }

  return 0;
}

function stringDistance(s1: string, s2: string): number {
  let distance = 0;

  let len1 = s1.length;
  let len2 = s2.length;

  if (len1 > len2) {
    distance += 12 * (len1 - len2);
    s1 = s1.slice(0, len2);
  } else if (len2 > len1) {
    distance += 12 * (len2 - len1);
    s2 = s2.slice(0, len1);
  }

  for (let i = 0; i < s1.length; i++)
    distance += letterDistance(s1[i], s2[i]);

  return distance;
}

const string1 = await rl.question('Enter the first string: ');
const string2 = await rl.question('Enter the second string: ');
rl.close();

console.log(`The distance between the strings is ${stringDistance(string1, string2)}`);