  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Button = Button;
  exports.buttonVariantsOptions = undefined;
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _excluded = ["icon", "title", "inline", "testID", "loading", "disabled", "children", "leftIcon", "rightIcon", "badgeCount", "buttonBackgroundColor"];
  var buttonVariantsOptions = exports.buttonVariantsOptions = Object.keys(_$$_REQUIRE(_dependencyMap[4]).buttonVariants.variants);
  function Button(_ref) {
    var icon = _ref.icon,
      title = _ref.title,
      inline = _ref.inline,
      testID = _ref.testID,
      loading = _ref.loading,
      disabled = _ref.disabled,
      children = _ref.children,
      leftIcon = _ref.leftIcon,
      rightIcon = _ref.rightIcon,
      badgeCount = _ref.badgeCount,
      buttonBackgroundColor = _ref.buttonBackgroundColor,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var styleProps = props;
    var variant = styleProps.variant;
    var fetchTextColor = function fetchTextColor() {
      var color = styleProps.color;
      if (_$$_REQUIRE(_dependencyMap[4]).buttonVariants.variants && variant && !styleProps.color) {
        color = _$$_REQUIRE(_dependencyMap[4]).buttonVariants.variants[variant].color;
      }
      return color;
    };
    var fetchFontSize = function fetchFontSize() {
      var fontSize = styleProps.fontSize;
      if (_$$_REQUIRE(_dependencyMap[4]).buttonVariants.variants && variant && !styleProps.fontSize) {
        fontSize = _$$_REQUIRE(_dependencyMap[4]).buttonVariants.variants[variant].fontSize;
      }
      return fontSize;
    };
    var fetchFontFamily = function fetchFontFamily() {
      var fontFamily = styleProps.fontFamily;
      if (_$$_REQUIRE(_dependencyMap[4]).buttonVariants.variants && variant && !styleProps.fontFamily) {
        fontFamily = _$$_REQUIRE(_dependencyMap[4]).buttonVariants.variants[variant].fontFamily;
      }
      return fontFamily;
    };
    var handleIcon = function handleIcon(iconProps) {
      if (iconProps != null && iconProps.props.name) {
        var IconProps = Object.assign({}, iconProps.props);
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[6]).IconLegacy, Object.assign({}, IconProps));
      }
      return null;
    };
    var handleComponent = function handleComponent() {
      if (variant === 'icone') {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          flexGrow: 0,
          justifyContent: "flex-end",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
            top: -5,
            zIndex: 1,
            right: -5,
            flexGrow: 0,
            position: "absolute",
            justifyContent: "center",
            children: !!badgeCount && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Badge, {
              count: badgeCount
            })
          }), handleIcon(icon)]
        });
      }
      if (!children) {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
          alignItems: "center",
          flexDirection: "row",
          width: variant === 'modal' ? '100%' : undefined,
          justifyContent: variant === 'modal' ? 'space-between' : 'center',
          children: [variant === 'modal' && leftIcon ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
            width: 29,
            height: 32,
            borderColor: "preto",
            borderRadius: "pico",
            alignItems: "center",
            alignSelf: "flex-end",
            borderWidth: "hairline",
            justifyContent: "center",
            borderLeftColor: "transparente",
            children: handleIcon(leftIcon)
          }) : handleIcon(leftIcon), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
            justifyContent: "center",
            height: styleProps.height,
            px: variant === 'modal' ? 'micro' : undefined,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
              letterSpacing: 1.6,
              color: fetchTextColor(),
              fontSize: fetchFontSize(),
              fontFamily: fetchFontFamily(),
              children: title
            })
          }), variant === 'modal' && rightIcon ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
            width: 29,
            height: 32,
            borderColor: "preto",
            borderRadius: "pico",
            alignItems: "center",
            alignSelf: "flex-end",
            borderWidth: "hairline",
            justifyContent: "center",
            borderRightColor: "transparente",
            children: handleIcon(rightIcon)
          }) : handleIcon(rightIcon)]
        });
      }
      return children;
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
      height: styleProps.height,
      alignItems: inline ? 'stretch' : 'center',
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_$$_REQUIRE(_dependencyMap[10]).ButtonStyle, Object.assign({
        testID: testID,
        disabled: disabled,
        height: styleProps.height,
        style: Object.assign({
          opacity: disabled || loading ? 0.35 : 1
        }, buttonBackgroundColor ? {
          backgroundColor: buttonBackgroundColor
        } : {})
      }, styleProps, {
        children: handleComponent()
      })), loading && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.ActivityIndicator, {
        animating: true,
        style: {
          opacity: 1,
          position: 'absolute',
          right: 8
        }
      })]
    });
  }
