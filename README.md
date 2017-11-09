# UTF-7

[![Greenkeeper badge](https://badges.greenkeeper.io/emailjs/emailjs-utf7.svg)](https://greenkeeper.io/) [![Build Status](https://travis-ci.org/emailjs/emailjs-utf7.png?branch=master)](https://travis-ci.org/emailjs/emailjs-utf7) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)  [![ES6+](https://camo.githubusercontent.com/567e52200713e0f0c05a5238d91e1d096292b338/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f65732d362b2d627269676874677265656e2e737667)](https://kangax.github.io/compat-table/es6/)

Encodes and decodes JavaScript (Unicode/UCS-2) strings to UTF-7 ASCII strings. It supports two modes: UTF-7 as defined in [RFC 2152](http://tools.ietf.org/html/rfc2152) and Modified UTF-7 as defined by the IMAP standard in [RFC 3501, section 5.1.3](http://tools.ietf.org/html/rfc3501#section-5.1.3)

## Usage

```
npm install --save emailjs-utf7
```

```javascript
import { encode, encodeAll, decode, imapEncode, imapDecode } from 'emailjs-utf7'
```


### RFC 2152

```javascript
encode('Jyväskylä') // -> 'Jyv+AOQ-skyl+AOQ-'
decode(encoded); // -> 'Jyväskylä'
```

By default, `encode()` only encodes the default characeters defined in RFC 2152. To also encode optional characters, use `encodeAll()` or specify the characters you want to encode as the second argument to `.encode()`.

### IMAP (RFC 3501)

```javascript
imapEncode('"你好" heißt "Hallo"') // -> '"&T2BZfQ-" hei&AN8-t "Hallo"'
imapDecode(encoded) // -> '"你好" heißt "Hallo"'
```

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

Fork licensed under MIT by Andris Reinman
