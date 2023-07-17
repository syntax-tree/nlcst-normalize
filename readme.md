# nlcst-normalize

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[nlcst][] utility to normalize a word for easier comparison.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`normalize(value[, options])`](#normalizevalue-options)
    *   [`Options`](#options)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This utility serializes a node and cleans it.

## When should I use this?

This package is a tiny utility that helps when comparing natural language to
word lists.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install nlcst-normalize
```

In Deno with [`esm.sh`][esmsh]:

```js
import {normalize} from 'https://esm.sh/nlcst-normalize@4'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {normalize} from 'https://esm.sh/nlcst-normalize@4?bundle'
</script>
```

## Use

```js
import {normalize} from 'nlcst-normalize'

normalize("Don't") // => 'dont'
normalize('Don’t') // => 'dont'
normalize('Don’t', {allowApostrophes: true}) // => 'don\'t'
normalize('Block-level') // => 'blocklevel'
normalize('Block-level', {allowDashes: true}) // => 'block-level'

normalize({
  type: 'WordNode',
  children: [
    {type: 'TextNode', value: 'Block'},
    {type: 'PunctuationNode', value: '-'},
    {type: 'TextNode', value: 'level'}
  ]
}) // => 'blocklevel'
```

## API

This package exports the identifier [`normalize`][api-normalize].
There is no default export.

### `normalize(value[, options])`

Normalize a word for easier comparison.

Always normalizes smart apostrophes (`’`) to straight apostrophes (`'`) and
lowercases alphabetical characters (`[A-Z]`).

###### Parameters

*   `value` ([`Array<Node>`][node], `Node`, or `string`)
    — word
*   `options` ([`Options`][api-options], optional)
    — configuration

###### Returns

Normalized word (`string`).

### `Options`

Configuration (TypeScript type).

###### Fields

*   `allowApostrophes` (`boolean`, default: `false`)
    — do not strip apostrophes (`'`); the default is to remove apostrophes
*   `allowDashes` (`boolean`, default: `false`)
    — Do not strip hyphens (`-`); the default is to remove the hyphen-minus
    character

## Types

This package is fully typed with [TypeScript][].
It exports the additional types [`Options`][api-options].

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line, `nlcst-normalize@^4`,
compatible with Node.js 16.

## Related

*   [`nlcst-is-literal`](https://github.com/syntax-tree/nlcst-is-literal)
    — check whether a node is meant literally
*   [`nlcst-search`](https://github.com/syntax-tree/nlcst-search)
    — search for patterns

## Contribute

See [`contributing.md`][contributing] in [`syntax-tree/.github`][health] for
ways to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/syntax-tree/nlcst-normalize/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/nlcst-normalize/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/nlcst-normalize.svg

[coverage]: https://codecov.io/github/syntax-tree/nlcst-normalize

[downloads-badge]: https://img.shields.io/npm/dm/nlcst-normalize.svg

[downloads]: https://www.npmjs.com/package/nlcst-normalize

[size-badge]: https://img.shields.io/badge/dynamic/json?label=minzipped%20size&query=$.size.compressedSize&url=https://deno.bundlejs.com/?q=nlcst-normalize

[size]: https://bundlejs.com/?q=nlcst-normalize

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[license]: license

[author]: https://wooorm.com

[health]: https://github.com/syntax-tree/.github

[contributing]: https://github.com/syntax-tree/.github/blob/main/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/main/support.md

[coc]: https://github.com/syntax-tree/.github/blob/main/code-of-conduct.md

[nlcst]: https://github.com/syntax-tree/nlcst

[node]: https://github.com/syntax-tree/unist#node

[api-normalize]: #normalizevalue-options

[api-options]: #options
