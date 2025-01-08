  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _reactNativeModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var SCALE = _configDeviceSizes.default.DEVICE_WIDTH / 320;
  function CheckTheRules(_ref) {
    var isVisible = _ref.isVisible,
      setIsVisible = _ref.setIsVisible,
      rulesData = _ref.rulesData,
      goToPromotion = _ref.goToPromotion;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_reactNativeModal.default, {
      avoidKeyboard: true,
      onBackdropPress: function onBackdropPress() {
        return setIsVisible(false);
      },
      isVisible: isVisible,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, Object.assign({
        bg: "white",
        minHeight: 184,
        alignItems: "center",
        justifyContent: "center",
        px: 34,
        py: 45
      }, (0, _testProps.default)('com.usereserva:id/check_The_rules_container'), {
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
          position: "absolute",
          top: 16,
          right: 20,
          zIndex: 4,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Button, Object.assign({}, (0, _testProps.default)('com.usereserva:id/count_down_local_button_close'), {
            onPress: function onPress() {
              return setIsVisible(false);
            },
            variant: "icone",
            icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[11]).IconLegacy, {
              size: 17,
              name: "Close"
            })
          }))
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, Object.assign({
            textAlign: "center",
            fontFamily: "reservaSerifBold",
            fontSize: 34
          }, (0, _testProps.default)('com.usereserva:id/check_The_rules_titleModal'), {
            children: rulesData == null ? undefined : rulesData.titleModal
          }))
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
          mt: 8,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
            lineHeight: 23,
            fontFamily: "reservaSansRegular",
            fontSize: 18,
            children: rulesData == null ? undefined : rulesData.descriptionModal
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
          width: "100%",
          mt: 38,
          mb: 5,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Button, Object.assign({
            variant: "primarioEstreito",
            width: "100%",
            height: 50,
            onPress: goToPromotion
          }, (0, _testProps.default)('com.usereserva:id/check_the_rules_button'), {
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
              color: "white",
              fontFamily: "nunitoExtraBold",
              fontSize: 13,
              children: "IR PARA A PROMO"
            })
          }))
        })]
      }))
    });
  }
  function NewCountdown(props) {
    var reference = props.reference,
      selectClockScreen = props.selectClockScreen;
    var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      countDownLocal = _useState2[0],
      setCountDownLocal = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      showModal = _useState4[0],
      setShowModal = _useState4[1];
    var _useState5 = (0, _react.useState)(),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      countDownClockGlobal = _useState6[0],
      setCountDownClockGlobal = _useState6[1];
    var _useApolloFetchPolicy = (0, _$$_REQUIRE(_dependencyMap[13]).useApolloFetchPolicyStore)(['getFetchPolicyPerKey']),
      getFetchPolicyPerKey = _useApolloFetchPolicy.getFetchPolicyPerKey;
    var _useCountdownLazyQuer = (0, _$$_REQUIRE(_dependencyMap[14]).useCountdownLazyQuery)(),
      _useCountdownLazyQuer2 = (0, _slicedToArray2.default)(_useCountdownLazyQuer, 1),
      getCountDown = _useCountdownLazyQuer2[0];
    var navigation = (0, _$$_REQUIRE(_dependencyMap[15]).useNavigation)();
    var normalize = (0, _react.useCallback)(function (size) {
      var newSize = size * SCALE;
      if (_reactNative.Platform.OS === _$$_REQUIRE(_dependencyMap[16]).platformType.IOS) {
        return Math.round(_reactNative.PixelRatio.roundToNearestPixel(newSize)) - 3;
      }
      return Math.round(_reactNative.PixelRatio.roundToNearestPixel(newSize)) - 4;
    }, []);
    var _goToPromotion = function goToPromotion() {
      var facetInput = [];
      var _ref2 = (reference == null ? undefined : reference.split(':')) || [],
        _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
        categoryType = _ref3[0],
        categoryData = _ref3[1];
      if (categoryType === 'product') {
        navigation.navigate('ProductDetail', {
          productId: categoryData,
          itemId: categoryData,
          colorSelected: '#FFFFFF'
        });
      } else {
        if (categoryType === 'category') {
          if (categoryData) {
            categoryData.split('|').forEach(function (cat) {
              facetInput.push({
                key: 'c',
                value: cat
              });
            });
          }
        } else {
          facetInput.push({
            key: 'productClusterIds',
            value: categoryData
          });
        }
        navigation.navigate('ProductCatalog', {
          facetInput: facetInput,
          referenceId: countDownLocal == null ? undefined : countDownLocal.reference
        });
      }
    };
    var fetchCountdownData = /*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2.default)(function* (selectScreen, categoryRef) {
        var _result$data;
        var result = yield getCountDown({
          context: {
            clientName: 'gateway'
          },
          fetchPolicy: getFetchPolicyPerKey('countdownClock'),
          variables: {
            input: {
              selectClockScreen: selectScreen,
              categoryReference: categoryRef
            }
          }
        });
        return (_result$data = result.data) == null ? undefined : _result$data.countdown;
      });
      return function fetchCountdownData(_x, _x2) {
        return _ref4.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      var fetchData = /*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2.default)(function* () {
          var countdownData = yield fetchCountdownData(selectClockScreen, reference);
          if (!countdownData) {
            countdownData = yield fetchCountdownData(_$$_REQUIRE(_dependencyMap[14]).ClockScreenEnum.All);
          }
          if (countdownData) {
            setCountDownLocal(countdownData);
          }
        });
        return function fetchData() {
          return _ref5.apply(this, arguments);
        };
      }();
      fetchData();
    }, [getCountDown, getFetchPolicyPerKey, reference, selectClockScreen]);
    var _useNewChronometer = (0, _$$_REQUIRE(_dependencyMap[17]).useNewChronometer)(),
      time = _useNewChronometer.time,
      setTime = _useNewChronometer.setTime;
    var hours = (time == null ? undefined : time.split(':')[0]) || '';
    var minutes = (time == null ? undefined : time.split(':')[1]) || '';
    var seconds = (time == null ? undefined : time.split(':')[2]) || '';
    (0, _react.useEffect)(function () {
      if (countDownLocal != null && countDownLocal.remainingTime) {
        setTime(countDownLocal == null ? undefined : countDownLocal.remainingTime);
      }
    }, [countDownLocal == null ? undefined : countDownLocal.remainingTime, setTime]);
    return countDownLocal ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, Object.assign({
      mb: 5,
      minHeight: 90,
      paddingX: 22,
      alignItems: "center",
      alignSelf: "center",
      backgroundColor: countDownLocal.buttonColor
    }, (0, _testProps.default)('com.usereserva:id/count_down_local_container'), {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
        width: _configDeviceSizes.default.DEVICE_WIDTH,
        paddingX: 22,
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
          alignItems: "center",
          mb: 8,
          mt: 12,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Typography, Object.assign({
            lineHeight: normalize(28),
            color: countDownLocal.textColor,
            fontFamily: "reservaSerifMedium",
            fontSize: normalize(26)
          }, (0, _testProps.default)('com.usereserva:id/count_down_local_title'), {
            children: [countDownLocal.title, ' ', countDownLocal.subtitle && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, Object.assign({
              lineHeight: normalize(28),
              color: countDownLocal.textColor,
              fontFamily: "reservaSerifLight",
              fontSize: normalize(26)
            }, (0, _testProps.default)('com.usereserva:id/count_down_local_subtitle'), {
              children: countDownLocal.subtitle
            }))]
          }))
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 10,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
            alignItems: "center",
            mr: 17,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
                color: countDownLocal.textColor,
                fontFamily: "reservaSansRegular",
                fontSize: 14,
                children: "Acaba em:"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
              flexDirection: "row",
              alignItems: "center",
              mt: 5,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[18]).NewFlipNumber, Object.assign({}, (0, _testProps.default)('com.usereserva:id/flip_number_hours'), {
                number: hours,
                clockBackgroundColor: countDownLocal.backgroundColor,
                colorDivider: countDownLocal.bannerColor
              })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                height: 14,
                justifyContent: "space-between",
                marginX: 6,
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                  height: 3,
                  width: 3,
                  borderRadius: 3,
                  bg: "#FFF"
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                  height: 3,
                  width: 3,
                  borderRadius: 3,
                  bg: "#FFF"
                })]
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[18]).NewFlipNumber, Object.assign({}, (0, _testProps.default)('com.usereserva:id/flip_number_minutes'), {
                number: minutes,
                clockBackgroundColor: countDownLocal.backgroundColor,
                colorDivider: countDownLocal.bannerColor
              })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                height: 14,
                justifyContent: "space-between",
                marginX: 6,
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                  height: 3,
                  width: 3,
                  borderRadius: 3,
                  bg: "#FFF"
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                  height: 3,
                  width: 3,
                  borderRadius: 3,
                  bg: "#FFF"
                })]
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[18]).NewFlipNumber, Object.assign({}, (0, _testProps.default)('com.usereserva:id/flip_number_seconds'), {
                number: seconds,
                clockBackgroundColor: countDownLocal.backgroundColor,
                colorDivider: countDownLocal.bannerColor
              }))]
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Box, {
            alignItems: "center",
            flex: 1,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[19]).TouchableOpacity, Object.assign({
              style: {
                width: '100%'
              },
              onPress: _goToPromotion
            }, (0, _testProps.default)('com.usereserva:id/count_down_local_button'), {
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
                bg: countDownLocal.buttonColor,
                paddingY: 12,
                mb: 4,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
                  textAlign: "center",
                  color: countDownLocal.textColor,
                  children: countDownLocal.titleButton
                })
              })
            })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[19]).TouchableOpacity, {
              onPress: function onPress() {
                return setShowModal(true);
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
                color: countDownLocal.textColor,
                fontFamily: "reservaSansRegular",
                fontSize: 13,
                style: {
                  textDecorationLine: 'underline'
                },
                children: "Confira as regras."
              })
            })]
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(CheckTheRules, {
          isVisible: showModal,
          setIsVisible: function setIsVisible() {
            return setShowModal(false);
          },
          rulesData: countDownLocal,
          goToPromotion: function goToPromotion() {
            _goToPromotion();
          }
        })]
      })
    })) : null;
  }
  var _default = exports.default = NewCountdown;
