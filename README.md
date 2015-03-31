# formattr
A small node module to intelligently format names and addresses.

It's here to help out with annoying formatting issues like:
* automatically handling Irish and Scottish names (like O'Brien and MacDonald)
* deciding whether something is a name or an abbreviation (formatting both Jo and JJ correctly)
* turning a non-formatted address into one that's nice to look at 

## Installation

### node.js

Install using [npm](http://npmjs.org/):

    $ npm install formattr

## Examples

First, make sure you have `formattr` installed and imported:

    var formattr = require("formattr");

### formatName
######formatName(formatString, last, first, middle)
`formatName` allows you to specify a format string (like '{last}, {first} {middle}') when passing the name arguments to define how you'd like the string returned.  Use the full words (first, middle, last) to request the full name back.  Use the first letter of the word (f, m, l) to request the initial of that name back along with a period.

```javascript
formattr.formatName('{last}, {first} {m}', 'rambo', 'john', 'james')     // 'Rambo, John J.'

formattr.formatName('{first} {last}', 'mcclane', 'john')                 // 'John McClane'

formattr.formatName('{f} {last}', 'plissken', 'snake')                   // 'S. Plissken'
```

### formatNamePart
######formatNamePart(input)
`formatNamePart` is for when you're dealing with just a single part of a name (like a last name).  It'll apply casing logic to the input string and return it.

```javascript
formattr.formatNamePart('ty')       // 'Ty'

formattr.formatNamePart('jj')       // 'JJ'

formattr.formatNamePart('jAmEs')    // 'James'
```

### formatAddress
######formatAddress(input)
`formatNamePart` will format an address string and properly case cardinal/ordinal directions (like N and NW) and all US state abbreviations.

```javascript
formattr.formatAddress('5567 sw nakatomi plaza las angeles, ca 90064')  // '5567 SW Nakatomi Plaza Las Angeles, CA 90064'

formattr.formatAddress('123 N fake ST springfield, il 62701')           // '123 N Fake St Springfield, IL 62701'
```

### titleCase
######titleCase(input)
`titleCase` will format an address string in title case without applying any additional logic.

```javascript
formattr.titleCase('this is a string')  // 'This Is A String'
```

## Disclaimer
This is still early code and is subject to bugs and changes.  Please thoroughly test it before relying too heavily on it.

## Issues
If you have a feature request or bug, please feel free to submit it as an issue

## Contributing
If you feel like contributing to formattr, please do!
