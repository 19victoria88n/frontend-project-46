import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const getIndent = (depth) => replacer.repeat(depth * spacesCount - spacesCount);

const getValue = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }

  const entries = Object.entries(value);
  const lines = entries.map(([key, val]) => {
    const line = `${getIndent(depth)}    ${key}: ${getValue(val, depth + 1)}`;
    return line;
  });
  return ['{', ...lines, `${getIndent(depth)}}`].join('\n');
};

const makeStylish = (data) => {
  const iter = (dataDiff, depth) => {
    const formatedData = dataDiff.flatMap((item) => {
      switch (item.type) {
        case 'nested':
          return `${getIndent(depth)}    ${item.key}: ${iter(item.children, depth + 1)}`;

        case 'unchanged':
          return `${getIndent(depth)}    ${item.key}: ${getValue(item.value, depth + 1)}`;

        case 'changed':
          return [
            `${getIndent(depth)}  - ${item.key}: ${getValue(item.value1, depth + 1)}`,
            `${getIndent(depth)}  + ${item.key}: ${getValue(item.value2, depth + 1)}`,
          ];

        case 'added':
          return `${getIndent(depth)}  + ${item.key}: ${getValue(item.value, depth + 1)}`;

        case 'deleted':
          return `${getIndent(depth)}  - ${item.key}: ${getValue(item.value, depth + 1)}`;

        default:
          return 'Error';
      }
    });
    return `{\n${formatedData.join('\n')}\n${getIndent(depth)}}`;
  };

  return iter(data, 1);
};

export default makeStylish;
