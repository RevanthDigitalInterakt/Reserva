  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RegisterPhoneNumberContainer = RegisterPhoneNumberContainer;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _firestore = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function RegisterPhoneNumberContainer(_ref) {
    var profile = _ref.profile,
      isChangeNumber = _ref.isChangeNumber,
      confirmPhone = _ref.confirmPhone,
      navigateBack = _ref.navigateBack,
      navigateToNumberRegisteredSuccessfully = _ref.navigateToNumberRegisteredSuccessfully;
    var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      phone = _useState2[0],
      setPhone = _useState2[1];
    var _useState3 = (0, _react.useState)(''),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      code = _useState4[0],
      setCode = _useState4[1];
    var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      openConfirmCodeSection = _useState6[0],
      setOpenConfirmCodeSection = _useState6[1];
    var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      loadingToken = _useState8[0],
      setLoadingToken = _useState8[1];
    var _useState9 = (0, _react.useState)(false),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      showCodeError = _useState10[0],
      setShowCodeError = _useState10[1];
    var _useState11 = (0, _react.useState)(120),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      timerCode = _useState12[0],
      setTimerCode = _useState12[1];
    var _useState13 = (0, _react.useState)(false),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      startChronometer = _useState14[0],
      setStartChronometer = _useState14[1];
    var _useState15 = (0, _react.useState)(false),
      _useState16 = (0, _slicedToArray2.default)(_useState15, 2),
      phoneInvalid = _useState16[0],
      setPhoneInvalid = _useState16[1];
    var _useLazyQuery = (0, _$$_REQUIRE(_dependencyMap[5]).useLazyQuery)(_$$_REQUIRE(_dependencyMap[6]).profileQuery, {
        fetchPolicy: 'no-cache'
      }),
      _useLazyQuery2 = (0, _slicedToArray2.default)(_useLazyQuery, 1),
      getProfile = _useLazyQuery2[0];
    var _useState17 = (0, _react.useState)({
        data: null,
        loadingProfile: true
      }),
      _useState18 = (0, _slicedToArray2.default)(_useState17, 2),
      dataProfile = _useState18[0].data,
      setDataProfile = _useState18[1];
    var _useMutation = (0, _$$_REQUIRE(_dependencyMap[5]).useMutation)(_$$_REQUIRE(_dependencyMap[6]).profileMutation),
      _useMutation2 = (0, _slicedToArray2.default)(_useMutation, 1),
      updateUserData = _useMutation2[0];
    (0, _react.useEffect)(function () {
      getProfile().then(function (response) {
        setDataProfile({
          data: response.data,
          loadingProfile: false
        });
      });
    }, []);
    var countRef = (0, _react.useRef)(null);
    (0, _react.useEffect)(function () {
      if (startChronometer) {
        if (timerCode > 0) {
          countRef.current = setInterval(function () {
            setTimerCode(function (timerPix) {
              return timerPix - 1;
            });
          }, 1000);
          return function () {
            return clearInterval(countRef.current);
          };
        }
      }
    }, [startChronometer === true, timerCode]);
    (0, _react.useEffect)(function () {
      if (confirmPhone) {
        setStartChronometer(true);
      }
    }, [confirmPhone]);
    var formatTime = function formatTime() {
      var getSeconds = `0${timerCode % 60}`.slice(-2);
      var minutes = `${Math.floor(timerCode / 60)}`;
      var getMinutes = `0${minutes % 60}`.slice(-2);
      return `${getMinutes}:${getSeconds}`;
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
    var handleRegisterPhoneNumber = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* () {
        if (!phoneInvalid && phone.length === 15 || confirmPhone) {
          var _profile$homePhone, _dataProfile$profile;
          var expiredDate = toIsoString(new Date());
          var newPhone = confirmPhone ? profile == null ? undefined : (_profile$homePhone = profile.homePhone) == null ? undefined : _profile$homePhone.split('+')[1] : `55${phone.replace(/[^\d\+]+/g, '')}`;
          if (dataProfile != null && (_dataProfile$profile = dataProfile.profile) != null && _dataProfile$profile.document) {
            var _dataProfile$profile2;
            setLoadingToken(true);
            var _yield$MyCashbackAPI$ = yield _$$_REQUIRE(_dependencyMap[7]).MyCashbackAPI.post(`${_$$_REQUIRE(_dependencyMap[7]).CashbackHttpUrl.GetToken}${dataProfile == null ? undefined : (_dataProfile$profile2 = dataProfile.profile) == null ? undefined : _dataProfile$profile2.document}/authenticate`, {
                type: 'sms',
                expire_date: expiredDate,
                phone: newPhone
              }),
              data = _yield$MyCashbackAPI$.data;
            if (data) {
              setLoadingToken(false);
              setOpenConfirmCodeSection(true);
            }
          }
          setTimerCode(120);
          setStartChronometer(true);
          setOpenConfirmCodeSection(true);

          // só vai salvar o telefone se não existir telefone ou for alterado
          if (!confirmPhone) {
            handleSavePhone();
          }
        } else {
          setPhoneInvalid(true);
          setOpenConfirmCodeSection(false);
        }
      });
      return function handleRegisterPhoneNumber() {
        return _ref2.apply(this, arguments);
      };
    }();
    var handleSavePhone = /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* () {
        if (!phoneInvalid && dataProfile !== null) {
          var _dataProfile$profile3, _dataProfile$profile4, _dataProfile$profile5, _dataProfile$profile6, _dataProfile$profile7, _dataProfile$profile8;
          var user = {
            firstName: dataProfile == null ? undefined : (_dataProfile$profile3 = dataProfile.profile) == null ? undefined : _dataProfile$profile3.firstName,
            lastName: dataProfile == null ? undefined : (_dataProfile$profile4 = dataProfile.profile) == null ? undefined : _dataProfile$profile4.lastName,
            email: dataProfile == null ? undefined : (_dataProfile$profile5 = dataProfile.profile) == null ? undefined : _dataProfile$profile5.email,
            document: dataProfile == null ? undefined : (_dataProfile$profile6 = dataProfile.profile) == null ? undefined : _dataProfile$profile6.document,
            birthDate: dataProfile == null ? undefined : (_dataProfile$profile7 = dataProfile.profile) == null ? undefined : _dataProfile$profile7.birthDate,
            homePhone: `+55${phone.replace(/[^\d\+]+/g, '')}`,
            gender: dataProfile == null ? undefined : (_dataProfile$profile8 = dataProfile.profile) == null ? undefined : _dataProfile$profile8.gender
          };
          yield updateUserData({
            variables: {
              fields: user
            }
          });
        }
      });
      return function handleSavePhone() {
        return _ref3.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      var validatePhone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
      if (phone.length === 15) {
        phone.match(validatePhone) ? setPhoneInvalid(false) : setPhoneInvalid(true);
      } else if (phone.length < 15) {
        setOpenConfirmCodeSection(false);
      }
    }, [phone]);
    var saveDataInFirestore = /*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2.default)(function* () {
        var virifyPhoneCollection = (0, _firestore.default)().collection('verify-phone');
        var user = yield virifyPhoneCollection.where('userId', '==', profile.userId).get();
        if (user.size > 0) {
          virifyPhoneCollection.doc(user.docs[0].id).update({
            date: _firestore.default.Timestamp.now().toDate()
          }).then(function (e) {
            navigateToNumberRegisteredSuccessfully();
          });
        } else {
          var response = yield virifyPhoneCollection.add({
            email: profile.email,
            userId: profile.userId,
            date: _firestore.default.Timestamp.now().toDate()
          });
          if (response) {
            navigateToNumberRegisteredSuccessfully();
          }
        }
      });
      return function saveDataInFirestore() {
        return _ref4.apply(this, arguments);
      };
    }();
    var handleConfirmCodeSection = /*#__PURE__*/function () {
      var _ref5 = (0, _asyncToGenerator2.default)(function* () {
        setLoadingToken(true);
        try {
          var _dataProfile$profile9;
          var response = yield _$$_REQUIRE(_dependencyMap[7]).MyCashbackAPI.post(`${_$$_REQUIRE(_dependencyMap[7]).CashbackHttpUrl.GetToken}${dataProfile == null ? undefined : (_dataProfile$profile9 = dataProfile.profile) == null ? undefined : _dataProfile$profile9.document}/validate_authentication`, {
            type: 'sms_token',
            token: code
          });
          if (response.status === 204) {
            setLoadingToken(false);
            saveDataInFirestore();
            setShowCodeError(false);
          }
        } catch (error) {
          setLoadingToken(false);
          setShowCodeError(true);
        }
      });
      return function handleConfirmCodeSection() {
        return _ref5.apply(this, arguments);
      };
    }();
    var resendNewCode = function resendNewCode() {
      handleRegisterPhoneNumber();
    };
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).TopBarBackButton, {
        loading: loadingToken,
        showShadow: true,
        backButtonPress: navigateBack
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).RegisterPhoneNumberView, {
        profile: profile,
        isChangeNumber: isChangeNumber,
        confirmPhone: confirmPhone,
        valuePhone: phone,
        valueCode: code,
        onChageCode: function onChageCode(code) {
          return setCode(code);
        },
        onChangeText: function onChangeText(phone) {
          return setPhone(phone);
        },
        timerCode: formatTime(),
        showCodeError: showCodeError,
        registerPhoneNumber: handleRegisterPhoneNumber,
        confirmCodeSection: handleConfirmCodeSection,
        resendNewCode: resendNewCode,
        openConfirmCodeSection: openConfirmCodeSection,
        phoneInvalid: phoneInvalid,
        disableButton: loadingToken
      })]
    });
  }
