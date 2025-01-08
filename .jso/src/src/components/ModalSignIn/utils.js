  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isValidPassword = exports.isValidEmail = undefined;
  var Yup = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var isValidPassword = exports.isValidPassword = function isValidPassword(text) {
    return Yup.string().required().matches(/^(?=.{8,})/) // 8 caracteres
    .matches(/^(?=.*[A-Z])/) // pelo menos uma maiuscula
    .matches(/^(?=.*[a-z])/) // pelo menos uma minuscula
    .matches(/^(?=.*[0-9])/) // pelo menos um nuemro
    .isValidSync(text);
  };
  var isValidEmail = exports.isValidEmail = function isValidEmail(text) {
    return Yup.string().required().email().isValidSync(text.trim());
  };
