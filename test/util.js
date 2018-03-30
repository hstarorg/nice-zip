const fse = require('fs-extra');
const path = require('path');

module.exports = {
  ensureDirSync(folder) {
    fse.ensureDirSync(folder);
  },
  testRoot(...args) {
    return path.join(__dirname, ...args);
  },
  tryCleanFolder(folder) {
    if (!fse.existsSync(folder)) {
      return;
    }
    let stat = fse.statSync(folder);
    if (stat.isDirectory()) {
      fse.readdirSync(folder).forEach((item, i) => {
        this.tryCleanFolder(path.join(folder, item));
      });
      fse.rmdirSync(folder);
    } else {
      fse.unlinkSync(folder);
    }
  }
};
