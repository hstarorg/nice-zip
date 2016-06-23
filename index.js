'use strict';

let JSZip = require('jszip');
let tools = require('./lib/tools');

module.exports = {
  JSZip: JSZip,
  unzipFile: tools.unzipFile
};