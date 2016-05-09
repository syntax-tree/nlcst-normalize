/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module nlcst:normalize
 * @fileoverview Normalize a word for easier comparison.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var toString = require('nlcst-to-string');

/*
 * Constants.
 */

var ALL = /[-']/g;
var DASH = /-/g;
var APOSTROPHE = /’/g;
var QUOTE = '\'';
var EMPTY = '';

/**
 * Normalize `value`.
 *
 * @param {string} value - Value to normalize.
 * @param {Object?} options - Control stripping
 *   apostrophes and dashes.
 * @return {string} - Normalized `value`.
 */
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

/*
 * Expose.
 */

module.exports = normalize;
