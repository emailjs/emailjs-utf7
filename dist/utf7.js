'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imapDecode = exports.imapEncode = exports.decode = exports.encodeAll = exports.encode = undefined;

var _emailjsBase = require('emailjs-base64');

function encodeToUTF7(str) {
  var b = new Uint8Array(str.length * 2);

  // In modified UTF-7, all characters are represented by their two byte Unicode ID.
  for (var i = 0, bi = 0, len = str.length; i < len; i++) {
    var c = str.charCodeAt(i);
    b[bi++] = c >> 8;
    b[bi++] = c & 0xFF;
  }

  return (0, _emailjsBase.encode)(b).replace(/=+$/, '');
}

function decodeFromUTF7(str) {
  var octets = (0, _emailjsBase.decode)(str);
  var output = '';

  // In modified UTF-7, all characters are represented by their two byte Unicode ID.
  for (var i = 0, len = octets.length; i < len;) {
    output += String.fromCharCode(octets[i++] << 8 | octets[i++]);
  }
  return output;
}

function escapeReservedRegexStrings(chars) {
  return chars.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

/**
 * Character classes defined by RFC 2152.
 */
var setD = 'A-Za-z0-9' + escapeReservedRegexStrings('\'(),-./:?');
var setO = escapeReservedRegexStrings('!"#$%&*;<=>@[]^_\'{|}');
var setW = escapeReservedRegexStrings(' \r\n\t');

/**
 * Encodes string to UTF-7, see RFC 2152
 * @param {String} str String to encode
 * @param {String} mask (optional) Characters to encode, defaults to RFC 2152 Set D
 */
var encode = exports.encode = function encode(str) {
  var mask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return str.replace(new RegExp('[^' + setD + escapeReservedRegexStrings(mask) + ']+', 'g'), function (chunk) {
    return '+' + (chunk === '+' ? '' : encodeToUTF7(chunk)) + '-';
  });
};

/**
 * Encodes string to UTF-7 with all optionals, see RFC 2152
 * @param {String} str String to encode
 */
var encodeAll = exports.encodeAll = function encodeAll(str) {
  return str.replace(new RegExp('[^' + setW + setD + setO + ']+', 'g'), function (chunk) {
    return '+' + (chunk === '+' ? '' : encodeToUTF7(chunk)) + '-';
  });
};

/**
 * Decodes UTF-7 string, see RFC 2152
 * @param {String} str String to decode
 */
var decode = exports.decode = function decode(str) {
  return str.replace(/\+([A-Za-z0-9/]*)-?/gi, function (_, chunk) {
    return chunk === '' ? '+' : decodeFromUTF7(chunk);
  });
};

/**
 * Encodes string to UTF-7 with all optionals, see RFC 3501
 *
 * All printable ASCII chars except for & must be represented by themselves.
 * We replace subsequent non-representable chars with their escape sequence.
 *
 * @param {String} str String to encode
 */
var imapEncode = exports.imapEncode = function imapEncode(str) {
  return str.replace(/&/g, '&-').replace(/[^\x20-\x7e]+/g, function (chunk) {
    return '&' + (chunk === '&' ? '' : encodeToUTF7(chunk)).replace(/\//g, ',') + '-';
  });
};

/**
 * Decodes UTF-7 string, see RFC 3501
 * @param {String} str String to decode
 */
var imapDecode = exports.imapDecode = function imapDecode(str) {
  return str.replace(/&([^-]*)-/g, function (_, chunk) {
    return chunk === '' ? '&' : decodeFromUTF7(chunk.replace(/,/g, '/'));
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGY3LmpzIl0sIm5hbWVzIjpbImVuY29kZVRvVVRGNyIsInN0ciIsImIiLCJVaW50OEFycmF5IiwibGVuZ3RoIiwiaSIsImJpIiwibGVuIiwiYyIsImNoYXJDb2RlQXQiLCJyZXBsYWNlIiwiZGVjb2RlRnJvbVVURjciLCJvY3RldHMiLCJvdXRwdXQiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJlc2NhcGVSZXNlcnZlZFJlZ2V4U3RyaW5ncyIsImNoYXJzIiwic2V0RCIsInNldE8iLCJzZXRXIiwiZW5jb2RlIiwibWFzayIsIlJlZ0V4cCIsImNodW5rIiwiZW5jb2RlQWxsIiwiZGVjb2RlIiwiXyIsImltYXBFbmNvZGUiLCJpbWFwRGVjb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUEsU0FBU0EsWUFBVCxDQUF1QkMsR0FBdkIsRUFBNEI7QUFDMUIsTUFBTUMsSUFBSSxJQUFJQyxVQUFKLENBQWVGLElBQUlHLE1BQUosR0FBYSxDQUE1QixDQUFWOztBQUVBO0FBQ0EsT0FBSyxJQUFJQyxJQUFJLENBQVIsRUFBV0MsS0FBSyxDQUFoQixFQUFtQkMsTUFBTU4sSUFBSUcsTUFBbEMsRUFBMENDLElBQUlFLEdBQTlDLEVBQW1ERixHQUFuRCxFQUF3RDtBQUN0RCxRQUFNRyxJQUFJUCxJQUFJUSxVQUFKLENBQWVKLENBQWYsQ0FBVjtBQUNBSCxNQUFFSSxJQUFGLElBQVVFLEtBQUssQ0FBZjtBQUNBTixNQUFFSSxJQUFGLElBQVVFLElBQUksSUFBZDtBQUNEOztBQUVELFNBQU8seUJBQWFOLENBQWIsRUFBZ0JRLE9BQWhCLENBQXdCLEtBQXhCLEVBQStCLEVBQS9CLENBQVA7QUFDRDs7QUFFRCxTQUFTQyxjQUFULENBQXlCVixHQUF6QixFQUE4QjtBQUM1QixNQUFNVyxTQUFTLHlCQUFhWCxHQUFiLENBQWY7QUFDQSxNQUFJWSxTQUFTLEVBQWI7O0FBRUE7QUFDQSxPQUFLLElBQUlSLElBQUksQ0FBUixFQUFXRSxNQUFNSyxPQUFPUixNQUE3QixFQUFxQ0MsSUFBSUUsR0FBekMsR0FBK0M7QUFDN0NNLGNBQVVDLE9BQU9DLFlBQVAsQ0FBb0JILE9BQU9QLEdBQVAsS0FBZSxDQUFmLEdBQW1CTyxPQUFPUCxHQUFQLENBQXZDLENBQVY7QUFDRDtBQUNELFNBQU9RLE1BQVA7QUFDRDs7QUFFRCxTQUFTRywwQkFBVCxDQUFxQ0MsS0FBckMsRUFBNEM7QUFDMUMsU0FBT0EsTUFBTVAsT0FBTixDQUFjLDBCQUFkLEVBQTBDLE1BQTFDLENBQVA7QUFDRDs7QUFFRDs7O0FBR0EsSUFBTVEsT0FBTyxjQUFjRiwyQkFBMkIsWUFBM0IsQ0FBM0I7QUFDQSxJQUFNRyxPQUFPSCwyQkFBMkIsdUJBQTNCLENBQWI7QUFDQSxJQUFNSSxPQUFPSiwyQkFBMkIsU0FBM0IsQ0FBYjs7QUFFQTs7Ozs7QUFLTyxJQUFNSywwQkFBUyxTQUFUQSxNQUFTLENBQUNwQixHQUFEO0FBQUEsTUFBTXFCLElBQU4sdUVBQWEsRUFBYjtBQUFBLFNBQ3BCckIsSUFBSVMsT0FBSixDQUFZLElBQUlhLE1BQUosQ0FBVyxPQUFPTCxJQUFQLEdBQWNGLDJCQUEyQk0sSUFBM0IsQ0FBZCxHQUFpRCxJQUE1RCxFQUFrRSxHQUFsRSxDQUFaLEVBQW9GO0FBQUEsV0FBUyxPQUFPRSxVQUFVLEdBQVYsR0FBZ0IsRUFBaEIsR0FBcUJ4QixhQUFhd0IsS0FBYixDQUE1QixJQUFtRCxHQUE1RDtBQUFBLEdBQXBGLENBRG9CO0FBQUEsQ0FBZjs7QUFHUDs7OztBQUlPLElBQU1DLGdDQUFZLFNBQVpBLFNBQVk7QUFBQSxTQUN2QnhCLElBQUlTLE9BQUosQ0FBWSxJQUFJYSxNQUFKLENBQVcsT0FBT0gsSUFBUCxHQUFjRixJQUFkLEdBQXFCQyxJQUFyQixHQUE0QixJQUF2QyxFQUE2QyxHQUE3QyxDQUFaLEVBQStEO0FBQUEsV0FBUyxPQUFPSyxVQUFVLEdBQVYsR0FBZ0IsRUFBaEIsR0FBcUJ4QixhQUFhd0IsS0FBYixDQUE1QixJQUFtRCxHQUE1RDtBQUFBLEdBQS9ELENBRHVCO0FBQUEsQ0FBbEI7O0FBR1A7Ozs7QUFJTyxJQUFNRSwwQkFBUyxTQUFUQSxNQUFTO0FBQUEsU0FDcEJ6QixJQUFJUyxPQUFKLENBQVksdUJBQVosRUFBcUMsVUFBQ2lCLENBQUQsRUFBSUgsS0FBSjtBQUFBLFdBQWNBLFVBQVUsRUFBVixHQUFlLEdBQWYsR0FBcUJiLGVBQWVhLEtBQWYsQ0FBbkM7QUFBQSxHQUFyQyxDQURvQjtBQUFBLENBQWY7O0FBR1A7Ozs7Ozs7O0FBUU8sSUFBTUksa0NBQWEsU0FBYkEsVUFBYTtBQUFBLFNBQ3hCM0IsSUFBSVMsT0FBSixDQUFZLElBQVosRUFBa0IsSUFBbEIsRUFBd0JBLE9BQXhCLENBQWdDLGdCQUFoQyxFQUFrRDtBQUFBLFdBQVMsTUFBTSxDQUFDYyxVQUFVLEdBQVYsR0FBZ0IsRUFBaEIsR0FBcUJ4QixhQUFhd0IsS0FBYixDQUF0QixFQUEyQ2QsT0FBM0MsQ0FBbUQsS0FBbkQsRUFBMEQsR0FBMUQsQ0FBTixHQUF1RSxHQUFoRjtBQUFBLEdBQWxELENBRHdCO0FBQUEsQ0FBbkI7O0FBR1A7Ozs7QUFJTyxJQUFNbUIsa0NBQWEsU0FBYkEsVUFBYTtBQUFBLFNBQ3hCNUIsSUFBSVMsT0FBSixDQUFZLFlBQVosRUFBMEIsVUFBQ2lCLENBQUQsRUFBSUgsS0FBSjtBQUFBLFdBQWVBLFVBQVUsRUFBWCxHQUFpQixHQUFqQixHQUF1QmIsZUFBZWEsTUFBTWQsT0FBTixDQUFjLElBQWQsRUFBb0IsR0FBcEIsQ0FBZixDQUFyQztBQUFBLEdBQTFCLENBRHdCO0FBQUEsQ0FBbkIiLCJmaWxlIjoidXRmNy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVuY29kZSBhcyBlbmNvZGVCYXNlNjQsIGRlY29kZSBhcyBkZWNvZGVCYXNlNjQgfSBmcm9tICdlbWFpbGpzLWJhc2U2NCdcblxuZnVuY3Rpb24gZW5jb2RlVG9VVEY3IChzdHIpIHtcbiAgY29uc3QgYiA9IG5ldyBVaW50OEFycmF5KHN0ci5sZW5ndGggKiAyKVxuXG4gIC8vIEluIG1vZGlmaWVkIFVURi03LCBhbGwgY2hhcmFjdGVycyBhcmUgcmVwcmVzZW50ZWQgYnkgdGhlaXIgdHdvIGJ5dGUgVW5pY29kZSBJRC5cbiAgZm9yIChsZXQgaSA9IDAsIGJpID0gMCwgbGVuID0gc3RyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgYltiaSsrXSA9IGMgPj4gOFxuICAgIGJbYmkrK10gPSBjICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGVuY29kZUJhc2U2NChiKS5yZXBsYWNlKC89KyQvLCAnJylcbn1cblxuZnVuY3Rpb24gZGVjb2RlRnJvbVVURjcgKHN0cikge1xuICBjb25zdCBvY3RldHMgPSBkZWNvZGVCYXNlNjQoc3RyKVxuICBsZXQgb3V0cHV0ID0gJydcblxuICAvLyBJbiBtb2RpZmllZCBVVEYtNywgYWxsIGNoYXJhY3RlcnMgYXJlIHJlcHJlc2VudGVkIGJ5IHRoZWlyIHR3byBieXRlIFVuaWNvZGUgSUQuXG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBvY3RldHMubGVuZ3RoOyBpIDwgbGVuOykge1xuICAgIG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKG9jdGV0c1tpKytdIDw8IDggfCBvY3RldHNbaSsrXSlcbiAgfVxuICByZXR1cm4gb3V0cHV0XG59XG5cbmZ1bmN0aW9uIGVzY2FwZVJlc2VydmVkUmVnZXhTdHJpbmdzIChjaGFycykge1xuICByZXR1cm4gY2hhcnMucmVwbGFjZSgvWy1bXFxde30oKSorPy4sXFxcXF4kfCNcXHNdL2csICdcXFxcJCYnKVxufVxuXG4vKipcbiAqIENoYXJhY3RlciBjbGFzc2VzIGRlZmluZWQgYnkgUkZDIDIxNTIuXG4gKi9cbmNvbnN0IHNldEQgPSAnQS1aYS16MC05JyArIGVzY2FwZVJlc2VydmVkUmVnZXhTdHJpbmdzKCdcXCcoKSwtLi86PycpXG5jb25zdCBzZXRPID0gZXNjYXBlUmVzZXJ2ZWRSZWdleFN0cmluZ3MoJyFcIiMkJSYqOzw9PkBbXV5fXFwne3x9JylcbmNvbnN0IHNldFcgPSBlc2NhcGVSZXNlcnZlZFJlZ2V4U3RyaW5ncygnIFxcclxcblxcdCcpXG5cbi8qKlxuICogRW5jb2RlcyBzdHJpbmcgdG8gVVRGLTcsIHNlZSBSRkMgMjE1MlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBTdHJpbmcgdG8gZW5jb2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gbWFzayAob3B0aW9uYWwpIENoYXJhY3RlcnMgdG8gZW5jb2RlLCBkZWZhdWx0cyB0byBSRkMgMjE1MiBTZXQgRFxuICovXG5leHBvcnQgY29uc3QgZW5jb2RlID0gKHN0ciwgbWFzayA9ICcnKSA9PlxuICBzdHIucmVwbGFjZShuZXcgUmVnRXhwKCdbXicgKyBzZXREICsgZXNjYXBlUmVzZXJ2ZWRSZWdleFN0cmluZ3MobWFzaykgKyAnXSsnLCAnZycpLCBjaHVuayA9PiAnKycgKyAoY2h1bmsgPT09ICcrJyA/ICcnIDogZW5jb2RlVG9VVEY3KGNodW5rKSkgKyAnLScpXG5cbi8qKlxuICogRW5jb2RlcyBzdHJpbmcgdG8gVVRGLTcgd2l0aCBhbGwgb3B0aW9uYWxzLCBzZWUgUkZDIDIxNTJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgU3RyaW5nIHRvIGVuY29kZVxuICovXG5leHBvcnQgY29uc3QgZW5jb2RlQWxsID0gc3RyID0+XG4gIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoJ1teJyArIHNldFcgKyBzZXREICsgc2V0TyArICddKycsICdnJyksIGNodW5rID0+ICcrJyArIChjaHVuayA9PT0gJysnID8gJycgOiBlbmNvZGVUb1VURjcoY2h1bmspKSArICctJylcblxuLyoqXG4gKiBEZWNvZGVzIFVURi03IHN0cmluZywgc2VlIFJGQyAyMTUyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFN0cmluZyB0byBkZWNvZGVcbiAqL1xuZXhwb3J0IGNvbnN0IGRlY29kZSA9IHN0ciA9PlxuICBzdHIucmVwbGFjZSgvXFwrKFtBLVphLXowLTkvXSopLT8vZ2ksIChfLCBjaHVuaykgPT4gY2h1bmsgPT09ICcnID8gJysnIDogZGVjb2RlRnJvbVVURjcoY2h1bmspKVxuXG4vKipcbiAqIEVuY29kZXMgc3RyaW5nIHRvIFVURi03IHdpdGggYWxsIG9wdGlvbmFscywgc2VlIFJGQyAzNTAxXG4gKlxuICogQWxsIHByaW50YWJsZSBBU0NJSSBjaGFycyBleGNlcHQgZm9yICYgbXVzdCBiZSByZXByZXNlbnRlZCBieSB0aGVtc2VsdmVzLlxuICogV2UgcmVwbGFjZSBzdWJzZXF1ZW50IG5vbi1yZXByZXNlbnRhYmxlIGNoYXJzIHdpdGggdGhlaXIgZXNjYXBlIHNlcXVlbmNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgU3RyaW5nIHRvIGVuY29kZVxuICovXG5leHBvcnQgY29uc3QgaW1hcEVuY29kZSA9IHN0ciA9PlxuICBzdHIucmVwbGFjZSgvJi9nLCAnJi0nKS5yZXBsYWNlKC9bXlxceDIwLVxceDdlXSsvZywgY2h1bmsgPT4gJyYnICsgKGNodW5rID09PSAnJicgPyAnJyA6IGVuY29kZVRvVVRGNyhjaHVuaykpLnJlcGxhY2UoL1xcLy9nLCAnLCcpICsgJy0nKVxuXG4vKipcbiAqIERlY29kZXMgVVRGLTcgc3RyaW5nLCBzZWUgUkZDIDM1MDFcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgU3RyaW5nIHRvIGRlY29kZVxuICovXG5leHBvcnQgY29uc3QgaW1hcERlY29kZSA9IHN0ciA9PlxuICBzdHIucmVwbGFjZSgvJihbXi1dKiktL2csIChfLCBjaHVuaykgPT4gKGNodW5rID09PSAnJykgPyAnJicgOiBkZWNvZGVGcm9tVVRGNyhjaHVuay5yZXBsYWNlKC8sL2csICcvJykpKVxuIl19