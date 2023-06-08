import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import { cwd } from 'node:process';

// eslint-disable-next-line no-shadow
const getDataParsed = (path) => {
  const data = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });
  return JSON.parse(data);
};

const genDiff = (filepath1, filepath2) => {
  const resolvedFilepath1 = path.resolve(cwd(), filepath1);
  const resolvedFilepath2 = path.resolve(cwd(), filepath2);

  const data1 = getDataParsed(resolvedFilepath1);
  const data2 = getDataParsed(resolvedFilepath2);

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
