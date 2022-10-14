import * as fse from 'fs-extra';
import { join as pathJoin } from 'node:path';

function ensureDirSync(folder) {
  fse.ensureDirSync(folder);
}

function testRoot(...args: string[]) {
  return pathJoin(__dirname, ...args);
}

function tryCleanFolder(folder: string) {
  if (!fse.existsSync(folder)) {
    return;
  }
  let stat = fse.statSync(folder);
  if (stat.isDirectory()) {
    fse.readdirSync(folder).forEach((item, i) => {
      tryCleanFolder(pathJoin(folder, item));
    });
    fse.rmdirSync(folder);
  } else {
    fse.unlinkSync(folder);
  }
}

export { ensureDirSync, testRoot, tryCleanFolder };
