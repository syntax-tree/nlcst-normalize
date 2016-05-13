/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module nlcst-normalize
 * @fileoverview Test suite for `nlcst-normalize`.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var normalize = require('./');

/*
 * Tests.
 */

test('Basic', function (t) {
    t.throws(
        function () {
            normalize(true);
        },
        'should fail when given a boolean'
    );

    t.end();
});

test('Case', function (t) {
    t.equal(
        normalize('Dont'),
        'dont',
        'should normalize case (string)'
    );

    t.equal(
        normalize({
            'type': 'WordNode',
            'children': [
                {
                    'type': 'TextNode',
                    'value': 'Dont'
                }
            ]
        }),
        'dont',
        'should normalize case (node)'
    );

    t.equal(
        normalize([
            {
                'type': 'TextNode',
                'value': 'Block'
            },
            {
                'type': 'PunctuationNode',
                'value': '-'
            },
            {
                'type': 'TextNode',
                'value': 'level'
            }
        ]),
        'blocklevel',
        'should normalize case (multiple nodes)'
    );

    t.end();
});

test('Apostrophes', function (t) {
    t.equal(
        normalize('Don\'t Block-Level'),
        'dont blocklevel',
        'should normalize dumb apostrophes (string)'
    );

    t.equal(
        normalize('Don’t Block-Level'),
        'dont blocklevel',
        'should normalize smart apostrophes (string)'
    );

    t.equal(
        normalize({
            'type': 'WordNode',
            'children': [
                {
                    'type': 'TextNode',
                    'value': 'Don'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '\''
                },
                {
                    'type': 'TextNode',
                    'value': 't '
                },
                {
                    'type': 'TextNode',
                    'value': 'Block'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '-'
                },
                {
                    'type': 'TextNode',
                    'value': 'Level'
                }
            ]
        }),
        'dont blocklevel',
        'should normalize dumb apostrophes (node)'
    );

    t.equal(
        normalize({
            'type': 'WordNode',
            'children': [
                {
                    'type': 'TextNode',
                    'value': 'Don'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '’'
                },
                {
                    'type': 'TextNode',
                    'value': 't '
                },
                {
                    'type': 'TextNode',
                    'value': 'Block'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '-'
                },
                {
                    'type': 'TextNode',
                    'value': 'Level'
                }
            ]
        }),
        'dont blocklevel',
        'should normalize smart apostrophes (node)'
    );

    t.equal(
        normalize([
            {
                'type': 'TextNode',
                'value': 'Don'
            },
            {
                'type': 'PunctuationNode',
                'value': '\''
            },
            {
                'type': 'TextNode',
                'value': 't '
            },
            {
                'type': 'TextNode',
                'value': 'Block'
            },
            {
                'type': 'PunctuationNode',
                'value': '-'
            },
            {
                'type': 'TextNode',
                'value': 'Level'
            }
        ]),
        'dont blocklevel',
        'should normalize dumb apostrophes (multiple nodes)'
    );

    t.equal(
        normalize([
            {
                'type': 'TextNode',
                'value': 'Don'
            },
            {
                'type': 'PunctuationNode',
                'value': '’'
            },
            {
                'type': 'TextNode',
                'value': 't '
            },
            {
                'type': 'TextNode',
                'value': 'Block'
            },
            {
                'type': 'PunctuationNode',
                'value': '-'
            },
            {
                'type': 'TextNode',
                'value': 'Level'
            }
        ]),
        'dont blocklevel',
        'should normalize smart apostrophes (multiple nodes)'
    );

    t.equal(
        normalize('Don\'t Block-Level', {allowApostrophes: false}),
        'dont blocklevel',
        'should normalize dumb apostrophes (string) if false'
    );

    t.equal(
        normalize('Don’t Block-Level', {allowApostrophes: false}),
        'dont blocklevel',
        'should normalize smart apostrophes (string) if false'
    );

    t.equal(
        normalize({
            'type': 'WordNode',
            'children': [
                {
                    'type': 'TextNode',
                    'value': 'Don'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '\''
                },
                {
                    'type': 'TextNode',
                    'value': 't '
                },
                {
                    'type': 'TextNode',
                    'value': 'Block'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '-'
                },
                {
                    'type': 'TextNode',
                    'value': 'Level'
                }
            ]
        }, {allowApostrophes: false}),
        'dont blocklevel',
        'should normalize dumb apostrophes (node) if false'
    );

    t.equal(
        normalize({
            'type': 'WordNode',
            'children': [
                {
                    'type': 'TextNode',
                    'value': 'Don'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '’'
                },
                {
                    'type': 'TextNode',
                    'value': 't '
                },
                {
                    'type': 'TextNode',
                    'value': 'Block'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '-'
                },
                {
                    'type': 'TextNode',
                    'value': 'Level'
                }
            ]
        }, {allowApostrophes: false}),
        'dont blocklevel',
        'should normalize smart apostrophes (node) if false'
    );

    t.equal(
        normalize([
            {
                'type': 'TextNode',
                'value': 'Don'
            },
            {
                'type': 'PunctuationNode',
                'value': '\''
            },
            {
                'type': 'TextNode',
                'value': 't '
            },
            {
                'type': 'TextNode',
                'value': 'Block'
            },
            {
                'type': 'PunctuationNode',
                'value': '-'
            },
            {
                'type': 'TextNode',
                'value': 'Level'
            }
        ], {allowApostrophes: false}),
        'dont blocklevel',
        'should normalize dumb apostrophes (multiple nodes) if false'
    );

    t.equal(
        normalize([
            {
                'type': 'TextNode',
                'value': 'Don'
            },
            {
                'type': 'PunctuationNode',
                'value': '’'
            },
            {
                'type': 'TextNode',
                'value': 't '
            },
            {
                'type': 'TextNode',
                'value': 'Block'
            },
            {
                'type': 'PunctuationNode',
                'value': '-'
            },
            {
                'type': 'TextNode',
                'value': 'Level'
            }
        ], {allowApostrophes: false}),
        'dont blocklevel',
        'should normalize smart apostrophes (multiple nodes) if false'
    );

    t.equal(
        normalize('Don\'t Block-Level', {allowApostrophes: true}),
        'don\'t blocklevel',
        'should not normalize dumb apostrophes (string) if true'
    );

    t.equal(
        normalize('Don’t Block-Level', {allowApostrophes: true}),
        'don\'t blocklevel',
        'should normalize smart apostrophes (string) if true'
    );

    t.equal(
        normalize({
            'type': 'WordNode',
            'children': [
                {
                    'type': 'TextNode',
                    'value': 'Don'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '\''
                },
                {
                    'type': 'TextNode',
                    'value': 't '
                },
                {
                    'type': 'TextNode',
                    'value': 'Block'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '-'
                },
                {
                    'type': 'TextNode',
                    'value': 'Level'
                }
            ]
        }, {allowApostrophes: true}),
        'don\'t blocklevel',
        'should not normalize dumb apostrophes (node) if true'
    );

    t.equal(
        normalize({
            'type': 'WordNode',
            'children': [
                {
                    'type': 'TextNode',
                    'value': 'Don'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '’'
                },
                {
                    'type': 'TextNode',
                    'value': 't '
                },
                {
                    'type': 'TextNode',
                    'value': 'Block'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '-'
                },
                {
                    'type': 'TextNode',
                    'value': 'Level'
                }
            ]
        }, {allowApostrophes: true}),
        'don\'t blocklevel',
        'should normalize smart apostrophes (node) if true'
    );

    t.equal(
        normalize([
            {
                'type': 'TextNode',
                'value': 'Don'
            },
            {
                'type': 'PunctuationNode',
                'value': '\''
            },
            {
                'type': 'TextNode',
                'value': 't '
            },
            {
                'type': 'TextNode',
                'value': 'Block'
            },
            {
                'type': 'PunctuationNode',
                'value': '-'
            },
            {
                'type': 'TextNode',
                'value': 'Level'
            }
        ], {allowApostrophes: true}),
        'don\'t blocklevel',
        'should not normalize dumb apostrophes (multiple nodes) if true'
    );

    t.equal(
        normalize([
            {
                'type': 'TextNode',
                'value': 'Don'
            },
            {
                'type': 'PunctuationNode',
                'value': '’'
            },
            {
                'type': 'TextNode',
                'value': 't '
            },
            {
                'type': 'TextNode',
                'value': 'Block'
            },
            {
                'type': 'PunctuationNode',
                'value': '-'
            },
            {
                'type': 'TextNode',
                'value': 'Level'
            }
        ], {allowApostrophes: true}),
        'don\'t blocklevel',
        'should normalize smart apostrophes (multiple nodes) if true'
    );

    t.end();
});

