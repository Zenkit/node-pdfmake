# Node PdfMake

> A wrapper around [pdfmake](https://github.com/bpampuch/pdfmake) to make it easier to use with node.

## Usage

```js
const fs = require('fs');
const createPdfPrinter = require('node-pdfmake');

const printer = createPdfPrinter();

const content = 'This is an sample PDF printed with node-pdfmake';
const document = printer.createPdf({ content });

document.getBuffer().then(buffer => fs.writeFileSync('sample.pdf', buffer));
```

### createPdfPrinter([fonts])

Create a new pdf printer.

#### fonts

Type: `Object`

A `pdfmake` font object (read more [here](https://pdfmake.github.io/docs/getting-started/server-side/))

**Note:** By default `node-pdfmake` includes the default `Roboto` font (default font of `pdfmake`) and the [standard-14-fonts](https://pdfmake.github.io/docs/fonts/standard-14-fonts/)

### printer.createPdf(docDefinition, [options])

Create a new pdf document.

#### docDefinition

Type: `Object`

A `pdfmake` document definition object (read more [here](https://pdfmake.github.io/docs/document-definition-object/))

#### options

Type: `Object`

Some additional options normally set through `pdfmake` (e.g. `tableLayouts`, `progressCallback`)

### document.getStream()

Return the pdf document as a `stream`.

### document.getBuffer()

Return a `Promise` that resolves with the pdf document as a `Buffer`.

### document.getBase64()

Return a `Promise` that resolves with the pdf document encoded as a `base64` string.

### createPdfPrinter.createPdf(docDefinition, [options])

A shortcut to create a pdf document, fonts can be added by defining `options.fonts`

## License

[MIT](https://github.com/Zenkit/node-pdfmake/blob/master/LICENSE)
