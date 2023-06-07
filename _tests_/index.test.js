/// outside imports
import { test, expect } from '@jest/globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
/// inside imports
import getDifference from '../src/index.js';

const importFileName = fileURLToPath(import.meta.url); // https://nodejs.org/api/esm.html#importmetaurl
const generatedName = path.dirname(importFileName);

const getFixturePath = (filename) => path.join(generatedName, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['file1.yaml', 'file2.yaml', 'stylish', 'result-stylish.txt'],
  ['file1.json', 'file2.json', 'stylish', 'result-stylish.txt'],
  ['file1.json', 'file2.json', 'json', 'result-json.json'],
  ['file1.yaml', 'file2.yaml', 'json', 'result-json.json'],
  ['file1.json', 'file2.json', 'plain', 'result-plain.txt'],
])('Comparing "%s" and "%s" with "%s" formatter equals to "%s"', (filename1, filename2, format, expected) => {
  const result = readFile(expected);
  const file1 = getFixturePath(filename1);
  const file2 = getFixturePath(filename2);
  expect(getDifference(file1, file2, format)).toEqual(result);
});
