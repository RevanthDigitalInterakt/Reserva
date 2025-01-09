  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NewCountDownBanner = NewCountDownBanner;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _reactNativeDropShadow = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function NewCountDownBanner(_ref) {
    var _data$title, _data$subtitle;
    var data = _ref.data;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showModal = _useState2[0],
      setShowModal = _useState2[1];
    var navigation = (0, _$$_REQUIRE(_dependencyMap[7]).useNavigation)();
    var _useCountDown = (0, _$$_REQUIRE(_dependencyMap[8]).useCountDown)(),
      _useCountDown$time = _useCountDown.time,
      time = _useCountDown$time === undefined ? '00:00:00' : _useCountDown$time,
      setTime = _useCountDown.setTime;
    var _useChronometer = (0, _$$_REQUIRE(_dependencyMap[9]).useChronometer)({
        countDown: true,
        initial: (data == null ? undefined : data.formattedValue) || '00:00:00'
      }),
      currentValue = _useChronometer.currentValue,
      start = _useChronometer.start;
    var onPress = (0, _react.useCallback)(function () {
      var _data$filters, _data$filters$priceFi, _data$filters2, _data$filters2$priceF, _data$filters3, _data$filters3$priceF;
      var reference = (data == null ? undefined : data.reference) || '';
      var _ref2 = data != null && data.reference ? reference.split(':') : [],
        _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
        categoryType = _ref3[0],
        categoryData = _ref3[1];
      var navigateParams = {
        referenceId: reference,
        productId: categoryType === 'product' ? categoryData : undefined
      };
      if ((data != null && (_data$filters = data.filters) != null && (_data$filters$priceFi = _data$filters.priceFilter) != null && _data$filters$priceFi.from || (data == null ? undefined : (_data$filters2 = data.filters) == null ? undefined : (_data$filters2$priceF = _data$filters2.priceFilter) == null ? undefined : _data$filters2$priceF.from) === null) && data != null && (_data$filters3 = data.filters) != null && (_data$filters3$priceF = _data$filters3.priceFilter) != null && _data$filters3$priceF.to) {
        var _data$filters4, _data$filters4$priceF, _data$filters5, _data$filters5$priceF;
        navigateParams.filters = {
          priceFilter: {
            from: (data == null ? undefined : (_data$filters4 = data.filters) == null ? undefined : (_data$filters4$priceF = _data$filters4.priceFilter) == null ? undefined : _data$filters4$priceF.from) || 0,
            to: (data == null ? undefined : (_data$filters5 = data.filters) == null ? undefined : (_data$filters5$priceF = _data$filters5.priceFilter) == null ? undefined : _data$filters5$priceF.to) || 0
          }
        };
      }
      navigation.navigate(categoryType === 'product' ? 'ProductDetail' : 'ProductCatalog', navigateParams);
    }, [data]);
    var showClock = (0, _react.useMemo)(function () {
      if (!data) return false;
      var nowIsAfterCountDownStart = Date.now() > new Date(data.countdownStart).getTime();
      var timeIsOver = Date.now() > new Date(data.countdown).getTime();
      var isTimeToShow = data.countdownStart ? nowIsAfterCountDownStart : true;
      return isTimeToShow && !timeIsOver;
    }, [data]);
    (0, _react.useEffect)(function () {
      start();
    }, []);
    (0, _react.useEffect)(function () {
      if (setTime) {
        setTime(currentValue);
      }
    }, [currentValue]);
    if (!showClock || !data || time === '00:00:00') return null;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNativeDropShadow.default, {
      style: _styles.default.dropShadow,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.View, {
        style: _styles.default.container,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
          style: _styles.default.contentWrapper,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.Text, {
            style: _styles.default.subtitle,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.Text, {
              style: _styles.default.title,
              children: [' ', (_data$title = data.title) != null ? _data$title : '', ' ']
            }), (_data$subtitle = data.subtitle) != null ? _data$subtitle : '']
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
            style: _styles.default.cronometerAndButtonsWrapper,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[11]).NewCountDownFlipNumber, {}), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
              style: _styles.default.buttonsWrapper,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.TouchableOpacity, Object.assign({
                onPress: onPress
              }, (0, _testProps.default)('count_down_banner_button_promotion'), {
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.View, {
                  style: _styles.default.callToAction,
                  children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
                    style: _styles.default.callToActionText,
                    children: data == null ? undefined : data.titleButton
                  })
                })
              })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.TouchableOpacity, Object.assign({
                onPress: function onPress() {
                  return setShowModal(true);
                }
              }, (0, _testProps.default)('count_down_show_modal'), {
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
                  style: _styles.default.rulesLinkButton,
                  children: "Confira as regras."
                })
              }))]
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_$$_REQUIRE(_dependencyMap[12]).NewCountDownBannerModal, {
            isVisible: showModal,
            setIsVisible: function setIsVisible() {
              return setShowModal(false);
            },
            data: data,
            goToPromotion: function goToPromotion() {
              setShowModal(false);
              onPress();
            }
          })]
        })
      })
    });
  }
