'use strict'

var path = require('path')
var PdfPrinter = require('pdfmake')
var streamToArray = require('stream-to-array')

var defaultFonts = {}

function Document (docDefinition, renderOptions) {
  this.docDefinition = docDefinition
  this.renderOptions = renderOptions
}

Document.prototype._createDoc = function (options) {
  options = options || {}

  var userLanguage = this.renderOptions.userLanguage

// pdfMake requires the objects defaultFonts and Roboto to be passed to it regardless of what actual fonts are used. This way we don't have to add any custom fonts to the pdfmake dependency directly. 
  if (userLanguage === 'zh' || userLanguage === 'ko') {
    defaultFonts = {
      Roboto: {
        //Source Han Sans supports Latin orthography + CJK but not Cyrillic or Greek 
        normal: path.join(__dirname, '/fonts/SourceHanSans-Normal.ttf'),
        bold: path.join(__dirname, '/fonts/SourceHanSans-Medium.ttf'),
        italics: path.join(__dirname, '/fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '/fonts/Roboto-MediumItalic.ttf')
      }
    }
  } else {
    defaultFonts = {
        Roboto: {
          //Roboto supports all major European orthographies but not CJK
          normal: path.join(__dirname, '/fonts/Roboto-Regular.ttf'),
          bold: path.join(__dirname, '/fonts/Roboto-Medium.ttf'),
          italics: path.join(__dirname, '/fonts/Roboto-Italic.ttf'),
          bolditalics: path.join(__dirname, '/fonts/Roboto-MediumItalic.ttf')
        }
      }
    }

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
  createPdf: function (docDefinition, renderOptions) {
    return new Document(docDefinition, renderOptions)
  }
}