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

var ALL = /[-'’]/g;
var DASH = /-/g;
var APOSTROPHE = /’/g;
var QUOTE = '\'';
var EMPTY = '';

/**
 * Normalize `value`.
 *
 * @param {string} value - Value to normalize.
 * @param {boolean} allowApostrophes - Do not strip
 *   apostrophes.
 * @param {boolean} allowDashes - Do not strip
 *   dashes.
 * @return {string} - Normalized `value`.
 */
function normalize(value, allowApostrophes, allowDashes) {
    var result = (typeof value === 'string' ? value : toString(value))
        .toLowerCase();

    if (allowApostrophes && allowDashes) {
        return result;
    }

    if (allowApostrophes) {
        return result
            .replace(APOSTROPHE, QUOTE)
            .replace(DASH, EMPTY);

    }

    if (allowDashes) {
        return result
            .replace(APOSTROPHE, EMPTY)
            .replace(QUOTE, EMPTY);
    }

    return result.replace(ALL, EMPTY);
}

/*
 * Expose.
 */

module.exports = normalize;
