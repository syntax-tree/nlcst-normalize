import assert from 'node:assert/strict'
import test from 'node:test'
import {normalize} from './index.js'
import * as mod from './index.js'

test('Basic', () => {
  assert.deepEqual(
    Object.keys(mod).sort(),
    ['normalize'],
    'should expose the public api'
  )

  assert.throws(() => {
    // @ts-expect-error runtime.
    normalize(true)
  }, 'should fail when given a boolean')
})

test('Case', () => {
  assert.equal(normalize('Dont'), 'dont', 'should normalize case (string)')

  assert.equal(
    normalize({
      type: 'WordNode',
      children: [{type: 'TextNode', value: 'Dont'}]
    }),
    'dont',
    'should normalize case (node)'
  )

  assert.equal(
    normalize([
      {type: 'TextNode', value: 'Block'},
      {type: 'PunctuationNode', value: '-'},
      {type: 'TextNode', value: 'level'}
    ]),
    'blocklevel',
    'should normalize case (multiple nodes)'
  )
})

test('Apostrophes', () => {
  assert.equal(
    normalize("Don't Block-Level"),
    'dont blocklevel',
    'should normalize dumb apostrophes (string)'
  )

  assert.equal(
    normalize('Don’t Block-Level'),
    'dont blocklevel',
    'should normalize smart apostrophes (string)'
  )

  assert.equal(
    normalize({
      type: 'WordNode',
      children: [
        {type: 'TextNode', value: 'Don'},
        {type: 'PunctuationNode', value: "'"},
        {type: 'TextNode', value: 't '},
        {type: 'TextNode', value: 'Block'},
        {type: 'PunctuationNode', value: '-'},
        {type: 'TextNode', value: 'Level'}
      ]
    }),
    'dont blocklevel',
    'should normalize dumb apostrophes (node)'
  )

  assert.equal(
    normalize({
      type: 'WordNode',
      children: [
        {type: 'TextNode', value: 'Don'},
        {type: 'PunctuationNode', value: '’'},
        {type: 'TextNode', value: 't '},
        {type: 'TextNode', value: 'Block'},
        {type: 'PunctuationNode', value: '-'},
        {type: 'TextNode', value: 'Level'}
      ]
    }),
    'dont blocklevel',
    'should normalize smart apostrophes (node)'
  )

  assert.equal(
    normalize([
      {type: 'TextNode', value: 'Don'},
      {type: 'PunctuationNode', value: "'"},
      {type: 'TextNode', value: 't '},
      {type: 'TextNode', value: 'Block'},
      {type: 'PunctuationNode', value: '-'},
      {type: 'TextNode', value: 'Level'}
    ]),
    'dont blocklevel',
    'should normalize dumb apostrophes (multiple nodes)'
  )

  assert.equal(
    normalize([
      {type: 'TextNode', value: 'Don'},
      {type: 'PunctuationNode', value: '’'},
      {type: 'TextNode', value: 't '},
      {type: 'TextNode', value: 'Block'},
      {type: 'PunctuationNode', value: '-'},
      {type: 'TextNode', value: 'Level'}
    ]),
    'dont blocklevel',
    'should normalize smart apostrophes (multiple nodes)'
  )

  assert.equal(
    normalize("Don't Block-Level", {allowApostrophes: false}),
    'dont blocklevel',
    'should normalize dumb apostrophes (string) if false'
  )

  assert.equal(
    normalize('Don’t Block-Level', {allowApostrophes: false}),
    'dont blocklevel',
    'should normalize smart apostrophes (string) if false'
  )

  assert.equal(
    normalize(
      {
        type: 'WordNode',
        children: [
          {type: 'TextNode', value: 'Don'},
          {type: 'PunctuationNode', value: "'"},
          {type: 'TextNode', value: 't '},
          {type: 'TextNode', value: 'Block'},
          {type: 'PunctuationNode', value: '-'},
          {type: 'TextNode', value: 'Level'}
        ]
      },
      {allowApostrophes: false}
    ),
    'dont blocklevel',
    'should normalize dumb apostrophes (node) if false'
  )

  assert.equal(
    normalize(
      {
        type: 'WordNode',
        children: [
          {type: 'TextNode', value: 'Don'},
          {type: 'PunctuationNode', value: '’'},
          {type: 'TextNode', value: 't '},
          {type: 'TextNode', value: 'Block'},
          {type: 'PunctuationNode', value: '-'},
          {type: 'TextNode', value: 'Level'}
        ]
      },
      {allowApostrophes: false}
    ),
    'dont blocklevel',
    'should normalize smart apostrophes (node) if false'
  )

  assert.equal(
    normalize(
      [
        {type: 'TextNode', value: 'Don'},
        {type: 'PunctuationNode', value: "'"},
        {type: 'TextNode', value: 't '},
        {type: 'TextNode', value: 'Block'},
        {type: 'PunctuationNode', value: '-'},
        {type: 'TextNode', value: 'Level'}
      ],
      {allowApostrophes: false}
    ),
    'dont blocklevel',
    'should normalize dumb apostrophes (multiple nodes) if false'
  )

  assert.equal(
    normalize(
      [
        {type: 'TextNode', value: 'Don'},
        {type: 'PunctuationNode', value: '’'},
        {type: 'TextNode', value: 't '},
        {type: 'TextNode', value: 'Block'},
        {type: 'PunctuationNode', value: '-'},
        {type: 'TextNode', value: 'Level'}
      ],
      {allowApostrophes: false}
    ),
    'dont blocklevel',
    'should normalize smart apostrophes (multiple nodes) if false'
  )

  assert.equal(
    normalize("Don't Block-Level", {allowApostrophes: true}),
    "don't blocklevel",
    'should not normalize dumb apostrophes (string) if true'
  )

  assert.equal(
    normalize('Don’t Block-Level', {allowApostrophes: true}),
    "don't blocklevel",
    'should normalize smart apostrophes (string) if true'
  )

  assert.equal(
    normalize(
      {
        type: 'WordNode',
        children: [
          {type: 'TextNode', value: 'Don'},
          {type: 'PunctuationNode', value: "'"},
          {type: 'TextNode', value: 't '},
          {type: 'TextNode', value: 'Block'},
          {type: 'PunctuationNode', value: '-'},
          {type: 'TextNode', value: 'Level'}
        ]
      },
      {allowApostrophes: true}
    ),
    "don't blocklevel",
    'should not normalize dumb apostrophes (node) if true'
  )

  assert.equal(
    normalize(
      {
        type: 'WordNode',
        children: [
          {type: 'TextNode', value: 'Don'},
          {type: 'PunctuationNode', value: '’'},
          {type: 'TextNode', value: 't '},
          {type: 'TextNode', value: 'Block'},
          {type: 'PunctuationNode', value: '-'},
          {type: 'TextNode', value: 'Level'}
        ]
      },
      {allowApostrophes: true}
    ),
    "don't blocklevel",
    'should normalize smart apostrophes (node) if true'
  )

  assert.equal(
    normalize(
      [
        {type: 'TextNode', value: 'Don'},
        {type: 'PunctuationNode', value: "'"},
        {type: 'TextNode', value: 't '},
        {type: 'TextNode', value: 'Block'},
        {type: 'PunctuationNode', value: '-'},
        {type: 'TextNode', value: 'Level'}
      ],
      {allowApostrophes: true}
    ),
    "don't blocklevel",
    'should not normalize dumb apostrophes (multiple nodes) if true'
  )

  assert.equal(
    normalize(
      [
        {type: 'TextNode', value: 'Don'},
        {type: 'PunctuationNode', value: '’'},
        {type: 'TextNode', value: 't '},
        {type: 'TextNode', value: 'Block'},
        {type: 'PunctuationNode', value: '-'},
        {type: 'TextNode', value: 'Level'}
      ],
      {allowApostrophes: true}
    ),
    "don't blocklevel",
    'should normalize smart apostrophes (multiple nodes) if true'
  )
})

