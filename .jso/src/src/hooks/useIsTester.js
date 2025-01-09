  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useIsTester = useIsTester;
  var _react = _$$_REQUIRE(_dependencyMap[0]);
  function useIsTester() {
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[1]).useRemoteConfig)(),
      getObject = _useRemoteConfig.getObject;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[2]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var isTester = (0, _react.useMemo)(function () {
      var testers = getObject('EMAIL_TESTERS');
      return testers.includes((profile == null ? undefined : profile.email) || '');
    }, [getObject, profile == null ? undefined : profile.email]);
    return isTester;
  }
