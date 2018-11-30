'use strict'

var path = require('path')
var PdfPrinter = require('pdfmake')
var streamToArray = require('stream-to-array')

var defaultFonts = {
  Roboto: {
    normal: path.join(__dirname, '/fonts/Roboto-Regular.ttf'),
    bold: path.join(__dirname, '/fonts/Roboto-Medium.ttf'),
    italics: path.join(__dirname, '/fonts/Roboto-Italic.ttf'),
    bolditalics: path.join(__dirname, '/fonts/Roboto-MediumItalic.ttf')
  }
}

function Document (docDefinition) {
function Document (docDefinition, renderOptions) {
  this.docDefinition = docDefinition
  this.renderOptions = renderOptions
}

Document.prototype._createDoc = function (options) {
  options = options || {}
  var printer = new PdfPrinter(defaultFonts)
  var doc = printer.createPdfKitDocument(this.docDefinition)
  var parts = streamToArray(doc)
  doc.end()
  return parts
}

Document.prototype.getBuffer = function (options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  var deferred = this._createDoc(options)
    .then(function (parts) {
      return Buffer.concat(parts)
    })

  if (typeof callback === 'function') {
    deferred.then(function (result) {
      callback(null, result)
    }, callback)
  }

  return deferred
}

Document.prototype.getBase64 = function (options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  var deferred = this.getBuffer(options)
  .then(function (buffer) {
    return buffer.toString('base64')
  })

  if (typeof callback === 'function') {
    deferred.then(function (result) {
      callback(null, result)
    }, callback)
  }

  return deferred
}

module.exports = {
  createPdf: function (docDefinition) {
    return new Document(docDefinition)
  createPdf: function (docDefinition, renderOptions) {
    return new Document(docDefinition, renderOptions)
  }
}