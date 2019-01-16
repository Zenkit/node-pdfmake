# Node PDFMake

This is a wrapper around [pdfmake](https://github.com/bpampuch/pdfmake) to allow
~~client/~~**server** side PDF ~~printing~~ **creation** in pure JavaScript.

## Usage

For the `docDefinition` options see the [pdfmake documentation](https://github.com/bpampuch/pdfmake#document-definition-object).

### createPdf(docDefinition)

```js
var pdfDocGenerator = nodePDFMake.createPdf(docDefinition);
```

### getBuffer([options], [callback(err, buffer)])

Returns the created PDF as a `Buffer`.

```js
pdfDocGenerator.getBuffer(function(err, buffer) {
  // ...
});
```

If `callback` is not defined, then it returns a promise.

```js
pdfDocGenerator.getBuffer().then(function(buffer) {
  // ...
});
```

### getBase64([options], [callback(err, data)])

Returns the created PDF as a `base64` encoded string.

```js
pdfDocGenerator.getBase64(function(err, data) {
  // ...
});
```

If `callback` is not defined, then it returns a promise.

```js
pdfDocGenerator.getBase64().then(function(data) {
  // ...
});
```

## License

[MIT](https://github.com/Zenkit/node-pdfmake/blob/master/LICENSE)
