import { readFileSync } from 'fs';
import _ from 'lodash';
import getFormat from './parcers.js';

const genDiff = (file1, file2) => {
  const contentData1 = readFileSync(file1, 'utf-8');
  const contentData2 = readFileSync(file2, 'utf-8');
  const data1 = getFormat(file1, contentData1);
  const data2 = getFormat(file2, contentData2);

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const result1 = keys.map((key) => {
    if (!_.has(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (!_.has(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (_.isEqual(data1[key], data2[key])) {
      return `    ${key}: ${data1[key]}`;
    }
    return [[`  - ${key}: ${data1[key]}`], [`  + ${key}: ${data2[key]}`]];
  });
  return _.flatten(['{', ...result1, '}']).join('\n');
};

export default genDiff;