/**
 * Base64 encoding.
 *
 * Based on [base64-js]{@link https://github.com/beatgammit/base64-js},
 * released under MIT license
 */

const LOOKUP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('')
const MAX_CHUNK_LENGTH = 16383 // must be multiple of 3

const tripletToBase64 = num => LOOKUP[num >> 18 & 0x3F] + LOOKUP[num >> 12 & 0x3F] + LOOKUP[num >> 6 & 0x3F] + LOOKUP[num & 0x3F]

function encodeChunk (uint8, start, end) {
  let output = ''
  for (var i = start; i < end; i += 3) {
    output += tripletToBase64((uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]))
  }
  return output
}

export default function fromByteArray (uint8) {
  const len = uint8.length
  const extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  let output = ''

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += MAX_CHUNK_LENGTH) {
    output += encodeChunk(uint8, i, (i + MAX_CHUNK_LENGTH) > len2 ? len2 : (i + MAX_CHUNK_LENGTH))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    const tmp = uint8[len - 1]
    output += LOOKUP[tmp >> 2]
    output += LOOKUP[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    const tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += LOOKUP[tmp >> 10]
    output += LOOKUP[(tmp >> 4) & 0x3F]
    output += LOOKUP[(tmp << 2) & 0x3F]
    output += '='
  }

  return output
}
