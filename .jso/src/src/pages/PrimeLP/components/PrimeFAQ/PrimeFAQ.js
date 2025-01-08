  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _DropdownItem = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function Divider() {
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_reactNative.View, {
      style: _$$_REQUIRE(_dependencyMap[5]).styles.divider
    });
  }
  function PrimeFAQ(_ref) {
    var data = _ref.data;
    var primeFAQ = (0, _react.useMemo)(function () {
      return data == null ? undefined : data.primeFaq;
    }, [data == null ? undefined : data.primeFaq]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNative.View, {
      style: _$$_REQUIRE(_dependencyMap[5]).styles.container,
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
        fontFamily: "reservaDisplayRegular",
        textAlign: "center",
        style: _$$_REQUIRE(_dependencyMap[5]).styles.sectionTitle,
        children: "Perguntas Frequentes"
      }), primeFAQ == null ? undefined : primeFAQ.map(function (item, index) {
        var _item$title;
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_reactNative.View, {
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_DropdownItem.default, {
            title: (_item$title = item == null ? undefined : item.title) != null ? _item$title : '',
            body: item == null ? undefined : item.textBody,
            justifyText: true
          }), index !== primeFAQ.length - 1 && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(Divider, {}, item.title)]
        }, `primeFaqItem-${item.title}`);
      })]
    });
  }
  var _default = exports.default = PrimeFAQ;
