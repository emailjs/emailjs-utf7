# UTF-7

Encodes and decodes JavaScript (Unicode/UCS-2) strings to UTF-7 ASCII strings. It supports two modes: UTF-7 as defined in [RFC 2152](http://tools.ietf.org/html/rfc2152) and Modified UTF-7 as defined by the IMAP standard in [RFC 3501, section 5.1.3](http://tools.ietf.org/html/rfc3501#section-5.1.3)

[![Build Status](https://travis-ci.org/Kreata/utf7.png)](https://travis-ci.org/Kreata/utf7)

## Usage

Require [utf7.js](utf7.js) either as a AMD module or like a regular `<script>`. This exposes object `utf7`.

### RFC 2152

```javascript
var encoded = utf7.encode('Jyväskylä');
'Jyv+AOQ-skyl+AOQ-' === encoded; // true

var decoded = utf7.decode(encoded);
'Jyväskylä' === decoded; // true
```

By default, `.encode()` only encodes the default characeters defined in RFC 2152. To also encode optional characters, use `.encodeAll()` or specify the characters you want to encode as the second argument to `.encode()`.

### IMAP (RFC 3501)

```javascript
var encoded = utf7.imap.encode('"你好" heißt "Hallo"');
'"&T2BZfQ-" hei&AN8-t "Hallo"' === encoded;

var decoded = utf7.imap.decode(encoded);
'"你好" heißt "Hallo"' === decoded;
```


## License

[Original code](https://github.com/kkaefer/utf7) licensed under BSD by Konstantin Käfer

AMD compatible fork licensed under BSD by Andris Reinman
