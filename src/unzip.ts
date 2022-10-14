import { existsSync, mkdirSync, statSync, readFile, writeFile } from 'fs';
import { join as pathJoin, dirname } from 'path';
import { promisify } from 'util';
import * as JSZip from 'jszip';
import { ensureFunction, getFileName } from './utils';

export type UnzipFileOptions = JSZip.JSZipLoadOptions & {
  onProcess?: (filePath: string, fileIdx: number, len: number) => void;
  onLoad?: (fileLen: number) => void;
};

/**
 * 解压指定文件到目标文件夹（文件夹必须存在）
 * @param <sourceFile> 源文件，必须是.zip后缀
 * @param [targetFolder] 解压路径，不提供则默认解压到当前路径
 * @param [options] 解压时的配置参数
 * @returns <Promise>
 */
export async function unzipFile(sourceFile: string, targetFolder?: string, options?: UnzipFileOptions) {
  if (!sourceFile || !existsSync(sourceFile)) {
    throw new Error('Must provider source file.');
  }
  if (targetFolder) {
    if (!existsSync(targetFolder)) {
      throw new Error('Target folder not exists.');
    }
  } else {
    targetFolder = pathJoin(dirname(sourceFile), getFileName(sourceFile));
    if (!existsSync(targetFolder)) {
      mkdirSync(targetFolder);
    }
  }
  options = options || {};
  if (options.onProcess) {
    if (typeof options.onProcess !== 'function') {
      throw new Error('options.onProcess must be a function');
    }
  } else {
    options.onProcess = function () {};
  }

  const zpiFileBuffer = await promisify(readFile)(sourceFile);
  const zip = await JSZip.loadAsync(zpiFileBuffer, options);
  const fileNames = Object.keys(zip.files);
  const filesLen = fileNames.length;
  ensureFunction(options.onLoad)(filesLen);
  let fileIdx = 0;
  for (let fileName of fileNames) {
    const file = zip.files[fileName];
    let filePath = pathJoin(targetFolder, file.name);
    // 如果是目录，就创建这个目录
    if (file.dir) {
      if (!existsSync(filePath)) {
        mkdirSync(filePath);
      }
      ensureFunction(options.onProcess)(filePath, fileIdx + 1, filesLen);
    } else {
      // 如果是文件，就生成该文件
      const binaryData = await file.async('binarystring');
      await promisify(writeFile)(filePath, binaryData, 'binary');
      ensureFunction(options.onProcess)(filePath, fileIdx + 1, filesLen);
    }
    fileIdx += 1;
  }
  return true;
}
