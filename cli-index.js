#!/usr/bin/env node
'use strict'

var doiRegex = require('./')
var argv = require('minimist')(process.argv.slice(2), {
    alias: {
        e: 'exact',
        d: 'declared',
        m: 'match',
        r: 'resolvePath',
        g: 'groups',
        h: 'help'
    },
    boolean: ['e', 'd', 'm', 'g', 'h']
})

if (argv.h) {
  console.error(
  'Usage: ' + process.argv[1] + ' <doi>\n' +
  'Options: \n' +
  '-e, --exact  Find an exact match \n' +
  '-d, --declared   Find a DOI with a `doi:` prefix\n' +
  '-r, --resolvePath  Find a DOI with a `https://dx.doi.org` prefix\n' +
  '-m, --match  Find all matches within the given string\n' +
  '-g, --groups  Find matches with groupings for extra suffixes')
  process.exit(-1)
}

var doi = (argv.doi || argv._[0])

// TODO This is not the best way to do this.

if (argv.m) {
  console.log(doi.match(doiRegex()))
  process.exit(-1)
} else if (argv.g) {
  console.log(doiRegex.groups(doi))
  process.exit(-1)
}

if (argv.e && argv.d) {
  console.log('Is this a declared DOI',
    doiRegex.declared({exact: true}).test(doi))
} else if (argv.e && !argv.d && !argv.r) {
  console.log('Is this a DOI?', doiRegex({exact: true}).test(doi))
} else if (!argv.e && argv.d) {
  console.log('Is the DOI declared?', doiRegex.declared().test(doi))
} else if (!argv.e && !argv.d && argv.r) {
  console.log('Is the DOI declared with an optional path?', doiRegex.resolvePath().test(doi))
} else if (argv.e && !argv.d && argv.r) {
  console.log('Is the DOI declared with an mandatory path?', doiRegex.resolvePath({protocol: true}).test(doi))
} else {
  console.log('Does a DOI exist?', doiRegex().test(doi))
}
