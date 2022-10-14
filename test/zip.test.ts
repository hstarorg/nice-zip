import { testRoot } from './util';
import * as fse from 'fs-extra';
import { zipFolder } from '../src';

describe('zip test', () => {
  beforeEach(() => {
    fse.removeSync(testRoot('target.zip'));
  });
  afterEach(() => {
    fse.removeSync(testRoot('target.zip'));
  });

  test('zip folder', () => {
    const targetPath = testRoot('target.zip');
    return zipFolder(testRoot('files'), targetPath).then(() => {
      expect(fse.existsSync(targetPath)).toBe(true);
    });
  });
});
