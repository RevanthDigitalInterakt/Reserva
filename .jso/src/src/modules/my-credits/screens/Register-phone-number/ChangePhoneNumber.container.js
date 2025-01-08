  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ChangePhoneNumberContainer = ChangePhoneNumberContainer;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ChangePhoneNumberContainer(_ref) {
    var profile = _ref.profile,
      navigateBack = _ref.navigateBack,
      navigateToRegisterPhoneNumber = _ref.navigateToRegisterPhoneNumber,
      navigateToConfirmPhone = _ref.navigateToConfirmPhone;
    var _React$useState = _react.default.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      loadingToken = _React$useState2[0],
      setLoadingToken = _React$useState2[1];
    var _useLazyQuery = (0, _$$_REQUIRE(_dependencyMap[4]).useLazyQuery)(_$$_REQUIRE(_dependencyMap[5]).profileQuery, {
        fetchPolicy: 'no-cache'
      }),
      _useLazyQuery2 = (0, _slicedToArray2.default)(_useLazyQuery, 1),
      getProfile = _useLazyQuery2[0];
    var _useState = (0, _react.useState)({
        data: null,
        loadingProfile: true
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      dataProfile = _useState2[0].data,
      setDataProfile = _useState2[1];
    (0, _react.useEffect)(function () {
      getProfile().then(function (response) {
        setDataProfile({
          data: response.data,
          loadingProfile: false
        });
      });
    }, []);
    var handleNavigateToRegisterPhoneNumber = function handleNavigateToRegisterPhoneNumber() {
      navigateToRegisterPhoneNumber();
    };
    function toIsoString(date) {
      var tzo = -date.getTimezoneOffset();
      var dif = tzo >= 0 ? '+' : '-';
      var pad = function pad(num) {
        return (num < 10 ? '0' : '') + num;
      };

      // Adiciona 10 minutos
      date.setMinutes(date.getMinutes() + 10);
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}${dif}${pad(Math.floor(Math.abs(tzo) / 60))}:${pad(Math.abs(tzo) % 60)}`;
    }
    var handleNavigateToConfirmPhone = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* () {
        var _dataProfile$profile;
        var expiredDate = toIsoString(new Date());
        if (dataProfile != null && (_dataProfile$profile = dataProfile.profile) != null && _dataProfile$profile.document) {
          setLoadingToken(true);
          try {
            var _dataProfile$profile2, _profile$homePhone;
            var _yield$MyCashbackAPI$ = yield _$$_REQUIRE(_dependencyMap[6]).MyCashbackAPI.post(`${_$$_REQUIRE(_dependencyMap[6]).CashbackHttpUrl.GetToken}${dataProfile == null ? undefined : (_dataProfile$profile2 = dataProfile.profile) == null ? undefined : _dataProfile$profile2.document}/authenticate`, {
                type: 'sms',
                expire_date: expiredDate,
                phone: profile == null ? undefined : (_profile$homePhone = profile.homePhone) == null ? undefined : _profile$homePhone.split('+')[1]
              }),
              data = _yield$MyCashbackAPI$.data;
            if (data) {
              setLoadingToken(false);
              navigateToConfirmPhone();
            }
          } catch (error) {
            _$$_REQUIRE(_dependencyMap[7]).ExceptionProvider.captureException(error);
          }
        }
      });
      return function handleNavigateToConfirmPhone() {
        return _ref2.apply(this, arguments);
      };
    }();
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).TopBarBackButton, {
        loading: loadingToken,
        showShadow: true,
        backButtonPress: navigateBack
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).ChangePhoneNumberView, {
        profile: profile,
        navigateToRegisterPhoneNumber: handleNavigateToRegisterPhoneNumber,
        navigateToConfirmPhone: handleNavigateToConfirmPhone,
        disableButton: loadingToken
      })]
    });
  }
