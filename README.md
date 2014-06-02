# UTF-7

UMD module that encodes and decodes JavaScript (Unicode/UCS-2) strings to UTF-7 ASCII strings. It supports two modes: UTF-7 as defined in [RFC 2152](http://tools.ietf.org/html/rfc2152) and Modified UTF-7 as defined by the IMAP standard in [RFC 3501, section 5.1.3](http://tools.ietf.org/html/rfc3501#section-5.1.3)

### [Bower](http://bower.io/):

    bower install git@github.com:whiteout-io/utf7.git#<TAG NAME>

### [npm](https://www.npmjs.org/):

    npm install https://github.com/whiteout-io/utf7/tarball/<TAG NAME>

## Usage

### node.js

    var utf7 = require('utf7');

### Browser

Require [utf7.js](src/utf7.js) either as a AMD module include it globally in your markup like a regular ```<script>``` (exposes utf7).

### RFC 2152

    var encoded = utf7.encode('Jyväskylä');
    'Jyv+AOQ-skyl+AOQ-' === encoded; // true

    var decoded = utf7.decode(encoded);
    'Jyväskylä' === decoded; // true

By default, `.encode()` only encodes the default characeters defined in RFC 2152. To also encode optional characters, use `.encodeAll()` or specify the characters you want to encode as the second argument to `.encode()`.

### IMAP (RFC 3501)

    var encoded = utf7.imap.encode('"你好" heißt "Hallo"');
    '"&T2BZfQ-" hei&AN8-t "Hallo"' === encoded;

    var decoded = utf7.imap.decode(encoded);
    '"你好" heißt "Hallo"' === decoded;

## License

[Original code](https://github.com/kkaefer/utf7) licensed under MIT by Konstantin Käfer

```
Copyright (c) 2010-2011 Konstantin Käfer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

UMD fork licensed under MIT by Andris Reinman
