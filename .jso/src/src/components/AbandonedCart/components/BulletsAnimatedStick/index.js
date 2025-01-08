  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNativeReanimated = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _worklet_3378280139777_init_data = {
    code: "function anonymous(){const{index,width,animValue,length,interpolate,Extrapolation}=this._closure;let inputRange=[index-1,index,index+1];let outputRange=[-width,0,width];if(index===0&&animValue.value>length-1){inputRange=[length-1,length,length+1];outputRange=[-width,0,width];}return{transform:[{translateX:interpolate(animValue.value,inputRange,outputRange,Extrapolation.CLAMP)}]};}",
    location: "C:\\Workspace\\vendas-omni.mobile-reserva.app.frontend\\src\\components\\AbandonedCart\\components\\BulletsAnimatedStick\\index.tsx"
  };
  var _worklet_12427503824408_init_data = {
    code: "function anonymous(){const{index,animValue,length,interpolate,actualPosition,width,Extrapolation}=this._closure;let inputRange=[index-1,index,index+1];if(index===0&&animValue.value>length-1){inputRange=[length-1,length,length+1];}return{width:interpolate(animValue.value,inputRange,actualPosition===index?[width,width*4.3,width]:[width,width*4.3,width],Extrapolation.CLAMP)};}",
    location: "C:\\Workspace\\vendas-omni.mobile-reserva.app.frontend\\src\\components\\AbandonedCart\\components\\BulletsAnimatedStick\\index.tsx"
  };
  function BulletsAnimatedStick(_ref) {
    var index = _ref.index,
      backgroundColor = _ref.backgroundColor,
      length = _ref.length,
      animValue = _ref.animValue,
      actualPosition = _ref.actualPosition;
    var width = 8;
    var bulletStyle = (0, _reactNativeReanimated.useAnimatedStyle)(function () {
      var _f = function _f() {
        var inputRange = [index - 1, index, index + 1];
        var outputRange = [-8, 0, width];
        if (index === 0 && animValue.value > length - 1) {
          inputRange = [length - 1, length, length + 1];
          outputRange = [-8, 0, width];
        }
        return {
          transform: [{
            translateX: (0, _reactNativeReanimated.interpolate)(animValue.value, inputRange, outputRange, _reactNativeReanimated.Extrapolation.CLAMP)
          }]
        };
      };
      _f._closure = {
        index: index,
        width: width,
        animValue: animValue,
        length: length,
        interpolate: _reactNativeReanimated.interpolate,
        Extrapolation: _reactNativeReanimated.Extrapolation
      };
      _f.__initData = _worklet_3378280139777_init_data;
      _f.__workletHash = 3378280139777;
      return _f;
    }(), [animValue, index, length]);
    var bulletWrapperStyle = (0, _reactNativeReanimated.useAnimatedStyle)(function () {
      var _f = function _f() {
        var inputRange = [index - 1, index, index + 1];
        if (index === 0 && animValue.value > length - 1) {
          inputRange = [length - 1, length, length + 1];
        }
        return {
          width: (0, _reactNativeReanimated.interpolate)(animValue.value, inputRange, actualPosition === index ? [width, 34.4, width] : [width, 34.4, width], _reactNativeReanimated.Extrapolation.CLAMP)
        };
      };
      _f._closure = {
        index: index,
        animValue: animValue,
        length: length,
        interpolate: _reactNativeReanimated.interpolate,
        actualPosition: actualPosition,
        width: width,
        Extrapolation: _reactNativeReanimated.Extrapolation
      };
      _f.__initData = _worklet_12427503824408_init_data;
      _f.__workletHash = 12427503824408;
      return _f;
    }(), [animValue, index, length, actualPosition]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNativeReanimated.default.View, {
      style: [{
        width: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(width),
        height: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(6),
        borderRadius: 50,
        overflow: 'hidden',
        transform: [{
          rotateZ: '0deg'
        }],
        borderWidth: 1,
        borderColor: _$$_REQUIRE(_dependencyMap[5]).COLORS.GRAY62
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
  var _default = exports.default = BulletsAnimatedStick;
