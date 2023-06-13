import { expect, test } from '@jest/globals';
import path from 'path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import getDifference from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['file1.yaml', 'file2.yaml', 'stylish', 'result-stylish1.txt'],
  ['file1.json', 'file2.json', 'stylish', 'result-stylish.txt'],
  ['filepath1.json', 'filepath2.json', 'stylish', 'result3-stylish.txt'],
  ['filepath1.yaml', 'filepath2.yaml', 'stylish', 'result3-stylish.txt'],
  ['filepath1.json', 'filepath2.json', 'plain', 'result4-plain.txt'],
  ['filepath1.yaml', 'filepath2.yaml', 'plain', 'result4-plain.txt'],
])('Comparing "%s" and "%s" with "%s" formatter equals to "%s"', (filename1, filename2, format, expected) => {
  const result = readFile(expected);
  const file1 = getFixturePath(filename1);
  const file2 = getFixturePath(filename2);
  expect(getDifference(file1, file2, format)).toEqual(result);
});
