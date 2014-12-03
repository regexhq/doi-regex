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

var doiGroups = [
	'10.1000/journal.pone.0011111.a001',
	'doi:10.1000/journal.pone.0011111.a001'
]

test('exact DOIs as passing', function (t) {
	_(doi).each(function (el) {
		t.assert(doiRegex({exact: true}).test(el), el)
	})
})

test('embeded DOIs as passing', function (t) {
	_(doi).each(function (el) {
		t.assert(doiRegex().exec('foo' + el)[0] === el, el)
	})
})

test('non-exact DOIs as failing', function (t) {
	_(doiNot).each(function (el) {
		t.assert(!doiRegex({exact: true}).test(el), el)
	})
})

test('DOI declared as passing', function (t) {
	_(doiDeclared).each(function (el) {
		t.assert(doiRegex.declared({exact: true}).test(el), el)
	})
})

test('DOI declared embeded as passing', function (t) {
	_(doiDeclared).each(function (el) {
		t.assert((doiRegex.declared().exec('foo' + el) || [])[0] === el, el)
	})
})

test('DOI not declared as failing', function (t) {
	_(doiNotDeclared).each(function (el) {
		t.assert(!doiRegex.declared({exact: true}).test(el), el)
	})
})

test('DOI group catching returns original', function (t) {
	_(doiGroups).each(function (el) {
		t.assert(doiRegex.groups(el)[0] === el, el)
	})
	_(doi).each(function (el) {
		t.assert(doiRegex.groups(el)[0] === el, el)
	})
})

test('DOI group catching returns DOI', function (t) {
	_(doiGroups).each(function (el) {
		t.assert(doiRegex(doiRegex.groups(el)[1]), el)
	})
	_(doi).each(function (el) {
		t.assert(doiRegex(doiRegex.groups(el)[1]), el)
	})
})

test('DOI group catching returns extension', function (t) {
	_(doiGroups).each(function (el) {
		t.assert(doiRegex.groups(el)[2].length === 5, el)
	})
	_(doi).each(function (el) {
		t.assert(doiRegex.groups(el)[2].length === 0, el)
	})
})
