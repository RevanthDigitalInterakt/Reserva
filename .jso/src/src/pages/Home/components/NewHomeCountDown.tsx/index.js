  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NewHomeCountDown = NewHomeCountDown;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function NewHomeCountDown() {
    var _useApolloFetchPolicy = (0, _$$_REQUIRE(_dependencyMap[4]).useApolloFetchPolicyStore)(['getFetchPolicyPerKey']),
      getFetchPolicyPerKey = _useApolloFetchPolicy.getFetchPolicyPerKey;
    var _useHomeCountdownQuer = (0, _$$_REQUIRE(_dependencyMap[5]).useHomeCountdownQuery)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: getFetchPolicyPerKey('homeCountdown')
      }),
      data = _useHomeCountdownQuer.data,
      loading = _useHomeCountdownQuer.loading,
      error = _useHomeCountdownQuer.error;
    if (!(data != null && data.homeCountdown) || loading || error) {
      return null;
    }
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
      style: _styles.default.container,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).NewCountDownBanner, {
        data: data.homeCountdown
      })
    });
  }
