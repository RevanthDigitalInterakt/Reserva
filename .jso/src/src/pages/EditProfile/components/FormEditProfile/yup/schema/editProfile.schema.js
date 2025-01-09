  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var Yup = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _defaultErrors = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var _documentYupTest = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[3]));
  var _nameYupTest = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[4]));
  var _birthDateYupTest = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[5]));
  var _cellPhoneYupTest = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var EditProfileSchema = Yup.object().shape({
    name: Yup.string().test(Object.assign({}, _nameYupTest.default)).required(_defaultErrors.default.NAME),
    birthDate: Yup.string().test(Object.assign({}, _birthDateYupTest.default)).required(_defaultErrors.default.BIRTHDATE),
    cellPhone: Yup.string().test(Object.assign({}, _cellPhoneYupTest.default)).required(_defaultErrors.default.CELLPHONE),
    document: Yup.string().test(Object.assign({}, _documentYupTest.default)).required(_defaultErrors.default.DOCUMENT),
    gender: Yup.string().required(_defaultErrors.default.GENDER)
  });
  var _default = exports.default = EditProfileSchema;
