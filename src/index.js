import { readFileSync } from 'fs';
import Path from 'node:path';
import getFormat from './parcers.js';
import compareObject from './compare.js';
import makeFormatting from './formatters/index.js';

const getDifference = (file1, file2, format = 'stylish') => {
  const contentData1 = readFileSync(file1, 'utf-8');
  const contentData2 = readFileSync(file2, 'utf-8');
  const ext1 = Path.extname(file1).replace('.', '');
  const ext2 = Path.extname(file1).replace('.', '');
  const data1 = getFormat(contentData1, ext1);
  const data2 = getFormat(contentData2, ext2);
  const diff = compareObject(data1, data2);
  return makeFormatting(diff, format);
};

export default getDifference;
