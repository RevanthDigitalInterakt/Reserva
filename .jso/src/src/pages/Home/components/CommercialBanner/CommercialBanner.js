  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _IconNext = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _IconPrevious = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _IconClose = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function CommercialBanner() {
    var _useHomeStore = (0, _$$_REQUIRE(_dependencyMap[7]).useHomeStore)(['commercialBannerCollection']),
      commercialBannerCollection = _useHomeStore.commercialBannerCollection;
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[8]).useRemoteConfig)(),
      getBoolean = _useRemoteConfig.getBoolean,
      getString = _useRemoteConfig.getString;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isModalVisible = _useState2[0],
      setIsModalVisible = _useState2[1];
    var _useState3 = (0, _react.useState)(0),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      currentIndex = _useState4[0],
      setCurrentIndex = _useState4[1];
    var navigation = (0, _$$_REQUIRE(_dependencyMap[9]).useNavigation)();
    var showBanner = (0, _react.useMemo)(function () {
      return getBoolean('show_home_commercial_banner');
    }, []);
    var fadeIn = new _reactNative.Animated.Value(0);
    var fadeOut = new _reactNative.Animated.Value(1);
    var currentItem = (commercialBannerCollection == null ? undefined : commercialBannerCollection[currentIndex]) || {};
    var hasMultipleItems = (commercialBannerCollection == null ? undefined : commercialBannerCollection.length) > 1;
    var fadeInAnimation = function fadeInAnimation() {
      _reactNative.Animated.timing(fadeIn, {
        toValue: 1,
        duration: 200,
        easing: _reactNative.Easing.ease,
        useNativeDriver: true
      }).start();
    };
    var fadeOutAnimation = function fadeOutAnimation(callback) {
      _reactNative.Animated.timing(fadeOut, {
        toValue: 0,
        duration: 200,
        easing: _reactNative.Easing.ease,
        useNativeDriver: true
      }).start(function () {
        if (callback) callback();
      });
    };
    var prevItem = (0, _react.useCallback)(function () {
      fadeOutAnimation(function () {
        setCurrentIndex(function (prevIndex) {
          return (prevIndex - 1 + (commercialBannerCollection == null ? undefined : commercialBannerCollection.length)) % ((commercialBannerCollection == null ? undefined : commercialBannerCollection.length) || 1);
        });
        fadeInAnimation();
      });
    }, [currentItem]);
    var nextItem = (0, _react.useCallback)(function () {
      fadeOutAnimation(function () {
        setCurrentIndex(function (prevIndex) {
          return (prevIndex + 1) % ((commercialBannerCollection == null ? undefined : commercialBannerCollection.length) || 1);
        });
        fadeInAnimation();
      });
    }, [currentItem]);
    var toggleModal = (0, _react.useCallback)(function () {
      setIsModalVisible(!isModalVisible);
    }, [isModalVisible]);
    var onPress = (0, _react.useCallback)(function () {
      var reference = (currentItem == null ? undefined : currentItem.modalButtonLink) || '';
      var _ref = currentItem != null && currentItem.modalButtonLink ? reference.split(':') : [],
        _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        categoryType = _ref2[0],
        categoryData = _ref2[1];
      var navigateParams = {
        referenceId: reference,
        productId: categoryType === 'product' ? categoryData : undefined
      };
      toggleModal();
      navigation.navigate(categoryType === 'product' ? 'ProductDetail' : 'ProductCatalog', navigateParams);
    }, [currentItem, toggleModal]);
    if (!(commercialBannerCollection != null && commercialBannerCollection.length) || !showBanner) {
      return null;
    }
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Animated.View, {
        style: [_$$_REQUIRE(_dependencyMap[11]).styles.container, {
          opacity: fadeOut,
          marginBottom: getString('count_down_position') === 'B' || getString('count_down_position') === 'C' ? 10 : 0
        }],
        children: currentItem ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_$$_REQUIRE(_dependencyMap[10]).Fragment, {
          children: [hasMultipleItems ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.TouchableOpacity, {
            style: _$$_REQUIRE(_dependencyMap[11]).styles.iconContainer,
            onPress: prevItem,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_IconPrevious.default, {
              style: _$$_REQUIRE(_dependencyMap[11]).styles.icons,
              onPress: prevItem
            })
          }) : null, /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Animated.View, {
            style: _$$_REQUIRE(_dependencyMap[11]).styles.innerContainer,
            children: currentItem.hasModal ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.TouchableOpacity, {
              onPress: toggleModal,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
                style: _$$_REQUIRE(_dependencyMap[11]).styles.underlinedText,
                children: currentItem.mainText
              })
            }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[11]).styles.text,
              children: currentItem.mainText
            })
          }), hasMultipleItems ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.TouchableOpacity, {
            style: _$$_REQUIRE(_dependencyMap[11]).styles.iconContainer,
            onPress: prevItem,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_IconNext.default, {
              style: _$$_REQUIRE(_dependencyMap[11]).styles.icons,
              onPress: nextItem
            })
          }) : null]
        }) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
          style: _$$_REQUIRE(_dependencyMap[11]).styles.text,
          children: currentItem.mainText
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Modal, {
        visible: isModalVisible,
        onRequestClose: toggleModal,
        transparent: true,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[11]).styles.modalContainer,
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[11]).styles.modalContent,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsxs)(_reactNative.View, {
              style: _$$_REQUIRE(_dependencyMap[11]).styles.titleContainer,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
                style: _$$_REQUIRE(_dependencyMap[11]).styles.modalTitle,
                children: currentItem && currentItem.modalTitle
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.TouchableOpacity, {
                onPress: toggleModal,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_IconClose.default, {})
              })]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[11]).styles.modalDescription,
              children: currentItem && currentItem.modalDescription
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.View, {
              children: currentItem && currentItem.modalButton && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.TouchableOpacity, {
                style: _$$_REQUIRE(_dependencyMap[11]).styles.modalButton,
                onPress: onPress,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[10]).jsx)(_reactNative.Text, {
                  style: _$$_REQUIRE(_dependencyMap[11]).styles.modalButtonText,
                  children: currentItem.modalButtonText
                })
              })
            })]
          })
        })
      })]
    });
  }
  var _default = exports.default = CommercialBanner;
