import { basename } from 'path';

function noop() {}

export function ensureFunction(fn: unknown) {
  return typeof fn === 'function' ? (fn as Function) : noop;
}

/**
 * 从文件路径中，获取文件名
 * @param {string} filePath 文件路径
 * @param {bool} includeExtName 是否返回带扩展名的文件名
 */
export function getFileName(filePath: string, includeExtName: boolean = false) {
  let fileName = basename(filePath);
  // 不包含扩展名，意味着需要删除扩展名
  if (includeExtName !== true) {
    fileName = fileName.substring(0, fileName.lastIndexOf('.'));
  }
  return fileName;
}
