/**
NAME
test/formatter.js

SYNOPSIS
Tests Name/Address Formatter

DESCRIPTION
This file tests the name and address formatting functions

DEPENDENCIES

ERRORS

DIAGNOSTICS

AUTHORS
Sean O'Hollaren
*/

'use strict';

// Load Modules
var chai = require('chai'),
    expect = chai.expect,
    assert = chai.assert,
    format = require('../lib/format');

describe('Testing formatting library', function () {

    it('Testing name formatting', function (done) {

        // Test toFormattedName
        expect(format.formatName('{first} {last}', 'mcclane', 'john')).to.equal('John McClane');
        expect(format.formatName('{last}, {first}', 'gruber', 'hans')).to.equal('Gruber, Hans');
        expect(format.formatName('{first} {l}', 'plissken', 'snake')).to.equal('Snake P.');
        expect(format.formatName('{f} {last}', 'williams', 'ash')).to.equal('A. Williams');
        expect(format.formatName('{first} {middle} {last}', 'barbarian', 'conan', 'the')).to.equal('Conan The Barbarian');
        expect(format.formatName('{last}, {first} {m}', 'powers', 'austin', 'danger')).to.equal('Powers, Austin D.');

        // Test error handling
        expect(format.formatName.bind(format, '{first} {middle} {last}', 'schwarzenegger', 'arnold')).to.throw(Error);
        expect(format.formatName.bind(format, null, 'schwarzenegger', 'arnold', 'alois')).to.throw(Error);

        // Test formatNamePart
        expect(format.formatNamePart('a')).to.equal('A');
        expect(format.formatNamePart('TY')).to.equal('Ty');
        expect(format.formatNamePart('JJ')).to.equal('JJ');
        expect(format.formatNamePart('NG')).to.equal('Ng');

        done();
    });

    it('Testing address formatting', function (done) {
        expect(format.formatAddress('1234 sw nakatomi plaza las angeles, ca 90064')).to.equal('1234 SW Nakatomi Plaza Las Angeles, CA 90064');
        expect(format.formatAddress('123 N TILLAMOOK ST portland, or 97250')).to.equal('123 N Tillamook St Portland, OR 97250');

        done();
    });

});