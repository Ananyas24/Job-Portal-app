import DatauriParser from 'datauri/parser.js';
import path from 'path';

const getDataUri = (file) => {
    if (!file) throw new Error('No file provided');
    const parser = new DatauriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
};
export default getDataUri;
