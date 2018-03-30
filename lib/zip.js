const JSZip = require('jszip');
const fs = require('fs');
const path = require('path');

const addFolderToZip = (zip, folder) => {
  fs.readdirSync(folder).forEach(name => {
    const fileName = path.join(folder, name);
    const stat = fs.statSync(fileName);
    if (stat.isFile()) {
      zip.file(name, fs.readFileSync(fileName));
    } else if (stat.isDirectory()) {
      const folderZip = zip.folder(name);
      addFolderToZip(folderZip, fileName);
    }
  });
};

module.exports = function(folder, filename, options) {
  const zip = new JSZip();
  addFolderToZip(zip, folder);
  return zip.generateAsync({ type: 'nodebuffer' }).then(content => {
    fs.writeFileSync(filename, content);
  });
};
