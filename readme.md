# doi-regex [![Build Status](https://travis-ci.org/BeagleLab/doi-regex.svg?branch=master)](https://travis-ci.org/BeagleLab/doi-regex)

> Regular expression for matching DOIs


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
$ node cli-index.js -e `10.000/xyz1000`
true
```

Run it without arguments to see all possible flags.

Possible Flags:

* `-e`, `--exact`	Find an exact match
* `-d`, `--declared` 	Find a DOI with a 'doi:' prefix
* `-m`, `--match`	Find all matches within the given string
* `-g`, `--groups` Find the stripped DOI and any suffix it might have

## License

MIT © [Richard Littauer](http://burntfen.com)
