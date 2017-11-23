import { encode as encodeBase64, decode as decodeBase64, OUTPUT_TYPED_ARRAY } from 'emailjs-base64'

function encodeToUTF7 (str) {
  const b = new Uint8Array(str.length * 2)

  // In modified UTF-7, all characters are represented by their two byte Unicode ID.
  for (let i = 0, bi = 0, len = str.length; i < len; i++) {
    const c = str.charCodeAt(i)
    b[bi++] = c >> 8
    b[bi++] = c & 0xFF
  }

  return encodeBase64(b).replace(/=+$/, '')
}

function decodeFromUTF7 (str) {
  const octets = decodeBase64(str, OUTPUT_TYPED_ARRAY)
  let output = ''

  // In modified UTF-7, all characters are represented by their two byte Unicode ID.
  for (let i = 0, len = octets.length; i < len;) {
    output += String.fromCharCode(octets[i++] << 8 | octets[i++])
  }
  return output
}

function escapeReservedRegexStrings (chars) {
  return chars.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

/**
 * Character classes defined by RFC 2152.
 */
const setD = 'A-Za-z0-9' + escapeReservedRegexStrings('\'(),-./:?')
const setO = escapeReservedRegexStrings('!"#$%&*;<=>@[]^_\'{|}')
const setW = escapeReservedRegexStrings(' \r\n\t')

/**
 * Encodes string to UTF-7, see RFC 2152
 * @param {String} str String to encode
 * @param {String} mask (optional) Characters to encode, defaults to RFC 2152 Set D
 */
export const encode = (str, mask = '') =>
  str.replace(new RegExp('[^' + setD + escapeReservedRegexStrings(mask) + ']+', 'g'), chunk => '+' + (chunk === '+' ? '' : encodeToUTF7(chunk)) + '-')

/**
 * Encodes string to UTF-7 with all optionals, see RFC 2152
 * @param {String} str String to encode
 */
export const encodeAll = str =>
  str.replace(new RegExp('[^' + setW + setD + setO + ']+', 'g'), chunk => '+' + (chunk === '+' ? '' : encodeToUTF7(chunk)) + '-')

/**
 * Decodes UTF-7 string, see RFC 2152
 * @param {String} str String to decode
 */
export const decode = str =>
  str.replace(/\+([A-Za-z0-9/]*)-?/gi, (_, chunk) => chunk === '' ? '+' : decodeFromUTF7(chunk))

/**
 * Encodes string to UTF-7 with all optionals, see RFC 3501
 *
 * All printable ASCII chars except for & must be represented by themselves.
 * We replace subsequent non-representable chars with their escape sequence.
 *
 * @param {String} str String to encode
 */
export const imapEncode = str =>
  str.replace(/&/g, '&-').replace(/[^\x20-\x7e]+/g, chunk => '&' + (chunk === '&' ? '' : encodeToUTF7(chunk)).replace(/\//g, ',') + '-')

/**
 * Decodes UTF-7 string, see RFC 3501
 * @param {String} str String to decode
 */
export const imapDecode = str =>
  str.replace(/&([^-]*)-/g, (_, chunk) => (chunk === '') ? '&' : decodeFromUTF7(chunk.replace(/,/g, '/')))
