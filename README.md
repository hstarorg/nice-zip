# nice-zip
Simple to zip or unzip archive file.

It used [JSZip](https://github.com/Stuk/jszip) with version 3.0.0

# How to use?

``npm install nice-zip --save``

```javascript
let niceZip = require('nice-zip');
niceZip.unzip('1.zip', 'folder1', {
  onLoad: (len) => {
    console.log(`zip include files(include folders) is: ${len}`);
  },
  onProcess: (path, index, len) => {
    console.log(`Current file is ${path}, the index is ${index}, total count is ${len}`);
  }
});
```

Other options parames: [https://stuk.github.io/jszip/documentation/api_jszip/load_async.html](https://stuk.github.io/jszip/documentation/api_jszip/load_async.html)

You can use JSzip too, like this: 

```javascript
let JSZip = require('nice-zip').JSZip;
```


# How to test?

``npm install ava -g``

``npm test``
