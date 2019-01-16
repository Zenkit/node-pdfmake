'use strict';

const PdfPrinter = require('pdfmake');
const { buffer: streamAsBuffer } = require('get-stream');

const includedFonts = require('./fonts');

const makePdfCreator = printer => (docDefinition, options) => {
    const docStream = printer.createPdfKitDocument(docDefinition, options);
    // NOTE: Directly end the stream because we don't support changing anything
    docStream.end();

    const getStream = () => docStream;
    const getBuffer = () => streamAsBuffer(docStream);
    const getBase64 = () =>
        getBuffer().then(buffer => buffer.toString('base64'));

    return { getStream, getBuffer, getBase64 };
};

const createPdfPrinter = (fonts = {}) => {
  const printer = new PdfPrinter({ ...includedFonts, ...fonts });

    const createPdf = makePdfCreator(printer);
    return { createPdf };
};

module.exports = createPdfPrinter;
module.exports.createPdf = (docDefinition, { fonts, ...options } = {}) =>
    createPdfPrinter(fonts).createPdf(docDefinition, options);
