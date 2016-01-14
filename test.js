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

test('normalize(value)', function (t) {
    t.throws(
        function () {
            normalize(true);
        },
        'should fail when given a boolean'
    );

    t.equal(
        normalize('Dont'),
        'dont',
        'should normalize case (string)'
    );

    t.equal(
        normalize('Don\'t'),
        'dont',
        'should normalize dumb apostrophes (string)'
    );

    t.equal(
        normalize('Don’t'),
        'dont',
        'should normalize smart apostrophes (string)'
    );

    t.equal(
        normalize('Block-level'),
        'blocklevel',
        'should normalize dashes (string)'
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
                    'value': 't'
                }
            ]
        }),
        'dont',
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
                    'value': 't'
                }
            ]
        }),
        'dont',
        'should normalize smart apostrophes (node)'
    );

    t.equal(
        normalize({
            'type': 'WordNode',
            'children': [
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
            ]
        }),
        'blocklevel',
        'should normalize dashes (node)'
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
        'should normalize multiple nodes'
    );

    t.end();
});