test('Dashes', function (t) {
    t.equal(
        normalize('Don\'t Block-Level'),
        'dont blocklevel',
        'should normalize dashes (string)'
    );

    t.equal(
        normalize({
            'type': 'WordNode',
            'children': [
                {
                    'type': 'TextNode',
                    'value': 'Don'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '\''
                },
                {
                    'type': 'TextNode',
                    'value': 't '
                },
                {
                    'type': 'TextNode',
                    'value': 'Block'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '-'
                },
                {
                    'type': 'TextNode',
                    'value': 'Level'
                }
            ]
        }),
        'dont blocklevel',
        'should normalize dashes (node)'
    );

    t.equal(
        normalize([
            {
                'type': 'TextNode',
                'value': 'Don'
            },
            {
                'type': 'PunctuationNode',
                'value': '\''
            },
            {
                'type': 'TextNode',
                'value': 't '
            },
            {
                'type': 'TextNode',
                'value': 'Block'
            },
            {
                'type': 'PunctuationNode',
                'value': '-'
            },
            {
                'type': 'TextNode',
                'value': 'Level'
            }
        ]),
        'dont blocklevel',
        'should normalize dashes (multiple nodes)'
    );

    t.equal(
        normalize('Don\'t Block-Level', {allowApostrophes: false, allowDashes: false}),
        'dont blocklevel',
        'should normalize dashes (string) if false'
    );

    t.equal(
        normalize('Don\'t Block-Level', {allowApostrophes: true, allowDashes: false}), 
        'don\'t blocklevel',
        'should normalize dashes (string) if false and apos true'
    );

    t.equal(
        normalize({
            'type': 'WordNode',
            'children': [
                {
                    'type': 'TextNode',
                    'value': 'Don'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '\''
                },
                {
                    'type': 'TextNode',
                    'value': 't '
                },
                {
                    'type': 'TextNode',
                    'value': 'Block'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '-'
                },
                {
                    'type': 'TextNode',
                    'value': 'Level'
                }
            ]
        }, {allowApostrophes: false, allowDashes: false}),
        'dont blocklevel',
        'should normalize dashes (node) if false'
    );

    t.equal(
        normalize({
            'type': 'WordNode',
            'children': [
                {
                    'type': 'TextNode',
                    'value': 'Don'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '\''
                },
                {
                    'type': 'TextNode',
                    'value': 't '
                },
                {
                    'type': 'TextNode',
                    'value': 'Block'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '-'
                },
                {
                    'type': 'TextNode',
                    'value': 'Level'
                }
            ]
        }, {allowApostrophes: true, allowDashes: false}),
        'don\'t blocklevel',
        'should normalize dashes (node) if false and apos true'
    );

    t.equal(
        normalize([
            {
                'type': 'TextNode',
                'value': 'Don'
            },
            {
                'type': 'PunctuationNode',
                'value': '\''
            },
            {
                'type': 'TextNode',
                'value': 't '
            },
            {
                'type': 'TextNode',
                'value': 'Block'
            },
            {
                'type': 'PunctuationNode',
                'value': '-'
            },
            {
                'type': 'TextNode',
                'value': 'Level'
            }
        ], {allowApostrophes: false, allowDashes: false}),
        'dont blocklevel',
        'should normalize dashes (multiple nodes) if false'
    );

    t.equal(
        normalize([
            {
                'type': 'TextNode',
                'value': 'Don'
            },
            {
                'type': 'PunctuationNode',
                'value': '\''
            },
            {
                'type': 'TextNode',
                'value': 't '
            },
            {
                'type': 'TextNode',
                'value': 'Block'
            },
            {
                'type': 'PunctuationNode',
                'value': '-'
            },
            {
                'type': 'TextNode',
                'value': 'Level'
            }
        ], {allowApostrophes: true, allowDashes: false}),
        'don\'t blocklevel',
        'should normalize dashes (multiple nodes) if false and apos true'
    );

    t.equal(
        normalize('Don\'t Block-Level', {allowApostrophes: false, allowDashes: true}),
        'dont block-level',
        'should not normalize dashes (string) if true'
    );

    t.equal(
        normalize('Don\'t Block-Level', {allowApostrophes: true, allowDashes: true}),
        'don\'t block-level',
        'should not normalize dashes (string) if true and apos true'
    );

    t.equal(
        normalize({
            'type': 'WordNode',
            'children': [
                {
                    'type': 'TextNode',
                    'value': 'Don'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '\''
                },
                {
                    'type': 'TextNode',
                    'value': 't '
                },
                {
                    'type': 'TextNode',
                    'value': 'Block'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '-'
                },
                {
                    'type': 'TextNode',
                    'value': 'Level'
                }
            ]
        }, {allowApostrophes: false, allowDashes: true}),
        'dont block-level',
        'should not normalize dashes (node) if true'
    );

    t.equal(
        normalize({
            'type': 'WordNode',
            'children': [
                {
                    'type': 'TextNode',
                    'value': 'Don'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '\''
                },
                {
                    'type': 'TextNode',
                    'value': 't '
                },
                {
                    'type': 'TextNode',
                    'value': 'Block'
                },
                {
                    'type': 'PunctuationNode',
                    'value': '-'
                },
                {
                    'type': 'TextNode',
                    'value': 'Level'
                }
            ]
        }, {allowApostrophes: true, allowDashes: true}),
        'don\'t block-level',
        'should not normalize dashes (node) if true and apos true'
    );

    t.equal(
        normalize([
            {
                'type': 'TextNode',
                'value': 'Don'
            },
            {
                'type': 'PunctuationNode',
                'value': '\''
            },
            {
                'type': 'TextNode',
                'value': 't '
            },
            {
                'type': 'TextNode',
                'value': 'Block'
            },
            {
                'type': 'PunctuationNode',
                'value': '-'
            },
            {
                'type': 'TextNode',
                'value': 'Level'
            }
        ], {allowApostrophes: false, allowDashes: true}),
        'dont block-level',
        'should not normalize dashes (multiple nodes) if true'
    );

    t.equal(
        normalize([
            {
                'type': 'TextNode',
                'value': 'Don'
            },
            {
                'type': 'PunctuationNode',
                'value': '\''
            },
            {
                'type': 'TextNode',
                'value': 't '
            },
            {
                'type': 'TextNode',
                'value': 'Block'
            },
            {
                'type': 'PunctuationNode',
                'value': '-'
            },
            {
                'type': 'TextNode',
                'value': 'Level'
            }
        ], {allowApostrophes: true, allowDashes: true}),
        'don\'t block-level',
        'should not normalize dashes (multiple nodes) if true and apos true'
    );

    t.end();
});

