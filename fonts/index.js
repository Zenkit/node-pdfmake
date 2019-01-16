'use strict';

const path = require('path');

// NOTE: Default font
const Roboto = {
    normal: path.join(__dirname, 'Roboto-Regular.ttf'),
    bold: path.join(__dirname, 'Roboto-Medium.ttf'),
    italics: path.join(__dirname, 'Roboto-Italic.ttf'),
    bolditalics: path.join(__dirname, 'Roboto-MediumIt alic.ttf'),
};

// NOTE: Standard 14 fonts
const Courier = {
    normal: 'Courier',
    bold: 'Courier-Bold',
    italics: 'Courier-Oblique',
    bolditalics: 'Courier-BoldOblique',
};

const Helvetica = {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique',
};

const Times = {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic',
};

module.exports = {
    Roboto,
    Courier,
    Helvetica,
    Times,
    Symbol: { normal: 'Symbol' },
    ZapfDingbats: { normal: 'ZapfDingbats' },
};
