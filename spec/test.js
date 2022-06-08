'use strict'

var test = require('tape')
var _ = require('lodash')
var doiRegex = require('../.')

var doi = [
  '10.0001/journal.pone.000001',
  '10.0001/journal/pone.0011111',
  '10.0001.112/journal.pone.0011021',
  '10.0001/issn.10001',
  '10.10.123/456'
]

var doiOlderFormat = [
  '10.1002/(SICI)1096-8644(199808)106:4<483::AID-AJPA4>3.0.CO;2-K' // one of 300K DOIs from Wiley - see https://www.crossref.org/blog/dois-and-matching-regular-expressions/ for more info
]

var doiNot = [
  '10..1000/journal.pone.0011111',
  '1.1/1.1',
  '10/134980',
  '10.001/001#00'
]

var doiDeclared = [
  'doi:10.1000/journal.pone.0011111',
]

var doiResolvePathWithoutProtocol = [
  'dx.doi.org/10.1016/j.neuron.2014.09.004',
  'doi.org/10.1016/j.neuron.2014.09.004'
]

var doiResolvePathWithProtocol = [
  'http://dx.doi.org/10.1016/j.neuron.2014.09.004',
  'https://dx.doi.org/10.1016/j.neuron.2014.09.004',
  'http://doi.org/10.1016/j.neuron.2014.09.004',
  'https://doi.org/10.1016/j.neuron.2014.09.004'
]

var doiResolvePathInvalid = [
  'dxsdfas.doi.org/10.1016/j.neuron.2014.09.004'
]

var doiResolvePathWithProtocolInvalid = [
  'httpp://dx.doi.org/10.1016/j.neuron.2014.09.004',
  'httpp://doi.org/10.1016/j.neuron.2014.09.004',
  'ftp://dx.doi.org/10.1016/j.neuron.2014.09.004',
  'ftp://doi.org/10.1016/j.neuron.2014.09.004',
]

var doiNotDeclared = [
  'do:10.1000/journal.pone.0011111',
  'doi:10..1000/journal.pone.0011111',
  'DO:10.1000/journal.pone.0011111',
  ':10.1000/journal.pone.0011111',
  '10.1000/journal.pone.0011111'
]

var doiGroups = [
  '10.1000/journal.pone.0011111.a001',
  'doi:10.1000/journal.pone.0011111.a001'
]

test('exact DOIs as passing', function (t) {
  _(doi).each(function (el) {
    t.assert(doiRegex({exact: true}).test(el), el)
  })
  t.end()
})

test('older format DOIs as passing', function (t) {
  _(doiOlderFormat).each(function (el) {
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

test('DOI not declared as failing', function (t) {
  _(doiNotDeclared).each(function (el) {
    t.assert(!doiRegex.declared({exact: true}).test(el), el)
  })
  t.end()
})

test('DOI with resolve path as passing', function (t) {
  _(doiResolvePathWithoutProtocol).each(function (el) {
    t.assert(doiRegex.resolvePath().test(el), el)
  })
  _(doiResolvePathInvalid).each(function (el) {
    t.assert(!doiRegex.resolvePath().test(el), el)
  })
  t.end()
})

test('DOI with resolve path and protocol mandatory as passing', function (t) {
  _(doiResolvePathWithoutProtocol).each(function (el) {
    t.assert(!doiRegex.resolvePath({protocol: true}).test(el), el)
  })
  _(doiResolvePathWithProtocol).each(function (el) {
    t.assert(doiRegex.resolvePath({protocol: true}).test(el), el)
  })
  _(doiResolvePathWithProtocolInvalid).each(function (el) {
    t.assert(!doiRegex.resolvePath({protocol: true}).test(el), el)
  })
  t.end()
})

test('DOI group catching returns original', function (t) {
  _(doiGroups).each(function (el) {
    t.assert(doiRegex.groups(el)[0] === el, el)
  })
  _(doi).each(function (el) {
    t.assert(doiRegex.groups(el)[0] === el, el)
  })
  t.end()
})

test('DOI group catching returns DOI', function (t) {
  _(doiGroups).each(function (el) {
    t.assert(doiRegex(doiRegex.groups(el)[1]), el)
  })
  _(doi).each(function (el) {
    t.assert(doiRegex(doiRegex.groups(el)[1]), el)
  })
  t.end()
})

test('DOI group catching returns extension', function (t) {
  _(doiGroups).each(function (el) {
    t.assert(doiRegex.groups(el)[2].length === 5, el)
  })
  _(doi).each(function (el) {
    t.assert(doiRegex.groups(el)[2].length === 0, el)
  })
  t.end()
})
