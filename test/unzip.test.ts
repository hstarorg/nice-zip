import * as fs from 'fs';
import { testRoot, ensureDirSync, tryCleanFolder } from './util';
import { unzipFile } from '../src';

describe('unzip tests', () => {
  beforeEach(() => {
    ensureDirSync(testRoot('files/testresult'));
  });
  afterEach(() => {
    tryCleanFolder(testRoot('files/1'));
    tryCleanFolder(testRoot('files/2'));
    tryCleanFolder(testRoot('files/testresult'));
  });

  test('Will throw exception if not provider an exists source file.', async () => {
    await expect((unzipFile as any)('abc')).rejects.toThrow();
  });

  test('Will throw exception if not provider an exists target folder.', async () => {
    await expect(unzipFile('files/1.zip', 'good')).rejects.toThrow();
  });

  test('Will unzip 1.zip to folder 1 successfully.', () => {
    return unzipFile(testRoot('files/1.zip')).then((result) => {
      expect(result).toBe(true);
      expect(fs.readFileSync(testRoot('files/1/1.txt'), 'utf8').toString()).toBe('ABCDE');
    });
  });

  test('Will unzip 1.zip to folder testresult successfully.', () => {
    return unzipFile(testRoot('files/1.zip'), testRoot('files/testresult')).then((result) => {
      expect(result).toBe(true);
      expect(fs.readFileSync(testRoot('files/testresult/1.txt'), 'utf8').toString()).toBe('ABCDE');
    });
  });

  test('Will unzip 2.zip to folder 2 successfully.', async () => {
    let result = await unzipFile(testRoot('files/2.zip'));
    expect(result).toBe(true);
    expect(fs.readFileSync(testRoot('files/2/1.txt'), 'utf8').toString()).toBe('ABCDE');
  });

  test('Will print process', async () => {
    const result = await unzipFile(testRoot('files/2.zip'), null, {
      onProcess: (path, i, len) => {
        expect(i <= len).toBe(true);
      },
    });
    expect(result).toBe(true);
  });
});
