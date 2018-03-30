import fs from 'fs';
import test from 'ava';
import util from './util';

const niceZip = require('./../index.js');

test.before('Build env', t => {
  util.ensureDirSync(util.testRoot('files/testresult'));
});

test.after.always('Clean env', t => {
  util.tryCleanFolder(util.testRoot('files/1'));
  util.tryCleanFolder(util.testRoot('files/2'));
  util.tryCleanFolder(util.testRoot('files/testresult'));
});

test.failing('Will throw exception if not provider source file.', t => {
  niceZip.unzipFile();
});

test.failing('Will throw exception if not provider an exists source file.', t => {
  niceZip.unzipFile('abc');
});

test.failing('Will throw exception if not provider an exists target folder.', t => {
  niceZip.unzipFile('files/1.zip', 'good');
});

test('Will unzip 1.zip to folder 1 successfully.', t => {
  return niceZip.unzipFile(util.testRoot('files/1.zip')).then(result => {
    t.is(true, result);
    t.is('ABCDE', fs.readFileSync(util.testRoot('files/1/1.txt'), 'utf8').toString());
  });
});

test('Will unzip 1.zip to folder testresult successfully.', t => {
  return niceZip.unzipFile(util.testRoot('files/1.zip'), util.testRoot('files/testresult')).then(result => {
    t.is(true, result);
    t.is('ABCDE', fs.readFileSync(util.testRoot('files/testresult/1.txt'), 'utf8').toString());
  });
});

test('Will unzip 2.zip to folder 2 successfully.', async t => {
  let result = await niceZip.unzipFile(util.testRoot('files/2.zip'));
  t.is(true, result);
  t.is('ABCDE', fs.readFileSync(util.testRoot('files/2/1.txt'), 'utf8').toString());
});

test('Will print process', async t => {
  let result = await niceZip.unzipFile(util.testRoot('files/2.zip'), null, {
    onProcess: (path, i, len) => {
      t.is(true, i <= len);
    }
  });
  t.is(true, result);
});
