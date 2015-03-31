/**
NAME
lib/format/index.js

SYNOPSIS
Format names and addresses

DESCRIPTION
This library will format names and addresses.

formatAddress will (somewhat) intelligently format a single-line address.

formatName take a supplied format string with syntax '{first} {middle} {last}'
and last, first, middle name and return a properly cased string in the
requested format

formatNamePart will take a single string input (like a single first name) and
return a properly cased string

titleCase will convert the given string to title case but with no name logic
applied (like looking for abbreviations or patronyms)

ERRORS
Throws an error if a name part is requested in the format string but not
actually supplied as a parameter

AUTHORS
Sean O'Hollaren
*/


'use strict';

var knownPatronyms = /o'|mac|mc/i;
var knownExceptions = /ng/i;

// Return string in title case
function titleCase(input) {
    return input.replace(/\b\w+/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Accepts formatString like '{first} {middle} {last}' or '{last}, {first} {m}'
// and returns title cased names in that format
function formatName(formatString, lastName, firstName, middleName) {

    if (!formatString) throw new Error('formatString was not supplied.  Need a format specifier like \'{last}, {first} {middle}\'');

    // Format last name and insert into string
    formatString = formatString.replace(/\{last\}/ig, function (last) {
        if (lastName) return formatNamePart(lastName);

        else throw new Error('Last name was requested in formatString but not supplied');
    });

    // Format last initial and insert into string
    formatString = formatString.replace(/\{l\}/ig, function (last) {
        if (lastName) return formatNamePart(lastName.charAt(0)) + '.';

        else throw new Error('Last initial was requested in formatString but not supplied');
    });

    // Format first name and insert into string
    formatString = formatString.replace(/\{first\}/ig, function (first) {
        if (firstName) return formatNamePart(firstName);

        else throw new Error('First name was requested in formatString but not supplied');
    });

    // Format first initial and insert into string
    formatString = formatString.replace(/\{f\}/ig, function (first) {
        if (firstName) return formatNamePart(firstName.charAt(0)) + '.';

        else throw new Error('First initial was requested in formatString but not supplied');
    });

    // Format middle name and insert into string
    formatString = formatString.replace(/\{middle\}/ig, function (middle) {
        if (middleName) return formatNamePart(middleName);

        else throw new Error('Middle name was requested in formatString but not supplied');
    });

    // Format middle initial and insert into string
    formatString = formatString.replace(/\{m\}/ig, function (middle) {
        if (middleName) return formatNamePart(middleName.charAt(0)) + '.';

        else throw new Error('Middle initial was requested in formatString but not supplied');
    });

    return formatString;
}

// Format a single name part
function formatNamePart(input) {

    input = input.trim();

    if (!input || !input.length) return input;

    // If it's only one letter
    if (input.length === 1) return input.toUpperCase();

    // If it's a short name or initials
    else if (input.length === 2) {

        // If one of the letters is a vowel, it's likely a
        // name and should be converted to title case
        if (/a|e|i|o|u|y/i.test(input)) return titleCase(input);

        // If it's a known consonant exception, return title case
        if (knownExceptions.test(input)) return titleCase(input);

        // Else it's almost definitely initials which should stay all caps
        else return input.toUpperCase();
    }

    // It is longer than 2 characters
    else {

        // If it starts with a patronym, format accordingly.  Else, just return titleCase
        return (knownPatronyms.test(input)) ? formatPatronym(input) : titleCase(input);
    }
}

// Format a given single line address
function formatAddress(input) {

    var directionsRegex = /\sN\s|\sE\s|\sS\s|\sW\s|\sNE\s|\sSE\s|\sNW\s|\sSW\s/i;
    var stateAbbr = new RegExp('\\s(al|ak|ar|az|ca|co|ct|dc|de|fl|ga|hi|ia|id|il|in|ks|ky|la|ma|md|me|mi|mn|mo|ms|mt|nc|nd|ne|nh|nj|nm|nv|ny|oh|ok|or|pa|ri|sc|sd|tn|tx|ut|va|vt|wa|wi|wv|wy)\\s', 'i');

    var formattedAddress = titleCase(input);

    // Upper case cardinal and ordinal directions
    formattedAddress = formattedAddress.replace(directionsRegex, function (match) {
        return match.toUpperCase();
    });

    // Upper case state abbreviations
    return formattedAddress.replace(stateAbbr, function (match) {
        return match.toUpperCase();
    });
}

// Case names which start with patronyms properly
function formatPatronym(input) {

    var patronym = knownPatronyms.exec(input.toLowerCase())[0];

    switch (patronym) {
    case ('o\''):
        return 'O\'' + titleCase(input.substr(2));
    case ('mc'):
        return 'Mc' + titleCase(input.substr(2));
    case ('mac'):
        return 'Mac' + titleCase(input.substr(3));
    default:
        return false;
    }
}

module.exports = {
    formatName: formatName,
    formatNamePart: formatNamePart,
    formatAddress: formatAddress,
    titleCase: titleCase
};