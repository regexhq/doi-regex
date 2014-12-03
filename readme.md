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

'unicorn 10.1000/xyz000 cake 10.1000/xyz001 rainbow'.match(doiRegex());
//=> ['10.1000/xyz000', '10.1000/xyz000']
```


## API

### doiRegex(options)

Returns a regex for matching a DOI.

### doiRegex.declared(options)

Returns a regex for matching a DOI that has been declared with a `doi:` string in front.

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

Possible Flags:

	* -e, --exact	Find an exact match \n\
	* -d, --declared 	Find a DOI with a 'doi:' prefix\n\
	* -m, --match	Find all matches within the given string");

## License

MIT © [Richard Littauer](http://burntfen.com)
