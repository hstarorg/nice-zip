'use strict';

let fs = require('fs');
let path = require('path');
let JSZip = require('jszip');

/**
 * 获取文件名
 * @param <filePath> 文件路径
 * @param [includeExtName] 是否包含扩展名，默认不包含
 * @returns <string> 文件名
 */
let getFileName = (filePath, includeExtName) => {
  let fileName = path.basename(filePath);
  if (includeExtName !== true) {
    fileName = fileName.substring(0, fileName.lastIndexOf('.'));
  }
  return fileName;
}

/**
 * 解压指定文件到目标文件夹（文件夹必须存在）
 * @param <sourceFile> 源文件，必须是.zip后缀
 * @param [targetFolder] 解压路径，不提供则默认解压到当前路径
 * @param [options] 解压时的配置参数
 * @returns <Promise> 
 */
let unzipFile = (sourceFile, targetFolder, options) => {
  if (!sourceFile || !fs.existsSync(sourceFile)) {
    throw 'Must provider source file.';
  }
  if (targetFolder) {
    if (!fs.existsSync(targetFolder)) {
      throw 'Target folder not exists.';
    }
  } else {
    targetFolder = path.join(path.dirname(sourceFile), getFileName(sourceFile));
    if(!fs.existsSync(targetFolder)){
      fs.mkdir(targetFolder);
    }
  }
  options = options || {};
  if (options.onProcess) {
    if (typeof options.onProcess !== 'function') {
      throw 'options.onProcess must be a function';
    }
  } else {
    options.onProcess = function () { };
  }
  let promise = new Promise((resolve, reject) => {
    fs.readFile(sourceFile, (err, data) => {
      if (err) {
        return reject(err);
      }
      JSZip.loadAsync(data, options)
        .then(zip => {
          let files = Object.keys(zip.files);
          typeof options.onLoad === 'function' && options.onLoad(files.length);
          let len = files.length;
          files.forEach((fileName, i) => {
            let file = zip.files[fileName];
            let filePath = path.join(targetFolder, file.name);
            if (file.dir) {
              if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath);
              }
              options.onProcess(filePath, i + 1, len);
              if (i === len - 1) {
                resolve(true);
              }
            } else {
              file.async('binarystring')
                .then(binaryData => {
                  fs.writeFileSync(filePath, binaryData, 'binary');
                  options.onProcess(filePath, i + 1, len);
                  if (i === len - 1) {
                    resolve(true);
                  }
                }).catch(reject);
            }
          });
        })
        .catch(reject);
    });
  });
  return promise;
};

module.exports = {
  unzipFile: unzipFile
};