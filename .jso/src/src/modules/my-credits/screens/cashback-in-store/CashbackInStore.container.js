  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CashbackInStoreContainer = CashbackInStoreContainer;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function CashbackInStoreContainer(_ref) {
    var navigateBack = _ref.navigateBack;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[5]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      token = _useState2[0],
      setToken = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      modalVisible = _useState4[0],
      setModalVisible = _useState4[1];
    var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      termsIsAccepted = _useState6[0],
      setTermsIsAccepted = _useState6[1];
    var acceptTermsAndConditions = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* () {
        yield _asyncStorage.default.setItem('@RNAuth:terms', 'true');
        if (modalVisible) {
          setTermsIsAccepted(true);
        } else {
          setTermsIsAccepted(!termsIsAccepted);
        }
        setModalVisible(false);
      });
      return function acceptTermsAndConditions() {
        return _ref2.apply(this, arguments);
      };
    }();
    var toggleModal = function toggleModal() {
      setModalVisible(!modalVisible);
    };
    var generateToken = /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* () {
        var date = new Date();
        // add 5 minute to current date
        date.setMinutes(date.getMinutes() + 5);
        var tomorrow = date.toISOString();
        if (profile != null && profile.document) {
          var _yield$MyCashbackAPI$ = yield _$$_REQUIRE(_dependencyMap[6]).MyCashbackAPI.post(`${_$$_REQUIRE(_dependencyMap[7]).CashbackHttpUrl.GetToken}${profile == null ? undefined : profile.document}/authenticate`, {
              type: 'qrcode',
              expire_date: tomorrow
            }),
            data = _yield$MyCashbackAPI$.data;
          setToken(data.data.token);
        }
      });
      return function generateToken() {
        return _ref3.apply(this, arguments);
      };
    }();
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).TopBarBackButton, {
        loading: false,
        showShadow: true,
        backButtonPress: navigateBack
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).CashbackInStoreView, {
        token: token,
        toggleModal: toggleModal,
        modalVisible: modalVisible,
        generateToken: generateToken,
        termsIsAccepted: termsIsAccepted,
        acceptTermsAndConditions: acceptTermsAndConditions
      })]
    });
  }
