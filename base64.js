function base64Encode(text) {
  "use strict";

  if (text === undefined) {
    text = '';
  }
  var str = String(text);
  if (/[^\u0000-\u00ff]+/.test(str)) {
    throw new Error('Invalid text');
  }
  var set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      length = str.length,
      result = [];

  for (var i = 0; i < length; i += 1) {
    var byte = i % 3,
        cur = text.codePointAt(i);

    switch (byte) {
      case 0:
        result.push(set.charAt(cur >> 2));
        break;
      case 1:
        result.push(set.charAt((prev & 3) << 4 | (cur >> 4)));
        break;
      case 2:
        result.push(set.charAt((prev & 0x0f) << 2 | (cur >> 6)), set.charAt(cur & 0x3f));
    }
    var prev = cur;
  }    
  switch (byte) {
    case 0:
      result.push(set.charAt((prev & 3) << 4), '==');
      break;
    case 1:
      result.push(set.charAt((prev & 0x0f) << 2), '=');  
  }
  return result.join('');
}

function base64Decode(text) {
  "use strict";

  var str = String(text);
  if (/[^A-Za-z0-9+/=]+/.test(str) || str.length % 4) {
    throw new Error('Invalid text');
  }
  var length = str.length,
      set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      result = [];

  str = str.replace(/=/g, '');    
  for (var i = 0; i < length; i += 1) {
    var cur = set.indexOf(str.charAt(i));
    switch (i % 4) {
      case 1:
        result.push(String.fromCodePoint((prev << 2) | (cur >> 4)));
        break;
      case 2:
        result.push(String.fromCodePoint(((prev & 0x0f) << 4) | (cur >> 2)));
        break;
      case 3:
        result.push(String.fromCodePoint(((prev & 3) << 6) | cur));    
    }
    var prev = cur;
  }  
  return result.join('');  
}
