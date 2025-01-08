  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = IconEdit;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNativeSvg = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function IconEdit(props) {
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNativeSvg.default, Object.assign({
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none"
    }, props, {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNativeSvg.G, {
        "clip-path": "url(#clip0_653_1388)",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNativeSvg.Path, {
          d: "M9.37333 6.01333L9.98667 6.62667L3.94667 12.6667H3.33333V12.0533L9.37333 6.01333ZM11.7733 2C11.6067 2 11.4333 2.06667 11.3067 2.19333L10.0867 3.41333L12.5867 5.91333L13.8067 4.69333C14.0667 4.43333 14.0667 4.01333 13.8067 3.75333L12.2467 2.19333C12.1133 2.06 11.9467 2 11.7733 2ZM9.37333 4.12667L2 11.5V14H4.5L11.8733 6.62667L9.37333 4.12667Z",
          fill: "white"
        })
      })
    }));
  }
