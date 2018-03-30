const path = require('path');

module.exports = {
  /**
   * 从文件路径中，获取文件名
   * @param {string} filePath 文件路径
   * @param {bool} needExt 是否返回带扩展名的文件名
   */
  getFileName(filePath, needExt) {
    let fileName = path.basename(filePath);
    // 不需要扩展名
    if (needExt !== true) {
      fileName = fileName.substring(0, fileName.lastIndexOf('.'));
    }
    return fileName;
  }
};
