import path from 'path';
import yaml from 'js-yaml';

const getFormat = (pathOfFile, data) => {
  const format = path.extname(pathOfFile).replace('.', '');
  switch (format) {
    case 'json': return JSON.parse(data);
    case 'yaml': return yaml.load(data);
    case 'yml': return yaml.load(data);
    default: return null;
  }
};
export default getFormat;
