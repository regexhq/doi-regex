'use strict'

/**
 * Parts of a DOI:
 * Directory Identifier: 10
 * Registrant code: . + [0-9]{2,}
 * Registrant subdivision (optional): . + [0-9]+
 * Suffix: / + any character, case insensitive for ASCII chars (but capitalised
 *   in the registry), with some characters that _should_ be escaped.
 *   Recommended encoding: "{}^[]`|\\&\/\'<>
 *   Mandatory encoding: %"#? (and space)
 * From: http://www.doi.org/doi_handbook/2_Numbering.html#2.2
 */

// TODO Capture final segment for fragments
// (\\.[a-zA-Z]{1}[0-9]{3})?
var doiRegex = '(10[.][0-9]{2,}(?:[.][0-9]+)*/(?:(?![%"#? ])\\S)+)'
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
    match.push((suffixes.length) ? suffixes[0] : '')
  }
  return match
}

doi.declared = function (opts) {
  opts = opts || {}
  return opts.exact ? new RegExp('^' + doiTextPrefix + doiRegex + '$') :
                      new RegExp(doiTextPrefix + doiRegex, 'g')
}

doi.resolvePath = function (opts) {
  opts = opts || {}
  return opts.protocol ? new RegExp('^http(s)?\\://(dx\\.)?doi\\.org/' + doiRegex + '$') :
    new RegExp('^(http(s)?\\://)?(dx\\.)?doi\\.org/' + doiRegex + '$')
}
