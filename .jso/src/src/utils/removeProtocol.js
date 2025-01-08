  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.removeProtocol = undefined;
  var REGEX_VALID_URL = /[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/gi;
  var removeProtocol = exports.removeProtocol = function removeProtocol(url) {
    var regexValidURL = new RegExp(REGEX_VALID_URL);
    if (!regexValidURL.test(url)) return url;

    // To remove the protocol like http:// , https:// , ftp:// , //  from an URL string with
    if (url.startsWith('https://') || url.startsWith('http://')) {
      return url.replace(/(^\w+:|^)\/\//, '');
    }
    return url;
  };
