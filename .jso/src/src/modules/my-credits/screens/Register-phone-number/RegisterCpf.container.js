  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RegisterCpfContainer = RegisterCpfContainer;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function RegisterCpfContainer(_ref) {
    var profile = _ref.profile,
      navigateBack = _ref.navigateBack,
      navigateToVerifyNumber = _ref.navigateToVerifyNumber;
    var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      cpf = _useState2[0],
      setCpf = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      cpfInvalid = _useState4[0],
      setCpfInvalid = _useState4[1];
    var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];
    var _useMutation = (0, _$$_REQUIRE(_dependencyMap[4]).useMutation)(_$$_REQUIRE(_dependencyMap[5]).profileMutation),
      _useMutation2 = (0, _slicedToArray2.default)(_useMutation, 1),
      updateUserData = _useMutation2[0];
    var cpfValidate = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf === '') return setCpfInvalid(true);
        if (cpf.length !== 11 || cpf === '00000000000' || cpf === '11111111111' || cpf === '22222222222' || cpf === '33333333333' || cpf === '44444444444' || cpf === '55555555555' || cpf === '66666666666' || cpf === '77777777777' || cpf === '88888888888' || cpf === '99999999999') return setCpfInvalid(true);
        var add = 0;
        var i = 0;
        var rev = 0;
        for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
        rev = 11 - add % 11;
        if (rev === 10 || rev === 11) rev = 0;
        if (rev !== parseInt(cpf.charAt(9))) return setCpfInvalid(true);
        add = 0;
        for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - add % 11;
        if (rev === 10 || rev === 11) rev = 0;
        if (rev !== parseInt(cpf.charAt(10))) return setCpfInvalid(true);
        return setCpfInvalid(false);
      });
      return function cpfValidate(_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    var handleSaveCpf = /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* () {
        var user = {
          firstName: profile == null ? undefined : profile.firstName,
          lastName: profile == null ? undefined : profile.lastName,
          email: profile == null ? undefined : profile.email,
          document: cpf.replace(/[^\d]+/g, ''),
          birthDate: profile == null ? undefined : profile.birthDate,
          homePhone: profile == null ? undefined : profile.homePhone,
          gender: profile == null ? undefined : profile.gender
        };
        yield updateUserData({
          variables: {
            fields: user
          }
        });
        setLoading(false);
      });
      return function handleSaveCpf() {
        return _ref3.apply(this, arguments);
      };
    }();
    var handleNavigateToVerifyNumber = function handleNavigateToVerifyNumber() {
      setLoading(true);
      if (!cpfInvalid && cpf.length > 0) {
        handleSaveCpf().then(function () {
          return navigateToVerifyNumber();
        });
      } else {
        setLoading(false);
        setCpfInvalid(true);
      }
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[6]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).TopBarBackButton, {
        loading: loading,
        showShadow: true,
        backButtonPress: navigateBack
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[8]).RegisterCpfView, {
        valueCpf: cpf,
        onChangeText: function onChangeText(value) {
          setCpf(value);
          cpfValidate(cpf);
        },
        navigateToVerifyNumber: handleNavigateToVerifyNumber,
        cpfInvalid: cpfInvalid,
        disableButton: loading
      })]
    });
  }
