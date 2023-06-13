import makeStylish from './stylish.js';
import makePlain from './plain.js';

const makeFormatting = (treeDiff, format) => {
  switch (format) {
    case 'stylish': return makeStylish(treeDiff);

    case 'plain': return makePlain(treeDiff);

    case 'json': return JSON.stringify(treeDiff);

    default:
      throw new Error(`False format ${format}`);
  }
};

export default makeFormatting;
