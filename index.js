/**
 * @typedef {import('unist').Node} Node
 *
 * @typedef {Object} NormalizeOptions
 * @property {boolean} [allowDashes=false]
 * @property {boolean} [allowApostrophes=false]
 */

import {toString} from 'nlcst-to-string'

/**
 * @param {string|Node|Array.<Node>} node
 * @param {NormalizeOptions} [options={}]
 */
export function normalize(node, options) {
  let value = (typeof node === 'string' ? node : toString(node))
    .toLowerCase()
    .replace(/’/g, "'")

  if (!options || !options.allowDashes) {
    value = value.replace(/-/g, '')
  }

  if (!options || !options.allowApostrophes) {
    value = value.replace(/'/g, '')
  }

  return value
}
