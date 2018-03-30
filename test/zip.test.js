import test from 'ava';
const util = require('./util');
const fse = require('fs-extra');
const niceZip = require('./../index.js');

test.after.always('Clean env', t => {
  fse.removeSync(util.testRoot('target.zip'));
});

test('zip folder', t => {
  const targetPath = util.testRoot('target.zip');
  return niceZip.zipFolder(util.testRoot('files'), targetPath).then(() => {
    t.is(fse.existsSync(targetPath), true);
  });
});
