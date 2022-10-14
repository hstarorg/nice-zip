import * as JSZip from 'jszip';
import { readdir, stat as fsStat, readFile, writeFile } from 'fs';
import { promisify } from 'util';
import { join as pathJoin, basename } from 'path';

/**
 * 压缩一个目录
 * @param folder
 * @param targetZipFileName
 * @param options
 * @returns
 */
export async function zipFolder(
  folder: string,
  targetZipFileName: string,
  options?: JSZip.JSZipGeneratorOptions<'nodebuffer'>
) {
  return doZip(
    targetZipFileName,
    async (zip) => {
      await addFolderToZip(zip, folder);
    },
    options
  );
}

/**
 * 压缩单个文件
 * @param sourceFileName
 * @param targetZipFileName
 * @param options
 */
export async function zipFile(
  sourceFileName: string,
  targetZipFileName: string,
  options?: JSZip.JSZipGeneratorOptions<'nodebuffer'>
) {
  doZip(
    targetZipFileName,
    async (zip) => {
      const entryName = basename(sourceFileName, '');
      const fileBuffer = await promisify(readFile)(sourceFileName);
      zip.file(entryName, fileBuffer);
    },
    options
  );
}

async function doZip<T extends JSZip.OutputType>(
  targetZipFileName: string,
  onAddEntry: (zip: JSZip) => Promise<void>,
  options?: JSZip.JSZipGeneratorOptions<T>
) {
  const zip = new JSZip();
  const opt: JSZip.JSZipGeneratorOptions = {
    compression: 'DEFLATE',
    ...options,
    type: 'nodebuffer',
  };
  await onAddEntry(zip);
  const zipBuffer = (await zip.generateAsync(opt)) as Buffer;
  await promisify(writeFile)(targetZipFileName, zipBuffer);
  return true;
}

async function addFolderToZip(zip: JSZip, folder: string) {
  const folderItemNames = await promisify(readdir)(folder);
  for (let itemName of folderItemNames) {
    const entryName = pathJoin(folder, itemName);
    const fileStat = await promisify(fsStat)(entryName);
    if (fileStat.isFile()) {
      const fileBuffer = await promisify(readFile)(entryName);
      zip.file(itemName, fileBuffer);
    } else if (fileStat.isDirectory()) {
      const folderZip = zip.folder(itemName);
      addFolderToZip(folderZip, entryName);
    } else {
      // 忽略软硬链接
      console.log('ignore symbolic link entry', entryName);
    }
  }
}
