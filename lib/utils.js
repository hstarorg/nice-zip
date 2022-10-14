"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileName = exports.ensureFunction = void 0;
var path_1 = require("path");
function noop() { }
function ensureFunction(fn) {
    return typeof fn === 'function' ? fn : noop;
}
exports.ensureFunction = ensureFunction;
/**
 * 从文件路径中，获取文件名
 * @param {string} filePath 文件路径
 * @param {bool} includeExtName 是否返回带扩展名的文件名
 */
function getFileName(filePath, includeExtName) {
    if (includeExtName === void 0) { includeExtName = false; }
    var fileName = (0, path_1.basename)(filePath);
    // 不包含扩展名，意味着需要删除扩展名
    if (includeExtName !== true) {
        fileName = fileName.substring(0, fileName.lastIndexOf('.'));
    }
    return fileName;
}
exports.getFileName = getFileName;
