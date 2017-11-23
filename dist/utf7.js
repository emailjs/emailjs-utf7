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
  var octets = (0, _emailjsBase.decode)(str, _emailjsBase.OUTPUT_TYPED_ARRAY);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGY3LmpzIl0sIm5hbWVzIjpbImVuY29kZVRvVVRGNyIsInN0ciIsImIiLCJVaW50OEFycmF5IiwibGVuZ3RoIiwiaSIsImJpIiwibGVuIiwiYyIsImNoYXJDb2RlQXQiLCJyZXBsYWNlIiwiZGVjb2RlRnJvbVVURjciLCJvY3RldHMiLCJvdXRwdXQiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJlc2NhcGVSZXNlcnZlZFJlZ2V4U3RyaW5ncyIsImNoYXJzIiwic2V0RCIsInNldE8iLCJzZXRXIiwiZW5jb2RlIiwibWFzayIsIlJlZ0V4cCIsImNodW5rIiwiZW5jb2RlQWxsIiwiZGVjb2RlIiwiXyIsImltYXBFbmNvZGUiLCJpbWFwRGVjb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUEsU0FBU0EsWUFBVCxDQUF1QkMsR0FBdkIsRUFBNEI7QUFDMUIsTUFBTUMsSUFBSSxJQUFJQyxVQUFKLENBQWVGLElBQUlHLE1BQUosR0FBYSxDQUE1QixDQUFWOztBQUVBO0FBQ0EsT0FBSyxJQUFJQyxJQUFJLENBQVIsRUFBV0MsS0FBSyxDQUFoQixFQUFtQkMsTUFBTU4sSUFBSUcsTUFBbEMsRUFBMENDLElBQUlFLEdBQTlDLEVBQW1ERixHQUFuRCxFQUF3RDtBQUN0RCxRQUFNRyxJQUFJUCxJQUFJUSxVQUFKLENBQWVKLENBQWYsQ0FBVjtBQUNBSCxNQUFFSSxJQUFGLElBQVVFLEtBQUssQ0FBZjtBQUNBTixNQUFFSSxJQUFGLElBQVVFLElBQUksSUFBZDtBQUNEOztBQUVELFNBQU8seUJBQWFOLENBQWIsRUFBZ0JRLE9BQWhCLENBQXdCLEtBQXhCLEVBQStCLEVBQS9CLENBQVA7QUFDRDs7QUFFRCxTQUFTQyxjQUFULENBQXlCVixHQUF6QixFQUE4QjtBQUM1QixNQUFNVyxTQUFTLHlCQUFhWCxHQUFiLGtDQUFmO0FBQ0EsTUFBSVksU0FBUyxFQUFiOztBQUVBO0FBQ0EsT0FBSyxJQUFJUixJQUFJLENBQVIsRUFBV0UsTUFBTUssT0FBT1IsTUFBN0IsRUFBcUNDLElBQUlFLEdBQXpDLEdBQStDO0FBQzdDTSxjQUFVQyxPQUFPQyxZQUFQLENBQW9CSCxPQUFPUCxHQUFQLEtBQWUsQ0FBZixHQUFtQk8sT0FBT1AsR0FBUCxDQUF2QyxDQUFWO0FBQ0Q7QUFDRCxTQUFPUSxNQUFQO0FBQ0Q7O0FBRUQsU0FBU0csMEJBQVQsQ0FBcUNDLEtBQXJDLEVBQTRDO0FBQzFDLFNBQU9BLE1BQU1QLE9BQU4sQ0FBYywwQkFBZCxFQUEwQyxNQUExQyxDQUFQO0FBQ0Q7O0FBRUQ7OztBQUdBLElBQU1RLE9BQU8sY0FBY0YsMkJBQTJCLFlBQTNCLENBQTNCO0FBQ0EsSUFBTUcsT0FBT0gsMkJBQTJCLHVCQUEzQixDQUFiO0FBQ0EsSUFBTUksT0FBT0osMkJBQTJCLFNBQTNCLENBQWI7O0FBRUE7Ozs7O0FBS08sSUFBTUssMEJBQVMsU0FBVEEsTUFBUyxDQUFDcEIsR0FBRDtBQUFBLE1BQU1xQixJQUFOLHVFQUFhLEVBQWI7QUFBQSxTQUNwQnJCLElBQUlTLE9BQUosQ0FBWSxJQUFJYSxNQUFKLENBQVcsT0FBT0wsSUFBUCxHQUFjRiwyQkFBMkJNLElBQTNCLENBQWQsR0FBaUQsSUFBNUQsRUFBa0UsR0FBbEUsQ0FBWixFQUFvRjtBQUFBLFdBQVMsT0FBT0UsVUFBVSxHQUFWLEdBQWdCLEVBQWhCLEdBQXFCeEIsYUFBYXdCLEtBQWIsQ0FBNUIsSUFBbUQsR0FBNUQ7QUFBQSxHQUFwRixDQURvQjtBQUFBLENBQWY7O0FBR1A7Ozs7QUFJTyxJQUFNQyxnQ0FBWSxTQUFaQSxTQUFZO0FBQUEsU0FDdkJ4QixJQUFJUyxPQUFKLENBQVksSUFBSWEsTUFBSixDQUFXLE9BQU9ILElBQVAsR0FBY0YsSUFBZCxHQUFxQkMsSUFBckIsR0FBNEIsSUFBdkMsRUFBNkMsR0FBN0MsQ0FBWixFQUErRDtBQUFBLFdBQVMsT0FBT0ssVUFBVSxHQUFWLEdBQWdCLEVBQWhCLEdBQXFCeEIsYUFBYXdCLEtBQWIsQ0FBNUIsSUFBbUQsR0FBNUQ7QUFBQSxHQUEvRCxDQUR1QjtBQUFBLENBQWxCOztBQUdQOzs7O0FBSU8sSUFBTUUsMEJBQVMsU0FBVEEsTUFBUztBQUFBLFNBQ3BCekIsSUFBSVMsT0FBSixDQUFZLHVCQUFaLEVBQXFDLFVBQUNpQixDQUFELEVBQUlILEtBQUo7QUFBQSxXQUFjQSxVQUFVLEVBQVYsR0FBZSxHQUFmLEdBQXFCYixlQUFlYSxLQUFmLENBQW5DO0FBQUEsR0FBckMsQ0FEb0I7QUFBQSxDQUFmOztBQUdQOzs7Ozs7OztBQVFPLElBQU1JLGtDQUFhLFNBQWJBLFVBQWE7QUFBQSxTQUN4QjNCLElBQUlTLE9BQUosQ0FBWSxJQUFaLEVBQWtCLElBQWxCLEVBQXdCQSxPQUF4QixDQUFnQyxnQkFBaEMsRUFBa0Q7QUFBQSxXQUFTLE1BQU0sQ0FBQ2MsVUFBVSxHQUFWLEdBQWdCLEVBQWhCLEdBQXFCeEIsYUFBYXdCLEtBQWIsQ0FBdEIsRUFBMkNkLE9BQTNDLENBQW1ELEtBQW5ELEVBQTBELEdBQTFELENBQU4sR0FBdUUsR0FBaEY7QUFBQSxHQUFsRCxDQUR3QjtBQUFBLENBQW5COztBQUdQOzs7O0FBSU8sSUFBTW1CLGtDQUFhLFNBQWJBLFVBQWE7QUFBQSxTQUN4QjVCLElBQUlTLE9BQUosQ0FBWSxZQUFaLEVBQTBCLFVBQUNpQixDQUFELEVBQUlILEtBQUo7QUFBQSxXQUFlQSxVQUFVLEVBQVgsR0FBaUIsR0FBakIsR0FBdUJiLGVBQWVhLE1BQU1kLE9BQU4sQ0FBYyxJQUFkLEVBQW9CLEdBQXBCLENBQWYsQ0FBckM7QUFBQSxHQUExQixDQUR3QjtBQUFBLENBQW5CIiwiZmlsZSI6InV0ZjcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBlbmNvZGUgYXMgZW5jb2RlQmFzZTY0LCBkZWNvZGUgYXMgZGVjb2RlQmFzZTY0LCBPVVRQVVRfVFlQRURfQVJSQVkgfSBmcm9tICdlbWFpbGpzLWJhc2U2NCdcblxuZnVuY3Rpb24gZW5jb2RlVG9VVEY3IChzdHIpIHtcbiAgY29uc3QgYiA9IG5ldyBVaW50OEFycmF5KHN0ci5sZW5ndGggKiAyKVxuXG4gIC8vIEluIG1vZGlmaWVkIFVURi03LCBhbGwgY2hhcmFjdGVycyBhcmUgcmVwcmVzZW50ZWQgYnkgdGhlaXIgdHdvIGJ5dGUgVW5pY29kZSBJRC5cbiAgZm9yIChsZXQgaSA9IDAsIGJpID0gMCwgbGVuID0gc3RyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3QgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgYltiaSsrXSA9IGMgPj4gOFxuICAgIGJbYmkrK10gPSBjICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGVuY29kZUJhc2U2NChiKS5yZXBsYWNlKC89KyQvLCAnJylcbn1cblxuZnVuY3Rpb24gZGVjb2RlRnJvbVVURjcgKHN0cikge1xuICBjb25zdCBvY3RldHMgPSBkZWNvZGVCYXNlNjQoc3RyLCBPVVRQVVRfVFlQRURfQVJSQVkpXG4gIGxldCBvdXRwdXQgPSAnJ1xuXG4gIC8vIEluIG1vZGlmaWVkIFVURi03LCBhbGwgY2hhcmFjdGVycyBhcmUgcmVwcmVzZW50ZWQgYnkgdGhlaXIgdHdvIGJ5dGUgVW5pY29kZSBJRC5cbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IG9jdGV0cy5sZW5ndGg7IGkgPCBsZW47KSB7XG4gICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUob2N0ZXRzW2krK10gPDwgOCB8IG9jdGV0c1tpKytdKVxuICB9XG4gIHJldHVybiBvdXRwdXRcbn1cblxuZnVuY3Rpb24gZXNjYXBlUmVzZXJ2ZWRSZWdleFN0cmluZ3MgKGNoYXJzKSB7XG4gIHJldHVybiBjaGFycy5yZXBsYWNlKC9bLVtcXF17fSgpKis/LixcXFxcXiR8I1xcc10vZywgJ1xcXFwkJicpXG59XG5cbi8qKlxuICogQ2hhcmFjdGVyIGNsYXNzZXMgZGVmaW5lZCBieSBSRkMgMjE1Mi5cbiAqL1xuY29uc3Qgc2V0RCA9ICdBLVphLXowLTknICsgZXNjYXBlUmVzZXJ2ZWRSZWdleFN0cmluZ3MoJ1xcJygpLC0uLzo/JylcbmNvbnN0IHNldE8gPSBlc2NhcGVSZXNlcnZlZFJlZ2V4U3RyaW5ncygnIVwiIyQlJio7PD0+QFtdXl9cXCd7fH0nKVxuY29uc3Qgc2V0VyA9IGVzY2FwZVJlc2VydmVkUmVnZXhTdHJpbmdzKCcgXFxyXFxuXFx0JylcblxuLyoqXG4gKiBFbmNvZGVzIHN0cmluZyB0byBVVEYtNywgc2VlIFJGQyAyMTUyXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFN0cmluZyB0byBlbmNvZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBtYXNrIChvcHRpb25hbCkgQ2hhcmFjdGVycyB0byBlbmNvZGUsIGRlZmF1bHRzIHRvIFJGQyAyMTUyIFNldCBEXG4gKi9cbmV4cG9ydCBjb25zdCBlbmNvZGUgPSAoc3RyLCBtYXNrID0gJycpID0+XG4gIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoJ1teJyArIHNldEQgKyBlc2NhcGVSZXNlcnZlZFJlZ2V4U3RyaW5ncyhtYXNrKSArICddKycsICdnJyksIGNodW5rID0+ICcrJyArIChjaHVuayA9PT0gJysnID8gJycgOiBlbmNvZGVUb1VURjcoY2h1bmspKSArICctJylcblxuLyoqXG4gKiBFbmNvZGVzIHN0cmluZyB0byBVVEYtNyB3aXRoIGFsbCBvcHRpb25hbHMsIHNlZSBSRkMgMjE1MlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBTdHJpbmcgdG8gZW5jb2RlXG4gKi9cbmV4cG9ydCBjb25zdCBlbmNvZGVBbGwgPSBzdHIgPT5cbiAgc3RyLnJlcGxhY2UobmV3IFJlZ0V4cCgnW14nICsgc2V0VyArIHNldEQgKyBzZXRPICsgJ10rJywgJ2cnKSwgY2h1bmsgPT4gJysnICsgKGNodW5rID09PSAnKycgPyAnJyA6IGVuY29kZVRvVVRGNyhjaHVuaykpICsgJy0nKVxuXG4vKipcbiAqIERlY29kZXMgVVRGLTcgc3RyaW5nLCBzZWUgUkZDIDIxNTJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgU3RyaW5nIHRvIGRlY29kZVxuICovXG5leHBvcnQgY29uc3QgZGVjb2RlID0gc3RyID0+XG4gIHN0ci5yZXBsYWNlKC9cXCsoW0EtWmEtejAtOS9dKiktPy9naSwgKF8sIGNodW5rKSA9PiBjaHVuayA9PT0gJycgPyAnKycgOiBkZWNvZGVGcm9tVVRGNyhjaHVuaykpXG5cbi8qKlxuICogRW5jb2RlcyBzdHJpbmcgdG8gVVRGLTcgd2l0aCBhbGwgb3B0aW9uYWxzLCBzZWUgUkZDIDM1MDFcbiAqXG4gKiBBbGwgcHJpbnRhYmxlIEFTQ0lJIGNoYXJzIGV4Y2VwdCBmb3IgJiBtdXN0IGJlIHJlcHJlc2VudGVkIGJ5IHRoZW1zZWx2ZXMuXG4gKiBXZSByZXBsYWNlIHN1YnNlcXVlbnQgbm9uLXJlcHJlc2VudGFibGUgY2hhcnMgd2l0aCB0aGVpciBlc2NhcGUgc2VxdWVuY2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBTdHJpbmcgdG8gZW5jb2RlXG4gKi9cbmV4cG9ydCBjb25zdCBpbWFwRW5jb2RlID0gc3RyID0+XG4gIHN0ci5yZXBsYWNlKC8mL2csICcmLScpLnJlcGxhY2UoL1teXFx4MjAtXFx4N2VdKy9nLCBjaHVuayA9PiAnJicgKyAoY2h1bmsgPT09ICcmJyA/ICcnIDogZW5jb2RlVG9VVEY3KGNodW5rKSkucmVwbGFjZSgvXFwvL2csICcsJykgKyAnLScpXG5cbi8qKlxuICogRGVjb2RlcyBVVEYtNyBzdHJpbmcsIHNlZSBSRkMgMzUwMVxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBTdHJpbmcgdG8gZGVjb2RlXG4gKi9cbmV4cG9ydCBjb25zdCBpbWFwRGVjb2RlID0gc3RyID0+XG4gIHN0ci5yZXBsYWNlKC8mKFteLV0qKS0vZywgKF8sIGNodW5rKSA9PiAoY2h1bmsgPT09ICcnKSA/ICcmJyA6IGRlY29kZUZyb21VVEY3KGNodW5rLnJlcGxhY2UoLywvZywgJy8nKSkpXG4iXX0=