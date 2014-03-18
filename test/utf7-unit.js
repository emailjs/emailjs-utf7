(function(root, factory) {
    "use strict";

    if (typeof define === "function" && define.amd) {
        define(['chai', 'utf7'], factory);
    } else if (typeof exports === 'object') {
        factory(require('chai'), require('../src/utf7'));
    }
}(this, function(chai, utf7) {
    'use strict';

    var expect = chai.expect;
    chai.Assertion.includeStack = true;

    describe('utf7 unit tests', function() {
        describe('#imap', function() {
            describe('#encode', function() {
                it('should succeed with basic use cases', function() {
                    expect(utf7.imap.encode('A\u2262\u0391.')).to.equal('A&ImIDkQ-.');
                    expect(utf7.imap.encode('\u65E5\u672C\u8A9E')).to.equal('&ZeVnLIqe-');
                    expect(utf7.imap.encode('Hi Mom -\u263A-!')).to.equal('Hi Mom -&Jjo--!');
                    expect(utf7.imap.encode('Item 3 is \u00A31.')).to.equal('Item 3 is &AKM-1.');
                });

                it('should encode examples that contain more than one mode shift', function() {
                    expect(utf7.imap.encode('Jyv\u00E4skyl\u00E4')).to.equal('Jyv&AOQ-skyl&AOQ-');
                    expect(utf7.imap.encode('\'\u4F60\u597D\' heißt "Hallo"')).to.equal('\'&T2BZfQ-\' hei&AN8-t "Hallo"');
                });

                it('should represented ampersand sign as &-', function() {
                    expect(utf7.imap.encode('Hot & Spicy & Fruity')).to.equal('Hot &- Spicy &- Fruity');
                });

                it('should encode slashes to commas', function() {
                    expect(utf7.imap.encode('\uffff\uedca\u9876\u5432\u1fed')).to.equal('&,,,typh2VDIf7Q-');
                });

                it('should encode & sign around non-ASCII chars', function() {
                    expect(utf7.imap.encode('\u00E4&\u00E4&\u00E4')).to.equal('&AOQ-&-&AOQ-&-&AOQ-');
                });
            });

            describe('#decode', function() {
                it('should succeed with basic use cases', function() {
                    expect(utf7.imap.decode('A&ImIDkQ-.')).to.equal('A\u2262\u0391.');
                    expect(utf7.imap.decode('&ZeVnLIqe-')).to.equal('\u65E5\u672C\u8A9E');
                    expect(utf7.imap.decode('Hi Mom -&Jjo--!')).to.equal('Hi Mom -\u263A-!');
                    expect(utf7.imap.decode('Item 3 is &AKM-1.')).to.equal('Item 3 is \u00A31.');
                });

                it('should decode examples that contain more than one mode shift', function() {
                    expect(utf7.imap.decode('Jyv&AOQ-skyl&AOQ-')).to.equal('Jyv\u00E4skyl\u00E4');
                    expect(utf7.imap.decode('\'&T2BZfQ-\' hei&AN8-t "Hallo"')).to.equal('\'\u4F60\u597D\' heißt "Hallo"');
                });

                it('should represented ampersand sign as &-', function() {
                    expect(utf7.imap.decode('Hot &- Spicy &- Fruity')).to.equal('Hot & Spicy & Fruity');
                });

                it('should decode commas to slashes', function() {
                    expect(utf7.imap.decode('&,,,typh2VDIf7Q-')).to.equal('\uffff\uedca\u9876\u5432\u1fed');
                });

                it('should decode non-ASCII chars', function() {
                    expect(utf7.imap.decode('&AOQ-&-&AOQ-&-&AOQ-')).to.equal('\u00E4&\u00E4&\u00E4');
                });
            });
        });
        describe('rfc2152', function() {
            describe('#encode', function() {
                it('should succeed with basic use cases', function() {
                    expect(utf7.encodeAll('A\u2262\u0391.')).to.equal('A+ImIDkQ-.');
                    expect(utf7.encode('A\u2262\u0391.')).to.equal('A+ImIDkQ-.');

                    expect(utf7.encodeAll('\u65E5\u672C\u8A9E')).to.equal('+ZeVnLIqe-');
                    expect(utf7.encode('\u65E5\u672C\u8A9E')).to.equal('+ZeVnLIqe-');

                    expect(utf7.encodeAll('Hi Mom -\u263A-!')).to.equal('Hi Mom -+Jjo--!');
                    expect(utf7.encode('Hi Mom -\u263A-!', ' !')).to.equal('Hi Mom -+Jjo--!');
                    expect(utf7.encode('Hi Mom -\u263A-!')).to.equal('Hi+ACA-Mom+ACA--+Jjo--+ACE-');

                    expect(utf7.encodeAll('Item 3 is \u00A31.')).to.equal('Item 3 is +AKM-1.');
                    expect(utf7.encode('Item 3 is \u00A31.', ' ')).to.equal('Item 3 is +AKM-1.');
                    expect(utf7.encode('Item 3 is \u00A31.')).to.equal('Item+ACA-3+ACA-is+ACAAow-1.');
                });

                it('should encode examples that contain more than one mode shift', function() {
                    expect(utf7.encode('Jyv\u00E4skyl\u00E4')).to.equal('Jyv+AOQ-skyl+AOQ-');
                    expect(utf7.encodeAll('Jyv\u00E4skyl\u00E4')).to.equal('Jyv+AOQ-skyl+AOQ-');

                    expect(utf7.encodeAll('\'\u4F60\u597D\' heißt "Hallo"')).to.equal('\'+T2BZfQ-\' hei+AN8-t "Hallo"');
                    expect(utf7.encode('\'\u4F60\u597D\' heißt "Hallo"', ' "')).to.equal('\'+T2BZfQ-\' hei+AN8-t "Hallo"');
                    expect(utf7.encode('\'\u4F60\u597D\' heißt "Hallo"')).to.equal('\'+T2BZfQ-\'+ACA-hei+AN8-t+ACAAIg-Hallo+ACI-');
                });

                it('should encode the plus sign as +-', function() {
                    expect(utf7.encodeAll('Hot + Spicy + Fruity')).to.equal('Hot +- Spicy +- Fruity');
                    expect(utf7.encode('Hot + Spicy + Fruity', ' ')).to.equal('Hot +- Spicy +- Fruity');
                    expect(utf7.encode('Hot + Spicy + Fruity')).to.equal('Hot+ACAAKwAg-Spicy+ACAAKwAg-Fruity');
                });

                it('should encode slashes in the beginning', function() {
                    expect(utf7.encodeAll('\uffff\uedca\u9876\u5432\u1fed')).to.equal('+///typh2VDIf7Q-');
                });

                it('should encode non-ASCII chars', function() {
                    expect(utf7.encodeAll('\u00E4+\u00E4+\u00E4')).to.equal('+AOQAKwDkACsA5A-');
                });
            });
            describe('#decode', function() {
                it('should succeed with basic use cases', function() {
                    expect(utf7.decode('A+ImIDkQ-.')).to.equal('A\u2262\u0391.');
                    expect(utf7.decode('A+ImIDkQ.')).to.equal('A\u2262\u0391.');

                    expect(utf7.decode('+ZeVnLIqe-')).to.equal('\u65E5\u672C\u8A9E');
                    expect(utf7.decode('+ZeVnLIqe')).to.equal('\u65E5\u672C\u8A9E');

                    expect(utf7.decode('Hi Mom -+Jjo--!')).to.equal('Hi Mom -\u263A-!');
                    expect(utf7.decode('Hi+ACA-Mom+ACA--+Jjo--+ACE-')).to.equal('Hi Mom -\u263A-!');
                    expect(utf7.decode('Item 3 is +AKM-1.')).to.equal('Item 3 is \u00A31.');
                    expect(utf7.decode('Item+ACA-3+ACA-is+ACAAow-1.')).to.equal('Item 3 is \u00A31.');

                });

                it('should decode examples that contain more than one mode shift', function() {
                    expect(utf7.decode('Jyv+AOQ-skyl+AOQ-')).to.equal('Jyv\u00E4skyl\u00E4');
                    expect(utf7.decode('Jyv+AOQ-skyl+AOQ')).to.equal('Jyv\u00E4skyl\u00E4');
                    expect(utf7.decode('\'+T2BZfQ-\' hei+AN8-t "Hallo"')).to.equal('\'\u4F60\u597D\' heißt "Hallo"');
                    expect(utf7.decode('\'+T2BZfQ\' hei+AN8-t "Hallo"')).to.equal('\'\u4F60\u597D\' heißt "Hallo"');
                    expect(utf7.decode('\'+T2BZfQ-\'+ACA-hei+AN8-t+ACAAIg-Hallo+ACI-')).to.equal('\'\u4F60\u597D\' heißt "Hallo"');
                    expect(utf7.decode('\'+T2BZfQ-\'+ACA-hei+AN8-t+ACAAIg-Hallo+ACI')).to.equal('\'\u4F60\u597D\' heißt "Hallo"');
                });
                
                it('should decode +- to the plus sign', function() {
                    expect(utf7.decode('Hot +- Spicy +- Fruity')).to.equal('Hot + Spicy + Fruity');
                    expect(utf7.decode('Hot+ACAAKwAg-Spicy+ACAAKwAg-Fruity')).to.equal('Hot + Spicy + Fruity');
                });
                
                it('should decode slashes in the beginning', function() {
                    expect(utf7.decode('+///typh2VDIf7Q-')).to.equal('\uffff\uedca\u9876\u5432\u1fed');
                    expect(utf7.decode('+///typh2VDIf7Q')).to.equal('\uffff\uedca\u9876\u5432\u1fed');
                });
                
                it('should decode non-ASCII chars', function() {
                    expect(utf7.decode('+AOQ-+-+AOQ-+-+AOQ-')).to.equal('\u00E4+\u00E4+\u00E4');
                    expect(utf7.decode('+AOQ++AOQ+-+AOQ')).to.equal('\u00E4+\u00E4+\u00E4');
                    expect(utf7.decode('+AOQAKwDkACsA5A-')).to.equal('\u00E4+\u00E4+\u00E4');
                    expect(utf7.decode('+AOQAKwDkACsA5A')).to.equal('\u00E4+\u00E4+\u00E4');
                });
            });
        });
    });
}));