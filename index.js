'use strict';

const path = require('path');
const PdfPrinter = require('pdfmake');
const streamToArray = require('stream-to-array');

const defaultFonts = {
    Roboto: {
        normal: path.join(__dirname, '/fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '/fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '/fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '/fonts/Roboto-MediumItalic.ttf')
    }
};

function Document (docDefinition) {
    this.docDefinition = docDefinition;
}

Document.prototype._createDoc = function () {
    const printer = new PdfPrinter(defaultFonts);
    const doc = printer.createPdfKitDocument(this.docDefinition);
    const parts = streamToArray(doc);
    doc.end();
    return parts;
};

Document.prototype.getBuffer = function (options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    const deferred = this._createDoc(options)
        .then(parts => Buffer.concat(parts));

    if (typeof callback === 'function') {
        deferred.then(result => {
            callback(null, result);
        }, callback);
    }

    return deferred;
};

Document.prototype.getBase64 = function (options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    const deferred = this.getBuffer(options)
        .then(buffer => buffer.toString('base64'));

    if (typeof callback === 'function') {
        deferred.then(result => {
            callback(null, result);
        }, callback);
    }

    return deferred;
};

module.exports = {
    createPdf (docDefinition) {
        return new Document(docDefinition);
    }
};
