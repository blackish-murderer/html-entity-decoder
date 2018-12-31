'use strict';

function HtmlDecoder() {
  const pairs = require('./pairs');
  const regex = /(&[a-zA-Z0-9]+;)|(&#[0-9]+;)|(&#[xX]{1}[a-fA-F0-9]+;)/g; //key, dec, hex

  var htmlString, escapeChar, specialChars;

  function replaceEntities(_htmlString, _escapeChar, _specialChars) {
    if (_htmlString === undefined || typeof _htmlString !== 'string') {
//      console.log('[error] usage: expected a string for html input');
      return new Error('USAGE expected a string for html input');
    }

    if (_escapeChar !== undefined && typeof _escapeChar !== 'string') {
//      console.log('[error] usage: expected a string for escape character');
      return new Error('USAGE expected a string for escape character');
    }

    if (_specialChars !== undefined && !Array.isArray(_specialChars)) {
//      console.log('[error] usage: expected an array for special characters');
      return new Error('USAGE expected an array for special characters');
    }

    htmlString = _htmlString;
    escapeChar = _escapeChar;
    specialChars = _specialChars;
    return htmlString.replace(regex, _keyReplacer);
  }

  function _keyReplacer(found, key, dec, hex, offset, string) {
    let value = undefined;

    if (key) {
      value = pairs[found.substring(1, found.length - 1)];
    } else if (dec) {
      value = Number(found.substring(2, found.length - 1));
    } else if (hex) {
      value = Number('0x' + found.substring(3, found.length - 1));
    }

    if (typeof value === 'number') {
      return _charEscaper(found, String.fromCodePoint(value));
    }

    return found;
  }

  function _charEscaper(encoded, decoded) {
    let output = decoded;

    if (escapeChar && decoded === escapeChar) {
      output = escapeChar + escapeChar;
    } else if (specialChars && specialChars.includes(decoded)) {
      output = escapeChar + decoded;
    } else if (decoded === undefined) {
      output = encoded;
    }

    return output;
  }

  const publicAPI = {
    'feed': replaceEntities
  };

  return publicAPI;
}

module.exports = new HtmlDecoder();
