import { readFileSync } from 'fs';
import getFormat from './parcers.js';
import compareObject from './compare.js';
import makeFormatting from './formatters/index.js';

const getDifference = (file1, file2, format = 'stylish') => {
  const contentData1 = readFileSync(file1, 'utf-8');
  const contentData2 = readFileSync(file2, 'utf-8');
  const data1 = getFormat(file1, contentData1);
  const data2 = getFormat(file2, contentData2);
  const diff = compareObject(data1, data2);
  return makeFormatting(diff, format);
};

export default getDifference;
