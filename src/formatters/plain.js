import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return String('[complex value]');
  }

  return (typeof value === 'string') ? `'${value}'` : value;
};

const makePlain = (data) => {
  const iter = (node, path) => {
    const name = node.key;
    const currentPath = [...path, name];

    switch (node.type) {
      case 'nested':
        return node.children.flatMap((item) => iter(item, currentPath));

      case 'added':
        return `Property '${currentPath.join('.')}' was added with value: ${getValue(node.value)}`;

      case 'deleted':
        return `Property '${currentPath.join('.')}' was removed`;

      case 'changed':
        return `Property '${currentPath.join('.')}' was updated. From ${getValue(node.value1)} to ${getValue(node.value2)}`;

      case 'unchanged':
        return null;

      default:
        throw new Error(`Unknown operation: '${node.type}'`);
    }
  };

  const result = data
    .flatMap((item) => iter(item, []))
    .filter((item) => item !== null);
  return result.join('\n');
};

export default makePlain;
