# nice-zip

Simple to zip or unzip archive file.

It used [JSZip](https://github.com/Stuk/jszip) with version 3.x

# How to use?

`npm install nice-zip --save`

```ts
import niceZip from 'nice-zip';

// Extra zip package to special folder
niceZip.unzip('1.zip', 'folder1', {
  onLoad: (len) => {
    console.log(`zip include files(include folders) is: ${len}`);
  },
  onProcess: (path, index, len) => {
    console.log(`Current file is ${path}, the index is ${index}, total count is ${len}`);
  },
});

// Zip folder to a zip file
const promise = niceZip.zipFolder(folder, targetPath);
```

Other options parames: [https://stuk.github.io/jszip/documentation/api_jszip/load_async.html](https://stuk.github.io/jszip/documentation/api_jszip/load_async.html)

You can use JSzip too, like this:

```ts
const JSZip = require('nice-zip').JSZip;
```

# How to develop

## Develop

```bash
npm run dev
```

## Test

```bash
# 运行测试
npm test

# 运行测试并计算代码覆盖率
npm run cov
```

## Publish

```bash
npm run pub
```
