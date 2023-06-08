import { expect, test } from '@jest/globals';
import path from 'path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPathFile = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getPathFile(filename), 'utf-8');

test.each([
  {
    file1: 'file1.json', file2: 'file2.json', format: 'stylish', expectResult: 'result-stylish.txt',
  },
])('Compare files $file1 and $file2 format $format', ({
  file1, file2, format, expectResult,
}) => {
  const resultFunction = genDiff(getPathFile(file1), getPathFile(file2), format);
  const expected = readFile(expectResult);

  expect(resultFunction).toEqual(expected);
});
