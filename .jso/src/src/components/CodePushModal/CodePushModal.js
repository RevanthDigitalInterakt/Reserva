  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _classCallCheck2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _createClass2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _possibleConstructorReturn2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _getPrototypeOf2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _inherits2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[7]);
  var _reactNativeCodePush = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _reactNativeExitApp = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var CodePushComponent = /*#__PURE__*/function (_React$Component) {
    function CodePushComponent(props) {
      var _this;
      (0, _classCallCheck2.default)(this, CodePushComponent);
      _this = _callSuper(this, CodePushComponent, [props]);
      _this.state = {
        progress: 0,
        showModal: false,
        status: null,
        immediateUpdate: false
      };
      return _this;
    }
    (0, _inherits2.default)(CodePushComponent, _React$Component);
    return (0, _createClass2.default)(CodePushComponent, [{
      key: "codePushStatusDidChange",
      value: function codePushStatusDidChange(status) {
        this.setState({
          status: status
        });
      }
    }, {
      key: "syncImmediate",
      value: function syncImmediate() {
        var _this2 = this;
        _reactNativeCodePush.default.checkForUpdate().then(function (update) {
          if (!update) {
            _this2.setState({
              showModal: false
            });
          } else {
            _this2.setState({
              showModal: true
            });
          }
        });
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.syncImmediate();
      }
    }, {
      key: "_immediateUpdate",
      value: function _immediateUpdate() {
        var _this3 = this;
        this.setState({
          immediateUpdate: true,
          showModal: false
        }, function () {
          _reactNativeCodePush.default.sync({
            installMode: _reactNativeCodePush.default.InstallMode.IMMEDIATE
          }, _this3.codePushStatusDidChange.bind(_this3), _this3.codePushDownloadDidProgress.bind(_this3));
        });
      }
    }, {
      key: "codePushDownloadDidProgress",
      value: function codePushDownloadDidProgress(progress) {
        if (this.state.immediateUpdate) {
          this.setState({
            progress: progress.receivedBytes / progress.totalBytes * 100
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Fragment, {
          children: [this.state.showModal && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNativeModal.default, {
            isVisible: true,
            backdropOpacity: 0.5,
            animationIn: "fadeIn",
            animationOut: "fadeIn",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
              bg: "white",
              minHeight: 175,
              marginX: 8,
              borderRadius: 4,
              paddingX: 22,
              paddingY: 20,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
                mb: 8,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
                  fontSize: 6,
                  fontFamily: "reservaSerifBold",
                  children: "Hora de atualizar"
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Box, {
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Typography, {
                  fontSize: 5,
                  fontFamily: "reservaSerifRegular",
                  children: "Est\xE1 dispon\xEDvel uma nova vers\xE3o do App, realizamos melhorias para tornar sua experi\xEAncia a mais tranquila poss\xEDvel."
                })
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Box, {
                flexDirection: "row",
                alignSelf: "flex-end",
                mt: 8,
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Button, {
                  onPress: function onPress() {
                    return _this4._immediateUpdate();
                  },
                  title: "ATUALIZAR",
                  fontFamily: "reservaSerifBold",
                  marginRight: 20
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Button, {
                  onPress: function onPress() {
                    _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[15]).platformType.ANDROID ? _reactNative.BackHandler.exitApp() : _reactNativeExitApp.default.exitApp();
                  },
                  title: "SAIR",
                  fontFamily: "reservaSerifBold"
                })]
              })]
            })
          }), this.state.progress > 0 && this.state.progress < 100 ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNativeModal.default, {
            isVisible: true,
            backdropOpacity: 0.5,
            backdropColor: "white",
            animationInTiming: 300,
            animationIn: "fadeIn",
            animationOut: "fadeIn",
            testID: "com.usereserva:id/LottieLoader",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNative.View, {
              style: {
                alignSelf: 'center'
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_reactNative.ActivityIndicator, {
                size: "large",
                color: "black"
              })
            })
          }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[11]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Fragment, {})]
        });
      }
    }]);
  }(_react.default.Component);
  var codePushOptions = {
    checkFrequency: _reactNativeCodePush.default.CheckFrequency.MANUAL
  };
  var CodePushModal = (0, _reactNativeCodePush.default)(codePushOptions)(CodePushComponent);
  var _default = exports.default = CodePushModal;
