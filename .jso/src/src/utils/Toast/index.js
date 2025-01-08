  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.showToast = exports.default = undefined;
  var _objectWithoutProperties2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNativeToastMessage = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _excluded = ["type", "text1", "text2"];
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var TOAST_WIDTH = _configDeviceSizes.default.DEVICE_WIDTH * 0.85;
  var showToast = exports.showToast = function showToast(_ref) {
    var type = _ref.type,
      text1 = _ref.text1,
      text2 = _ref.text2,
      params = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    _reactNativeToastMessage.default.show(Object.assign({
      type: type,
      text1: text1,
      text2: text2
    }, params));
  };
  var toastConfig = {
    success: function success(props) {
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNativeToastMessage.BaseToast, Object.assign({}, props, {
        style: {
          borderLeftColor: _$$_REQUIRE(_dependencyMap[6]).theme.colors.verdeSucesso,
          width: TOAST_WIDTH
        },
        text1Props: {
          numberOfLines: 2
        }
      }));
    },
    error: function error(props) {
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNativeToastMessage.BaseToast, Object.assign({}, props, {
        style: {
          borderLeftColor: _$$_REQUIRE(_dependencyMap[6]).theme.colors.vermelhoAlerta,
          width: TOAST_WIDTH
        },
        text1Props: {
          numberOfLines: 2
        }
      }));
    },
    warning: function warning(props) {
      return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNativeToastMessage.BaseToast, Object.assign({}, props, {
        style: {
          borderLeftColor: _$$_REQUIRE(_dependencyMap[6]).theme.colors.amareloAtencao,
          width: TOAST_WIDTH
        },
        text1Props: {
          numberOfLines: 2
        }
      }));
    }
  };
  function ToastProvider() {
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNativeToastMessage.default, {
      config: toastConfig
    });
  }
  var _default = exports.default = ToastProvider;
