  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _newsLetter = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function NewsLetterComponent(_ref) {
    var userEmail = _ref.userEmail,
      value = _ref.value,
      handleToogleNewsLetterState = _ref.handleToogleNewsLetterState;
    var _useMutation = (0, _$$_REQUIRE(_dependencyMap[5]).useMutation)(_newsLetter.default),
      _useMutation2 = (0, _slicedToArray2.default)(_useMutation, 1),
      updateNewsLetter = _useMutation2[0];
    var handleUpdateNewsLetter = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      var _yield$updateNewsLett = yield updateNewsLetter({
          variables: {
            email: userEmail,
            isNewsletterOptIn: !value
          }
        }),
        data = _yield$updateNewsLett.data;
      if (data.subscribeNewsletter) {
        handleToogleNewsLetterState(!value);
      }
    }), [userEmail, value]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
      mb: "xs",
      flexDirection: "row",
      zIndex: 2,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Checkbox, {
        testID: "com.usereserva:id/newsletter_button",
        fontFamily: "nunitoRegular",
        fontSize: 12,
        color: "dropDownBorderColor",
        selectedColor: "preto",
        width: "100%",
        checked: value,
        onCheck: handleUpdateNewsLetter,
        optionName: "Desejo receber e-mails com promo\xE7\xF5es das marcas Reserva."
      })
    });
  }
  var _default = exports.default = NewsLetterComponent;
