const JSZip = require('jszip');
const tools = require('./lib/tools');

module.exports = {
  JSZip: JSZip,
  unzipFile: tools.unzipFile
};
