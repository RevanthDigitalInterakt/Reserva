  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Trash;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNativeSvg = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function Trash() {
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNativeSvg.default, {
      width: "16",
      height: "22",
      viewBox: "0 0 16 22",
      fill: "none",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNativeSvg.Path, {
        d: "M2.49866 7.33334L2.95699 16.3333C2.95699 17 3.35699 18.3333 4.95699 18.3333C6.55699 18.3333 9.37366 18.3333 11.0403 18.3333C11.6653 18.3333 13.0403 17.9333 13.0403 16.3333C13.0403 14.7333 13.4987 10 13.4987 7.33334M2.49866 7.33334H13.4987M2.49866 7.33334C1.9924 7.33334 1.58203 6.92295 1.58203 6.41669C1.58203 5.91043 1.99244 5.50002 2.4987 5.50002H13.4987C14.005 5.50002 14.4154 5.91043 14.4154 6.41669C14.4154 6.92295 14.0049 7.33334 13.4987 7.33334M5.2487 10.0834V15.5834M7.9987 10.0834V15.5834M10.7487 10.0834V15.5834M6.16536 5.50002H9.83203V4.58335C9.83203 4.07709 9.42162 3.66669 8.91536 3.66669H7.08203C6.57577 3.66669 6.16536 4.07709 6.16536 4.58335V5.50002Z",
        stroke: "#E4002B"
      })
    });
  }
