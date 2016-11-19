# nlcst-normalize [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Normalize a word for easier comparison, useful for [NLCST][nlcst]

## Installation

[npm][]:

```bash
npm install nlcst-normalize
```

## Usage

```js
var normalize = require('nlcst-normalize');

normalize('Don’t'); //=> 'dont'
normalize('Don\'t'); //=> 'dont'
normalize('Block-level'); //=> 'blocklevel'
normalize('Don’t', true); //=> 'don\'t'

normalize({
  type: 'WordNode',
  children: [
    {type: 'TextNode', value: 'Block'},
    {type: 'PunctuationNode', value: '-'},
    {type: 'TextNode', value: 'level'}
  ]
}); //=> 'blocklevel'
```

## API

### `normalize(value[, options])`

Normalize a word (often a node) for easier comparison.  Always
normalises smart apostrophes (`’`) to straight apostrophes (`'`).
And, lowercases alphabetical characters (`[A-Z]`).

###### Parameters

*   `value` ([`Node`][nlcst-node], `Array.<Node>`, or `string`)
    — Value to normalize;
*   `options` (`Object?`):

    *   `allowApostrophes` (`boolean`, default: `false`)
        — Do not strip apostrophes (`'`);
    *   `allowDashes` (`boolean`, default: `false`)
        — Do not strip hyphens (`-`).

###### Returns

`string` — Normalized value.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/nlcst-normalize.svg

[travis]: https://travis-ci.org/wooorm/nlcst-normalize

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/nlcst-normalize.svg

[codecov]: https://codecov.io/github/wooorm/nlcst-normalize

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[nlcst]: https://github.com/wooorm/nlcst

[nlcst-node]: https://github.com/wooorm/nlcst#node
