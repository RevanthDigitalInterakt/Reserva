  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useContentfull = exports.default = exports.ContentfullContext = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var CONTENTFUL_TESTING = true;
  var ContentfullContext = exports.ContentfullContext = (0, _react.createContext)({
    isTesting: CONTENTFUL_TESTING,
    toggleIsTesting: function toggleIsTesting() {}
  });
  function ContentfullContextProvider(_ref) {
    var children = _ref.children;
    var _useState = (0, _react.useState)(CONTENTFUL_TESTING),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isTesting = _useState2[0],
      setIsTesting = _useState2[1];
    var toggleIsTesting = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (value) {
        // setIsTesting(!isTesting);
      });
      return function toggleIsTesting(_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(ContentfullContext.Provider, {
      value: {
        isTesting: isTesting,
        toggleIsTesting: toggleIsTesting
      },
      children: children
    });
  }
  var _default = exports.default = ContentfullContextProvider;
  var useContentfull = exports.useContentfull = function useContentfull() {
    var contentfullContext = (0, _react.useContext)(ContentfullContext);
    if (!contentfullContext) {
      throw new Error('use Auth must be used within a ContentfullContextProvider');
    }
    var isTesting = contentfullContext.isTesting,
      toggleIsTesting = contentfullContext.toggleIsTesting;
    return {
      isTesting: isTesting,
      toggleIsTesting: toggleIsTesting
    };
  };
