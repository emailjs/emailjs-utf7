/**
 * Safe base64 decoding. Does not throw on unexpected input.
 *
 * Implementation from the MDN docs:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding
 * (MDN code samples are MIT licensed)
 *
 * @param {String} base64Str Base64 encoded string
 * @returns {Uint8Array} Decoded binary blob
 */
export default function base64toTypedArray (base64Str) {
  var bitsSoFar = 0
  var validBits = 0
  var iOut = 0
  var arr = new Uint8Array(Math.ceil(base64Str.length * 3 / 4))
  var c
  var bits

  for (var i = 0, len = base64Str.length; i < len; i++) {
    c = base64Str.charCodeAt(i)
    if (c >= 0x41 && c <= 0x5a) { // [A-Z]
      bits = c - 0x41
    } else if (c >= 0x61 && c <= 0x7a) { // [a-z]
      bits = c - 0x61 + 0x1a
    } else if (c >= 0x30 && c <= 0x39) { // [0-9]
      bits = c - 0x30 + 0x34
    } else if (c === 0x2b) { // +
      bits = 0x3e
    } else if (c === 0x2f) { // /
      bits = 0x3f
    } else if (c === 0x3d) { // =
      validBits = 0
      continue
    } else {
          // ignore all other characters!
      continue
    }
    bitsSoFar = (bitsSoFar << 6) | bits
    validBits += 6
    if (validBits >= 8) {
      validBits -= 8
      arr[iOut++] = bitsSoFar >> validBits
      if (validBits === 2) {
        bitsSoFar &= 0x03
      } else if (validBits === 4) {
        bitsSoFar &= 0x0f
      }
    }
  }

  if (iOut < arr.length) {
    return arr.subarray(0, iOut)
  }
  return arr
}
