# nlcst-normalize

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**nlcst**][nlcst] utility to normalize a word for easier comparison.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install nlcst-normalize
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

This package exports the following identifiers: `normalize`.
There is no default export.

### `normalize(value[, options])`

Normalize a word (`string`, [`Node`][node], `Array.<Node>`) for easier
comparison.
Always normalizes smart apostrophes (`’`) to straight apostrophes (`'`) and
lowercases alphabetical characters (`[A-Z]`).

###### `options.allowApostrophes`

`boolean`, default: `false` — Do not strip apostrophes (`'`).

###### `options.allowDashes`

`boolean`, default: `false` — Do not strip hyphens (`-`).

## Related

*   [`nlcst-is-literal`](https://github.com/syntax-tree/nlcst-is-literal)
    — Check whether a node is meant literally
*   [`nlcst-search`](https://github.com/syntax-tree/nlcst-search)
    — Search for patterns

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
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

[size-badge]: https://img.shields.io/bundlephobia/minzip/nlcst-normalize.svg

[size]: https://bundlephobia.com/result?p=nlcst-normalize

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/HEAD/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/HEAD/support.md

[coc]: https://github.com/syntax-tree/.github/blob/HEAD/code-of-conduct.md

[nlcst]: https://github.com/syntax-tree/nlcst

[node]: https://github.com/syntax-tree/unist#node
