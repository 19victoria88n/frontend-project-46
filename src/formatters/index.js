import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJSON from './json.js';

const makeFormatting = (treeDiff, format) => {
  switch (format) {
    case 'stylish': return makeStylish(treeDiff);

    case 'plain': return makePlain(treeDiff);

    case 'json': return makeJSON(treeDiff);

    default:
      throw new Error(`False format ${format}`);
  }
};

export default makeFormatting;
