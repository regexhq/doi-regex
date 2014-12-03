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

doi.groups = function (str) {
	if (!str) { return }
	// Javascript fails at lookaheads for optional groups. This circumvents that
	// problem by just automatically removing and saving suffixes if they are in
	// as specific format - .a000 is the format used by PLoS, but this may need
	// to be filled out.
	var suffixes = []
	var newStr = str.replace(/\.[a-zA-Z]{1}[0-9]{3}$/g, function (s) {
		suffixes.push(s)
		return ''
	})
	var match = doi().exec(newStr)
	if (match) {
		match[0] = str
		match.push((!!suffixes.length) ? suffixes[0] : '')
	}
	return match
}

doi.declared = function(opts) {
	opts = opts || {}
	return opts.exact ? new RegExp('^' + doiTextPrefix + doiRegex + '$') :
											new RegExp(doiTextPrefix + doiRegex, 'g')
}
