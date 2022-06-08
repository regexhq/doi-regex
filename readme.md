# doi-regex 

[![Build Status](https://travis-ci.org/regexhq/doi-regex.svg?branch=master)](https://travis-ci.org/regexhq/doi-regex)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fregexhq%2Fdoi-regex.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fregexhq%2Fdoi-regex?ref=badge_shield)

> Regular expression for matching DOIs

Parts of a DOI:
 * Directory Identifier: 10
 * Registrant code: . + [0-9]{2,}
 * Registrant subdivision (optional): . + [0-9]+
 * Suffix: / + any character, case insensitive for ASCII chars (but capitalised
	in the registry), with some characters that _should_ be escaped  
	Recommended encoding: ```"{}^[]`|\\&\/\'<>```  
 	Mandatory encoding: ```%"#?``` and space.

From: http://www.doi.org/doi_handbook/2_Numbering.html#2.2


## Install

```sh
$ npm install --save doi-regex
```


## Usage

```js
var doiRegex = require('doi-regex');

// contains a DOI
doiRegex().test('unicorn 10.1000/xyz000');
//=> true

// is a DOI address
doiRegex({exact: true}).test('unicorn 10.1000/xyz000');
//=> false

doiRegex.declared({exact: true}).test('doi:10.1000/xyz000');
//=> true

doiRegex.groups().test('10.1000/xyz1000.a001');
//=> ['10.1000/xyz1000', '10.1000/xyz1000', '.a001']

'unicorn 10.1000/xyz000 cake 10.1000/xyz001 rainbow'.match(doiRegex());
//=> ['10.1000/xyz000', '10.1000/xyz000']
```


## API

### doiRegex(options)

Returns a regex for matching a DOI.

### doiRegex.declared(options)

Returns a regex for matching a DOI that has been declared with a `doi:` string in front.

### doiRegex.groups(doi)

Returns a regex match object with a final string as the first two indices, and any suffixes that are commonly used for supplemental information if they are attached to the doi. For instance, `10.1000/journal.pone.0000000.g001` would return `10.1000/journal.pone.0000000` and `.g001`. 

#### options.exact

Type: `boolean`  
Default: `false` *(Matches any DOI in a string)*

Only match an exact string.  
Useful with `RegExp#test` to check if a string is an DOI.


## CLI 

A CLI file has been provided. Run any of the examples provided above using your own DOI. For instance: 

```sh
$ node cli-index.js -e 10.000/xyz1000
//=> true
```

Possible Flags:

* `-e`, `--exact`	Find an exact match
* `-d`, `--declared` 	Find a DOI with a 'doi:' prefix
* `-m`, `--match`	Find all matches within the given string
* `-g`, `--groups` Find the stripped DOI and any suffix it might have
* `-h`, `--help` Display usage

## Contribute

Please do!

## License

MIT © [Richard Littauer](http://burntfen.com)


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fregexhq%2Fdoi-regex.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fregexhq%2Fdoi-regex?ref=badge_large)