test('Dashes', () => {
  assert.equal(
    normalize("Don't Block-Level"),
    'dont blocklevel',
    'should normalize dashes (string)'
  )

  assert.equal(
    normalize({
      type: 'WordNode',
      children: [
        {type: 'TextNode', value: 'Don'},
        {type: 'PunctuationNode', value: "'"},
        {type: 'TextNode', value: 't '},
        {type: 'TextNode', value: 'Block'},
        {type: 'PunctuationNode', value: '-'},
        {type: 'TextNode', value: 'Level'}
      ]
    }),
    'dont blocklevel',
    'should normalize dashes (node)'
  )

  assert.equal(
    normalize([
      {type: 'TextNode', value: 'Don'},
      {type: 'PunctuationNode', value: "'"},
      {type: 'TextNode', value: 't '},
      {type: 'TextNode', value: 'Block'},
      {type: 'PunctuationNode', value: '-'},
      {type: 'TextNode', value: 'Level'}
    ]),
    'dont blocklevel',
    'should normalize dashes (multiple nodes)'
  )

  assert.equal(
    normalize("Don't Block-Level", {
      allowApostrophes: false,
      allowDashes: false
    }),
    'dont blocklevel',
    'should normalize dashes (string) if false'
  )

  assert.equal(
    normalize("Don't Block-Level", {
      allowApostrophes: true,
      allowDashes: false
    }),
    "don't blocklevel",
    'should normalize dashes (string) if false and apos true'
  )

  assert.equal(
    normalize(
      {
        type: 'WordNode',
        children: [
          {type: 'TextNode', value: 'Don'},
          {type: 'PunctuationNode', value: "'"},
          {type: 'TextNode', value: 't '},
          {type: 'TextNode', value: 'Block'},
          {type: 'PunctuationNode', value: '-'},
          {type: 'TextNode', value: 'Level'}
        ]
      },
      {
        allowApostrophes: false,
        allowDashes: false
      }
    ),
    'dont blocklevel',
    'should normalize dashes (node) if false'
  )

  assert.equal(
    normalize(
      {
        type: 'WordNode',
        children: [
          {type: 'TextNode', value: 'Don'},
          {type: 'PunctuationNode', value: "'"},
          {type: 'TextNode', value: 't '},
          {type: 'TextNode', value: 'Block'},
          {type: 'PunctuationNode', value: '-'},
          {type: 'TextNode', value: 'Level'}
        ]
      },
      {allowApostrophes: true, allowDashes: false}
    ),
    "don't blocklevel",
    'should normalize dashes (node) if false and apos true'
  )

  assert.equal(
    normalize(
      [
        {type: 'TextNode', value: 'Don'},
        {type: 'PunctuationNode', value: "'"},
        {type: 'TextNode', value: 't '},
        {type: 'TextNode', value: 'Block'},
        {type: 'PunctuationNode', value: '-'},
        {type: 'TextNode', value: 'Level'}
      ],
      {allowApostrophes: false, allowDashes: false}
    ),
    'dont blocklevel',
    'should normalize dashes (multiple nodes) if false'
  )

  assert.equal(
    normalize(
      [
        {type: 'TextNode', value: 'Don'},
        {type: 'PunctuationNode', value: "'"},
        {type: 'TextNode', value: 't '},
        {type: 'TextNode', value: 'Block'},
        {type: 'PunctuationNode', value: '-'},
        {type: 'TextNode', value: 'Level'}
      ],
      {allowApostrophes: true, allowDashes: false}
    ),
    "don't blocklevel",
    'should normalize dashes (multiple nodes) if false and apos true'
  )

  assert.equal(
    normalize("Don't Block-Level", {
      allowApostrophes: false,
      allowDashes: true
    }),
    'dont block-level',
    'should not normalize dashes (string) if true'
  )

  assert.equal(
    normalize("Don't Block-Level", {
      allowApostrophes: true,
      allowDashes: true
    }),
    "don't block-level",
    'should not normalize dashes (string) if true and apos true'
  )

  assert.equal(
    normalize(
      {
        type: 'WordNode',
        children: [
          {type: 'TextNode', value: 'Don'},
          {type: 'PunctuationNode', value: "'"},
          {type: 'TextNode', value: 't '},
          {type: 'TextNode', value: 'Block'},
          {type: 'PunctuationNode', value: '-'},
          {type: 'TextNode', value: 'Level'}
        ]
      },
      {allowApostrophes: false, allowDashes: true}
    ),
    'dont block-level',
    'should not normalize dashes (node) if true'
  )

  assert.equal(
    normalize(
      {
        type: 'WordNode',
        children: [
          {type: 'TextNode', value: 'Don'},
          {type: 'PunctuationNode', value: "'"},
          {type: 'TextNode', value: 't '},
          {type: 'TextNode', value: 'Block'},
          {type: 'PunctuationNode', value: '-'},
          {type: 'TextNode', value: 'Level'}
        ]
      },
      {allowApostrophes: true, allowDashes: true}
    ),
    "don't block-level",
    'should not normalize dashes (node) if true and apos true'
  )

  assert.equal(
    normalize(
      [
        {type: 'TextNode', value: 'Don'},
        {type: 'PunctuationNode', value: "'"},
        {type: 'TextNode', value: 't '},
        {type: 'TextNode', value: 'Block'},
        {type: 'PunctuationNode', value: '-'},
        {type: 'TextNode', value: 'Level'}
      ],
      {allowApostrophes: false, allowDashes: true}
    ),
    'dont block-level',
    'should not normalize dashes (multiple nodes) if true'
  )

  assert.equal(
    normalize(
      [
        {type: 'TextNode', value: 'Don'},
        {type: 'PunctuationNode', value: "'"},
        {type: 'TextNode', value: 't '},
        {type: 'TextNode', value: 'Block'},
        {type: 'PunctuationNode', value: '-'},
        {type: 'TextNode', value: 'Level'}
      ],
      {allowApostrophes: true, allowDashes: true}
    ),
    "don't block-level",
    'should not normalize dashes (multiple nodes) if true and apos true'
  )
})
