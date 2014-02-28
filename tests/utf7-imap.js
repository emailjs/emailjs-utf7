/* jshint browser: true */
/* global define: false, test: false, equal: false */

define(['../utf7.js'], function(utf7){

    "use strict";

    test('test conversion from utf8 to utf7', function() {
        // Examples from RFC 2152.
        equal('A&ImIDkQ-.', utf7.imap.encode('A\u2262\u0391.'));
        equal('&ZeVnLIqe-', utf7.imap.encode('\u65E5\u672C\u8A9E'));
        equal('Hi Mom -&Jjo--!', utf7.imap.encode('Hi Mom -\u263A-!'));
        equal('Item 3 is &AKM-1.', utf7.imap.encode('Item 3 is \u00A31.'));

        // Custom examples that contain more than one mode shift.
        equal('Jyv&AOQ-skyl&AOQ-', utf7.imap.encode('Jyv\u00E4skyl\u00E4'));
        equal('\'&T2BZfQ-\' hei&AN8-t "Hallo"', utf7.imap.encode('\'\u4F60\u597D\' heißt "Hallo"'));

        // The ampersand sign is represented as &-.
        equal('Hot &- Spicy &- Fruity', utf7.imap.encode('Hot & Spicy & Fruity'));

        // Slashes are converted to commas.
        equal('&,,,typh2VDIf7Q-', utf7.imap.encode('\uffff\uedca\u9876\u5432\u1fed'));

        // & sign around non-ASCII chars
        equal('&AOQ-&-&AOQ-&-&AOQ-', utf7.imap.encode('\u00E4&\u00E4&\u00E4'));
    });

    test('test conversion from utf7 to utf8', function() {
        // Examples from RFC 2152.
        equal('A\u2262\u0391.', utf7.imap.decode('A&ImIDkQ-.'));
        equal('\u65E5\u672C\u8A9E', utf7.imap.decode('&ZeVnLIqe-'));
        equal('Hi Mom -\u263A-!', utf7.imap.decode('Hi Mom -&Jjo--!'));
        equal('Item 3 is \u00A31.', utf7.imap.decode('Item 3 is &AKM-1.'));

        // Custom examples that contain more than one mode shift.
        equal('Jyv\u00E4skyl\u00E4', utf7.imap.decode('Jyv&AOQ-skyl&AOQ-'));
        equal('\'\u4F60\u597D\' heißt "Hallo"', utf7.imap.decode('\'&T2BZfQ-\' hei&AN8-t "Hallo"'));

        // The ampersand sign is represented by &-.
        equal('Hot & Spicy & Fruity', utf7.imap.decode('Hot &- Spicy &- Fruity'));

        // Slashes are converted to commas.
        equal('\uffff\uedca\u9876\u5432\u1fed', utf7.imap.decode('&,,,typh2VDIf7Q-'));

        // & sign around non-ASCII chars
        equal('\u00E4&\u00E4&\u00E4', utf7.imap.decode('&AOQ-&-&AOQ-&-&AOQ-'));
    });

});
