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

var EXPRESSION_REMOVE = /['’-]/g;
var EMPTY = '';

/**
 * Normalize `value`.
 *
 * @param {string} value - Value to normalize.
 * @return {string} - Normalized `value`.
 */
function normalize(value) {
    return (typeof value === 'string' ? value : toString(value))
        .toLowerCase()
        .replace(EXPRESSION_REMOVE, EMPTY);
}

/*
 * Expose.
 */

module.exports = normalize;
