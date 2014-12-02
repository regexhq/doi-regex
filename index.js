'use strict';

// TODO Capture final segment for fragments
// (\\.[a-zA-Z]{1}[0-9]{3})?
var doiRegex = '(10[.][0-9]{4,}(?:[.][0-9]+)*/(?:(?!["&\/\'<>])\\S)+)'
var doiTextPrefix = 'doi\\:'

var doi = module.exports = function (opts) {
	opts = opts || {}
	return opts.exact ? new RegExp('(?:^' + doiRegex + '$)') :
											new RegExp('(?:' + doiRegex + ')', 'g')
}

doi.declared = function(opts) {
	opts = opts || {}
	return opts.exact ? new RegExp('^' + doiTextPrefix + doiRegex + '$') :
											new RegExp(doiTextPrefix + doiRegex, 'g')
}
