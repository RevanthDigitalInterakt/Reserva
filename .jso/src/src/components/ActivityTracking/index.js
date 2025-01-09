  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ActivityTracking = ActivityTracking;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNativeLinearGradient = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var infos = [{
    icon: _$$_REQUIRE(_dependencyMap[7]).commons.greenCheck,
    info: 'Se você clicar em permitir na próxima tela, você irá continuar recebendo sua experiência personalizada Reserva que já tem hoje.'
  }, {
    icon: _$$_REQUIRE(_dependencyMap[7]).commons.config,
    info: 'Você sempre pode mudar de ideia e mudar futuramente nas configurações do iOS.'
  }];
  function Infos() {
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.View, {
      style: _$$_REQUIRE(_dependencyMap[9]).styles.infosWrapper,
      children: infos.map(function (item, index) {
        return /*#__PURE__*/(0, _react.createElement)(_reactNative.View, Object.assign({}, (0, _testProps.default)(`info-${index + 1}`), {
          key: item.info,
          style: _$$_REQUIRE(_dependencyMap[9]).styles.infosContentWrapper
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.Image, {
          style: _$$_REQUIRE(_dependencyMap[9]).styles.infoIcon,
          source: item.icon
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.Text, {
          style: _$$_REQUIRE(_dependencyMap[9]).styles.infoText,
          children: item.info
        }));
      })
    });
  }
  function ActivityTracking() {
    var _useState = (0, _react.useState)(_reactNative.Platform.OS === 'ios'),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];
    var _useHomeStore = (0, _$$_REQUIRE(_dependencyMap[10]).useHomeStore)(['setHasTabBar']),
      setHasTabBar = _useHomeStore.setHasTabBar;
    var handleTrackingPermission = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* () {
        var isIOS = _reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[11]).platformType.IOS;
        if (!isIOS) {
          setIsOpen(false);
          return;
        }
        var trackingStatus = yield (0, _$$_REQUIRE(_dependencyMap[12]).getTrackingStatus)();
        if (trackingStatus !== 'not-determined') setIsOpen(false);
        if (trackingStatus === 'not-determined') {
          setHasTabBar(false);
          setIsOpen(true);
        }
      });
      return function handleTrackingPermission() {
        return _ref.apply(this, arguments);
      };
    }();
    var handleSelectTrackingPermission = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* () {
        yield (0, _$$_REQUIRE(_dependencyMap[12]).requestTrackingPermission)();
        setIsOpen(false);
        setHasTabBar(true);
      });
      return function handleSelectTrackingPermission() {
        return _ref2.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      handleTrackingPermission();
    }, []);
    if (!isOpen) return null;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.ScrollView, Object.assign({}, (0, _testProps.default)('activityTracking'), {
        style: _$$_REQUIRE(_dependencyMap[9]).styles.container,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[9]).styles.contentWrapper,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[9]).styles.bannerWrapper,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.ImageBackground, {
              source: _$$_REQUIRE(_dependencyMap[7]).commons.ios14,
              style: _$$_REQUIRE(_dependencyMap[9]).styles.imageBackground,
              resizeMode: "stretch",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_reactNativeLinearGradient.default, {
                colors: ['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.37)', 'rgba(0, 0, 0, 0.2)'],
                start: {
                  x: 0.5,
                  y: 0
                },
                end: {
                  x: 0.5,
                  y: 1
                },
                style: _$$_REQUIRE(_dependencyMap[9]).styles.linearGradientWrapper,
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.Image, {
                  source: _$$_REQUIRE(_dependencyMap[7]).commons.reservaIcon
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.View, {
                  style: _$$_REQUIRE(_dependencyMap[9]).styles.bannerInfoWrapper,
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_reactNative.Text, {
                    style: _$$_REQUIRE(_dependencyMap[9]).styles.bannerInfoText,
                    children: ["Voc\xEA est\xE1 usando o", ' ', '\n', ' ', "App Reserva no iOS 14+"]
                  })
                })]
              })
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_reactNative.View, {
            style: {
              paddingHorizontal: 24
            },
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[9]).styles.iosInfoText,
              children: ["Esta vers\xE3o do iOS requer que solicitemos", '\n', "permiss\xE3o para rastrear as atividades", '\n', "provenientes de aplicativos e sites que voc\xEA visita."]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[9]).styles.trackingAgreementText,
              children: "Permitir que a Reserva aprimore minha experi\xEAncia de compra no App?"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(Infos, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[9]).styles.trackingDeniedText,
              children: "Se optar por n\xE3o permitir na pr\xF3xima tela, o aplicativo Reserva deixar\xE1 de utilizar seus dados para aprimorar sua experi\xEAncia exclusiva no app."
            })]
          })]
        })
      })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[9]).styles.darkButtonWrapper,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[13]).DarkButton, Object.assign({}, (0, _testProps.default)('continueButton'), {
          onPress: handleSelectTrackingPermission,
          title: "Continuar"
        }))
      })]
    });
  }
