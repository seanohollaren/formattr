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
    formattr = require('../index');

describe('Testing formatting library', function () {

    it('Testing name formatting', function (done) {

        // Test toFormattedName
        expect(formattr.formatName('{first} {last}', 'mcclane', 'john')).to.equal('John McClane');
        expect(formattr.formatName('{last}, {first}', 'gruber', 'hans')).to.equal('Gruber, Hans');
        expect(formattr.formatName('{first} {l}', 'plissken', 'snake')).to.equal('Snake P.');
        expect(formattr.formatName('{f} {last}', 'williams', 'ash')).to.equal('A. Williams');
        expect(formattr.formatName('{first} {middle} {last}', 'barbarian', 'conan', 'the')).to.equal('Conan The Barbarian');
        expect(formattr.formatName('{last}, {first} {m}', 'powers', 'austin', 'danger')).to.equal('Powers, Austin D.');
        expect(formattr.formatName('The name\'s {last}.  {first} {last}.', 'bond', 'james')).to.equal('The name\'s Bond.  James Bond.');
        expect(formattr.formatName('{first} {last}', 'simcelescu', 'dan')).to.equal('Dan Simcelescu');
        
        // Test error handling
        expect(formattr.formatName.bind(formattr, '{first} {middle} {last}', 'schwarzenegger', 'arnold')).to.throw(Error);
        expect(formattr.formatName.bind(formattr, null, 'schwarzenegger', 'arnold', 'alois')).to.throw(Error);

        // Test formatNamePart
        expect(formattr.formatNamePart('a')).to.equal('A');
        expect(formattr.formatNamePart('TY')).to.equal('Ty');
        expect(formattr.formatNamePart('JJ')).to.equal('JJ');
        expect(formattr.formatNamePart('NG')).to.equal('Ng');

        done();
    });

    it('Testing address formatting', function (done) {
        expect(formattr.formatAddress('1234 sw nakatomi plaza las angeles, ca 90064')).to.equal('1234 SW Nakatomi Plaza Las Angeles, CA 90064');
        expect(formattr.formatAddress('123 N TILLAMOOK ST portland, or 97250')).to.equal('123 N Tillamook St Portland, OR 97250');

        done();
    });

});