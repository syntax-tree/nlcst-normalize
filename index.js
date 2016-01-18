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
 * @return {string} - Normalized `value`.
 */
function normalize(value, allowApostrophes) {
    var result = (typeof value === 'string' ? value : toString(value))
        .toLowerCase();

    if (allowApostrophes) {
        return result
            .replace(APOSTROPHE, QUOTE)
            .replace(DASH, EMPTY);
    }

    return result.replace(ALL, EMPTY);
}

/*
 * Expose.
 */

module.exports = normalize;
