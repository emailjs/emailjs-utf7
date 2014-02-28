/* jshint browser: true */
/* global define: false, test: false, equal: false */

define(['../utf7.js'], function(utf7){

    "use strict";

    test('test conversion from utf8 to utf7', function() {
        // Examples from RFC 2152.
        equal('A+ImIDkQ-.', utf7.encodeAll('A\u2262\u0391.'));
        equal('A+ImIDkQ-.', utf7.encode('A\u2262\u0391.'));

        equal('+ZeVnLIqe-', utf7.encodeAll('\u65E5\u672C\u8A9E'));
        equal('+ZeVnLIqe-', utf7.encode('\u65E5\u672C\u8A9E'));

        equal('Hi Mom -+Jjo--!', utf7.encodeAll('Hi Mom -\u263A-!'));
        equal('Hi Mom -+Jjo--!', utf7.encode('Hi Mom -\u263A-!', ' !'));
        equal('Hi+ACA-Mom+ACA--+Jjo--+ACE-', utf7.encode('Hi Mom -\u263A-!'));

        equal('Item 3 is +AKM-1.', utf7.encodeAll('Item 3 is \u00A31.'));
        equal('Item 3 is +AKM-1.', utf7.encode('Item 3 is \u00A31.', ' '));
        equal('Item+ACA-3+ACA-is+ACAAow-1.', utf7.encode('Item 3 is \u00A31.'));

        // Custom examples that contain more than one mode shift.
        equal('Jyv+AOQ-skyl+AOQ-', utf7.encode('Jyv\u00E4skyl\u00E4'));
        equal('Jyv+AOQ-skyl+AOQ-', utf7.encodeAll('Jyv\u00E4skyl\u00E4'));

        equal('\'+T2BZfQ-\' hei+AN8-t "Hallo"', utf7.encodeAll('\'\u4F60\u597D\' heißt "Hallo"'));
        equal('\'+T2BZfQ-\' hei+AN8-t "Hallo"', utf7.encode('\'\u4F60\u597D\' heißt "Hallo"', ' "'));
        equal('\'+T2BZfQ-\'+ACA-hei+AN8-t+ACAAIg-Hallo+ACI-', utf7.encode('\'\u4F60\u597D\' heißt "Hallo"'));

        // The plus sign is represented as +-.
        equal('Hot +- Spicy +- Fruity', utf7.encodeAll('Hot + Spicy + Fruity'));
        equal('Hot +- Spicy +- Fruity', utf7.encode('Hot + Spicy + Fruity', ' '));
        equal('Hot+ACAAKwAg-Spicy+ACAAKwAg-Fruity', utf7.encode('Hot + Spicy + Fruity'));

        // Slashes in the beginning.
        equal('+///typh2VDIf7Q-', utf7.encodeAll('\uffff\uedca\u9876\u5432\u1fed'));

        // + sign around non-ASCII chars
        equal('+AOQAKwDkACsA5A-', utf7.encodeAll('\u00E4+\u00E4+\u00E4'));
    });

    test('test conversion from utf7 to utf8', function() {
        // Examples from RFC 2152.
        equal('A\u2262\u0391.', utf7.decode('A+ImIDkQ-.'));
        equal('A\u2262\u0391.', utf7.decode('A+ImIDkQ.'));

        equal('\u65E5\u672C\u8A9E', utf7.decode('+ZeVnLIqe-'));
        equal('\u65E5\u672C\u8A9E', utf7.decode('+ZeVnLIqe'));

        equal('Hi Mom -\u263A-!', utf7.decode('Hi Mom -+Jjo--!'));
        equal('Hi Mom -\u263A-!', utf7.decode('Hi+ACA-Mom+ACA--+Jjo--+ACE-'));
        equal('Item 3 is \u00A31.', utf7.decode('Item 3 is +AKM-1.'));
        equal('Item 3 is \u00A31.', utf7.decode('Item+ACA-3+ACA-is+ACAAow-1.'));

        // Custom examples that contain more than one mode shift.
        equal('Jyv\u00E4skyl\u00E4', utf7.decode('Jyv+AOQ-skyl+AOQ-'));
        equal('Jyv\u00E4skyl\u00E4', utf7.decode('Jyv+AOQ-skyl+AOQ'));
        equal('\'\u4F60\u597D\' heißt "Hallo"', utf7.decode('\'+T2BZfQ-\' hei+AN8-t "Hallo"'));
        equal('\'\u4F60\u597D\' heißt "Hallo"', utf7.decode('\'+T2BZfQ\' hei+AN8-t "Hallo"'));
        equal('\'\u4F60\u597D\' heißt "Hallo"', utf7.decode('\'+T2BZfQ-\'+ACA-hei+AN8-t+ACAAIg-Hallo+ACI-'));
        equal('\'\u4F60\u597D\' heißt "Hallo"', utf7.decode('\'+T2BZfQ-\'+ACA-hei+AN8-t+ACAAIg-Hallo+ACI'));

        // The plus sign is represented by +-.
        equal('Hot + Spicy + Fruity', utf7.decode('Hot +- Spicy +- Fruity'));
        equal('Hot + Spicy + Fruity', utf7.decode('Hot+ACAAKwAg-Spicy+ACAAKwAg-Fruity'));

        // Slashes in the beginning.
        equal('\uffff\uedca\u9876\u5432\u1fed', utf7.decode('+///typh2VDIf7Q-'));
        equal('\uffff\uedca\u9876\u5432\u1fed', utf7.decode('+///typh2VDIf7Q'));

        // + sign around non-ASCII chars
        equal('\u00E4+\u00E4+\u00E4', utf7.decode('+AOQ-+-+AOQ-+-+AOQ-'));
        equal('\u00E4+\u00E4+\u00E4', utf7.decode('+AOQ++AOQ+-+AOQ'));
        equal('\u00E4+\u00E4+\u00E4', utf7.decode('+AOQAKwDkACsA5A-'));
        equal('\u00E4+\u00E4+\u00E4', utf7.decode('+AOQAKwDkACsA5A'));
    });

});

