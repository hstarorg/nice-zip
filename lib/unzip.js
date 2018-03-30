const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');
const util = require('./util');

/**
 * 解压指定文件到目标文件夹（文件夹必须存在）
 * @param <sourceFile> 源文件，必须是.zip后缀
 * @param [targetFolder] 解压路径，不提供则默认解压到当前路径
 * @param [options] 解压时的配置参数
 * @returns <Promise>
 */
module.exports = function(sourceFile, targetFolder, options) {
  if (!sourceFile || !fs.existsSync(sourceFile)) {
    throw 'Must provider source file.';
  }
  if (targetFolder) {
    if (!fs.existsSync(targetFolder)) {
      throw 'Target folder not exists.';
    }
  } else {
    targetFolder = path.join(path.dirname(sourceFile), util.getFileName(sourceFile));
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder);
    }
  }
  options = options || {};
  if (options.onProcess) {
    if (typeof options.onProcess !== 'function') {
      throw 'options.onProcess must be a function';
    }
  } else {
    options.onProcess = function() {};
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
              file
                .async('binarystring')
                .then(binaryData => {
                  fs.writeFileSync(filePath, binaryData, 'binary');
                  options.onProcess(filePath, i + 1, len);
                  if (i === len - 1) {
                    resolve(true);
                  }
                })
                .catch(reject);
            }
          });
        })
        .catch(reject);
    });
  });
  return promise;
};
