import fs from 'fs';
import path from 'path';
import test from 'ava';

let tryCleanFolder = (folder) => {
  if (!fs.existsSync(folder)) {
    return;
  }
  let stat = fs.statSync(folder);
  if (stat.isDirectory()) {
    fs.readdirSync(folder).forEach((item, i) => {
      tryCleanFolder(path.join(folder, item));
    });
    fs.rmdirSync(folder);
  } else {
    fs.unlinkSync(folder);
  }
};

let tryMkDir = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
};

let niceZip = require('./../index.js');

test.before('Build env', t => {
  tryMkDir('files/testresult');
});

test.after.always('Clean env', t => {
  console.log('Clean env');
  tryCleanFolder('files/1');
  tryCleanFolder('files/2');
  tryCleanFolder('files/testresult');
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
  niceZip.unzipFile('files/1.zip')
    .then((result) => {
      t.is(true, result);
      t.is('ABCDE', fs.readFileSync('files/1/1.txt', 'utf8').toString());
    });
});

test('Will unzip 1.zip to folder testresult successfully.', t => {
  niceZip.unzipFile('files/1.zip', 'files/testresult')
    .then((result) => {
      t.is(true, result);
      t.is('ABCDE', fs.readFileSync('files/testresult/1.txt', 'utf8').toString());
    });
});

test('Will unzip 2.zip to folder 2 successfully.', async t => {
  let result = await niceZip.unzipFile('files/2.zip');
  t.is(true, result);
  t.is('ABCDE', fs.readFileSync('files/2/1.txt', 'utf8').toString());
});

test('Will print process', async t => {
  let result = await niceZip.unzipFile('files/2.zip', null, {
    onProcess: (path, i, len) => {
      console.log(i, len, path);
      t.is(true, i <= len);
    }
  });
  t.is(true, result);
});