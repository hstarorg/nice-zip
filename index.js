const JSZip = require('jszip');
const unzip = require('./lib/unzip');
const zip = require('./lib/zip');

module.exports = {
  JSZip: JSZip,
  unzipFile: unzip,
  zipFolder: zip
};
