  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.onShare = onShare;
  var _reactNativeShare = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function onShare(title, message, url) {
    _reactNativeShare.default.open({
      title: title,
      message: message,
      url: url
    }).catch(function (err) {
      _$$_REQUIRE(_dependencyMap[2]).ExceptionProvider.captureException(err);
      return false;
    });
  }
