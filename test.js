'use strict';
var test = require('ava')
var _ = require('lodash')
var doiRegex = require('./');

var doi = [
	'10.1371/journal.pone.0077056'
];

var doiNot = [
	'10.1000//journal.pone.0011111',
	'10..1000/journal.pone.0011111',
	'1.1/1.1'
];

var doiDeclared = [
	'doi:10.1000/journal.pone.0011111',
];

var doiNotDeclared = [
	'do:10.1000/journal.pone.0011111',
	'doi:10..1000/journal.pone.0011111',
	'DO:10.1000/journal.pone.0011111',
	':10.1000/journal.pone.0011111',
	'10.1000/journal.pone.0011111',
];

test('exact DOIs as passing', function (t) {
	_(doi).each(function (el) {
		t.assert(doiRegex({exact: true}).test(el), el)
	})
	t.end()
})

test('embeded DOIs as passing', function (t) {
	_(doi).each(function (el) {
		t.assert(doiRegex().exec('foo' + el)[0] === el, el)
	})
	t.end()
})

test('non-exact DOIs as failing', function (t) {
	_(doiNot).each(function (el) {
		t.assert(!doiRegex({exact: true}).test(el), el)
	})

	t.end()
})

test('DOI declared as passing', function (t) {
	_(doiDeclared).each(function (el) {
		t.assert(doiRegex.declared({exact: true}).test(el), el)
	})

	t.end()
})

test('DOI declared embeded as passing', function (t) {
	_(doiDeclared).each(function (el) {
		t.assert((doiRegex.declared().exec('foo' + el) || [])[0] === el, el)
	})

	t.end()
})

test('DOI not declared as failing', function(t) {
	_(doiNotDeclared).each(function (el) {
		t.assert(!doiRegex.declared({exact: true}).test(el), el)
	})

	t.end()
})
