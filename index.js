'use strict';

var toString = require('nlcst-to-string');

module.exports = normalize;

var ALL = /[-']/g;
var DASH = /-/g;
var APOSTROPHE = /’/g;
var QUOTE = '\'';
var EMPTY = '';

/* Normalize `value`. */
function normalize(value, options) {
  var settings = options || {};
  var allowApostrophes = settings.allowApostrophes;
  var allowDashes = settings.allowDashes;
  var result = (typeof value === 'string' ? value : toString(value))
    .toLowerCase()
    .replace(APOSTROPHE, QUOTE);

  if (allowApostrophes && allowDashes) {
    return result;
  }

  if (allowApostrophes) {
    return result.replace(DASH, EMPTY);
  }

  if (allowDashes) {
    return result.replace(QUOTE, EMPTY);
  }

  return result.replace(ALL, EMPTY);
}
