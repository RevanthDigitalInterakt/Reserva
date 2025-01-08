  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNativeReanimated = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _worklet_15143641349761_init_data = {
    code: "function anonymous(){const{index,width,animValue,length,interpolate,Extrapolate}=this._closure;let inputRange=[index-1,index,index+1];let outputRange=[-width,0,width];if(index===0&&animValue.value>length-1){inputRange=[length-1,length,length+1];outputRange=[-width,0,width];}return{transform:[{translateX:interpolate(animValue.value,inputRange,outputRange,Extrapolate.CLAMP)}]};}",
    location: "C:\\Workspace\\vendas-omni.mobile-reserva.app.frontend\\src\\components\\CarouselPaginationItem\\CarouselPaginationItem.tsx"
  };
  var _worklet_10359666302594_init_data = {
    code: "function anonymous(){const{index,animValue,length,interpolate,actualPosition,width,Extrapolate,interpolateColor,borderColor,COLORS}=this._closure;var _borderColor,_borderColor2,_borderColor3,_borderColor4;let inputRange=[index-1,index,index+1];if(index===0&&animValue.value>length-1){inputRange=[length-1,length,length+1];}return{width:interpolate(animValue.value,inputRange,actualPosition===index?[width,width*4.3,width]:[width,width*4.3,width],Extrapolate.CLAMP),borderColor:interpolateColor(animValue.value,inputRange,actualPosition===index?[(_borderColor=borderColor)!==null&&_borderColor!==void 0?_borderColor:COLORS.WHITE,COLORS.WHITE,(_borderColor2=borderColor)!==null&&_borderColor2!==void 0?_borderColor2:COLORS.WHITE]:[(_borderColor3=borderColor)!==null&&_borderColor3!==void 0?_borderColor3:COLORS.WHITE,COLORS.WHITE,(_borderColor4=borderColor)!==null&&_borderColor4!==void 0?_borderColor4:COLORS.WHITE])};}",
    location: "C:\\Workspace\\vendas-omni.mobile-reserva.app.frontend\\src\\components\\CarouselPaginationItem\\CarouselPaginationItem.tsx"
  };
  function CarouselPaginationItem(_ref) {
    var index = _ref.index,
      backgroundColor = _ref.backgroundColor,
      borderColor = _ref.borderColor,
      length = _ref.length,
      animValue = _ref.animValue,
      actualPosition = _ref.actualPosition,
      slideDelay = _ref.slideDelay,
      onFinishAnimation = _ref.onFinishAnimation;
    var width = 9;
    var $timeout = (0, _react.useRef)();
    var onSetAutoplay = (0, _react.useCallback)(function () {
      clearTimeout($timeout.current);
      $timeout.current = setTimeout(function () {
        onFinishAnimation();
      }, slideDelay);
    }, [$timeout, slideDelay]);
    (0, _react.useEffect)(function () {
      onSetAutoplay();
    }, [actualPosition]);
    (0, _react.useEffect)(function () {
      return function () {
        clearTimeout($timeout.current);
      };
    }, []);
    var bulletStyle = (0, _reactNativeReanimated.useAnimatedStyle)(function () {
      var _f = function _f() {
        var inputRange = [index - 1, index, index + 1];
        var outputRange = [-9, 0, width];
        if (index === 0 && animValue.value > length - 1) {
          inputRange = [length - 1, length, length + 1];
          outputRange = [-9, 0, width];
        }
        return {
          transform: [{
            translateX: (0, _reactNativeReanimated.interpolate)(animValue.value, inputRange, outputRange, _reactNativeReanimated.Extrapolate.CLAMP)
          }]
        };
      };
      _f._closure = {
        index: index,
        width: width,
        animValue: animValue,
        length: length,
        interpolate: _reactNativeReanimated.interpolate,
        Extrapolate: _reactNativeReanimated.Extrapolate
      };
      _f.__initData = _worklet_15143641349761_init_data;
      _f.__workletHash = 15143641349761;
      return _f;
    }(), [animValue, index, length]);
    var bulletWrapperStyle = (0, _reactNativeReanimated.useAnimatedStyle)(function () {
      var _f = function _f() {
        var inputRange = [index - 1, index, index + 1];
        if (index === 0 && animValue.value > length - 1) {
          inputRange = [length - 1, length, length + 1];
        }
        return {
          width: (0, _reactNativeReanimated.interpolate)(animValue.value, inputRange, actualPosition === index ? [width, 38.699999999999996, width] : [width, 38.699999999999996, width], _reactNativeReanimated.Extrapolate.CLAMP),
          borderColor: (0, _reactNativeReanimated.interpolateColor)(animValue.value, inputRange, actualPosition === index ? [borderColor != null ? borderColor : _$$_REQUIRE(_dependencyMap[2]).COLORS.WHITE, _$$_REQUIRE(_dependencyMap[2]).COLORS.WHITE, borderColor != null ? borderColor : _$$_REQUIRE(_dependencyMap[2]).COLORS.WHITE] : [borderColor != null ? borderColor : _$$_REQUIRE(_dependencyMap[2]).COLORS.WHITE, _$$_REQUIRE(_dependencyMap[2]).COLORS.WHITE, borderColor != null ? borderColor : _$$_REQUIRE(_dependencyMap[2]).COLORS.WHITE])
        };
      };
      _f._closure = {
        index: index,
        animValue: animValue,
        length: length,
        interpolate: _reactNativeReanimated.interpolate,
        actualPosition: actualPosition,
        width: width,
        Extrapolate: _reactNativeReanimated.Extrapolate,
        interpolateColor: _reactNativeReanimated.interpolateColor,
        borderColor: borderColor,
        COLORS: _$$_REQUIRE(_dependencyMap[2]).COLORS
      };
      _f.__initData = _worklet_10359666302594_init_data;
      _f.__workletHash = 10359666302594;
      return _f;
    }(), [animValue, index, length, actualPosition]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNativeReanimated.default.View, {
      style: [{
        width: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(width),
        height: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(7),
        borderRadius: 50,
        overflow: 'hidden',
        transform: [{
          rotateZ: '0deg'
        }],
        borderWidth: 2,
        borderColor: borderColor != null ? borderColor : _$$_REQUIRE(_dependencyMap[2]).COLORS.WHITE
      }, bulletWrapperStyle],
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNativeReanimated.default.View, {
        style: [{
          borderRadius: 50,
          backgroundColor: backgroundColor,
          flex: 1
        }, bulletStyle]
      })
    });
  }
  var _default = exports.default = CarouselPaginationItem;
