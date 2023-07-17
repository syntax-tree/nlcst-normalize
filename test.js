import assert from 'node:assert/strict'
import test from 'node:test'
import {normalize} from 'nlcst-normalize'

test('Basic', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('nlcst-normalize')).sort(), [
      'normalize'
    ])
  })

  await t.test('should fail when given a boolean', async function () {
    assert.throws(function () {
      // @ts-expect-error: check how the runtime handles a non-node.
      normalize(true)
    })
  })
})

test('Case', async function (t) {
  await t.test('should normalize case (string)', async function () {
    assert.equal(normalize('Dont'), 'dont')
  })

  await t.test('should normalize case (node)', async function () {
    assert.equal(
      normalize({
        type: 'WordNode',
        children: [{type: 'TextNode', value: 'Dont'}]
      }),
      'dont'
    )
  })

  await t.test('should normalize case (multiple nodes)', async function () {
    assert.equal(
      normalize([
        {type: 'TextNode', value: 'Block'},
        {type: 'PunctuationNode', value: '-'},
        {type: 'TextNode', value: 'level'}
      ]),
      'blocklevel'
    )
  })
})

test('Apostrophes', async function (t) {
  await t.test('should normalize dumb apostrophes (string)', async function () {
    assert.equal(normalize("Don't Block-Level"), 'dont blocklevel')
  })

  await t.test(
    'should normalize smart apostrophes (string)',
    async function () {
      assert.equal(normalize('Don’t Block-Level'), 'dont blocklevel')
    }
  )

  await t.test('should normalize dumb apostrophes (node)', async function () {
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
      'dont blocklevel'
    )
  })

  await t.test('should normalize smart apostrophes (node)', async function () {
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
      'dont blocklevel'
    )
  })

  await t.test(
    'should normalize dumb apostrophes (multiple nodes)',
    async function () {
      assert.equal(
        normalize([
          {type: 'TextNode', value: 'Don'},
          {type: 'PunctuationNode', value: "'"},
          {type: 'TextNode', value: 't '},
          {type: 'TextNode', value: 'Block'},
          {type: 'PunctuationNode', value: '-'},
          {type: 'TextNode', value: 'Level'}
        ]),
        'dont blocklevel'
      )
    }
  )

  await t.test(
    'should normalize smart apostrophes (multiple nodes)',
    async function () {
      assert.equal(
        normalize([
          {type: 'TextNode', value: 'Don'},
          {type: 'PunctuationNode', value: '’'},
          {type: 'TextNode', value: 't '},
          {type: 'TextNode', value: 'Block'},
          {type: 'PunctuationNode', value: '-'},
          {type: 'TextNode', value: 'Level'}
        ]),
        'dont blocklevel'
      )
    }
  )

  await t.test(
    'should normalize dumb apostrophes (string) if false',
    async function () {
      assert.equal(
        normalize("Don't Block-Level", {allowApostrophes: false}),
        'dont blocklevel'
      )
    }
  )

  await t.test(
    'should normalize smart apostrophes (string) if false',
    async function () {
      assert.equal(
        normalize('Don’t Block-Level', {allowApostrophes: false}),
        'dont blocklevel'
      )
    }
  )

  await t.test(
    'should normalize dumb apostrophes (node) if false',
    async function () {
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
        'dont blocklevel'
      )
    }
  )

  await t.test(
    'should normalize smart apostrophes (node) if false',
    async function () {
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
        'dont blocklevel'
      )
    }
  )

  await t.test(
    'should normalize dumb apostrophes (multiple nodes) if false',
    async function () {
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
        'dont blocklevel'
      )
    }
  )

  await t.test(
    'should normalize smart apostrophes (multiple nodes) if false',
    async function () {
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
        'dont blocklevel'
      )
    }
  )

  await t.test(
    'should not normalize dumb apostrophes (string) if true',
    async function () {
      assert.equal(
        normalize("Don't Block-Level", {allowApostrophes: true}),
        "don't blocklevel"
      )
    }
  )

  await t.test(
    'should normalize smart apostrophes (string) if true',
    async function () {
      assert.equal(
        normalize('Don’t Block-Level', {allowApostrophes: true}),
        "don't blocklevel"
      )
    }
  )

  await t.test(
    'should not normalize dumb apostrophes (node) if true',
    async function () {
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
        "don't blocklevel"
      )
    }
  )

  await t.test(
    'should normalize smart apostrophes (node) if true',
    async function () {
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
        "don't blocklevel"
      )
    }
  )

  await t.test(
    'should not normalize dumb apostrophes (multiple nodes) if true',
    async function () {
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
        "don't blocklevel"
      )
    }
  )

  await t.test(
    'should normalize smart apostrophes (multiple nodes) if true',
    async function () {
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
        "don't blocklevel"
      )
    }
  )
})

test('Dashes', async function (t) {
  await t.test('should normalize dashes (string)', async function () {
    assert.equal(normalize("Don't Block-Level"), 'dont blocklevel')
  })

  await t.test('should normalize dashes (node)', async function () {
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
      'dont blocklevel'
    )
  })

  await t.test('should normalize dashes (multiple nodes)', async function () {
    assert.equal(
      normalize([
        {type: 'TextNode', value: 'Don'},
        {type: 'PunctuationNode', value: "'"},
        {type: 'TextNode', value: 't '},
        {type: 'TextNode', value: 'Block'},
        {type: 'PunctuationNode', value: '-'},
        {type: 'TextNode', value: 'Level'}
      ]),
      'dont blocklevel'
    )
  })

  await t.test('should normalize dashes (string) if false', async function () {
    assert.equal(
      normalize("Don't Block-Level", {
        allowApostrophes: false,
        allowDashes: false
      }),
      'dont blocklevel'
    )
  })

  await t.test(
    'should normalize dashes (string) if false and apos true',
    async function () {
      assert.equal(
        normalize("Don't Block-Level", {
          allowApostrophes: true,
          allowDashes: false
        }),
        "don't blocklevel"
      )
    }
  )

  await t.test('should normalize dashes (node) if false', async function () {
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
      'dont blocklevel'
    )
  })

  await t.test(
    'should normalize dashes (node) if false and apos true',
    async function () {
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
        "don't blocklevel"
      )
    }
  )

  await t.test(
    'should normalize dashes (multiple nodes) if false',
    async function () {
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
        'dont blocklevel'
      )
    }
  )

  await t.test(
    'should normalize dashes (multiple nodes) if false and apos true',
    async function () {
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
        "don't blocklevel"
      )
    }
  )

  await t.test(
    'should not normalize dashes (string) if true',
    async function () {
      assert.equal(
        normalize("Don't Block-Level", {
          allowApostrophes: false,
          allowDashes: true
        }),
        'dont block-level'
      )
    }
  )

  await t.test(
    'should not normalize dashes (string) if true and apos true',
    async function () {
      assert.equal(
        normalize("Don't Block-Level", {
          allowApostrophes: true,
          allowDashes: true
        }),
        "don't block-level"
      )
    }
  )

  await t.test('should not normalize dashes (node) if true', async function () {
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
      'dont block-level'
    )
  })

  await t.test(
    'should not normalize dashes (node) if true and apos true',
    async function () {
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
        "don't block-level"
      )
    }
  )

  await t.test(
    'should not normalize dashes (multiple nodes) if true',
    async function () {
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
        'dont block-level'
      )
    }
  )

  await t.test(
    'should not normalize dashes (multiple nodes) if true and apos true',
    async function () {
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
        "don't block-level"
      )
    }
  )
})
