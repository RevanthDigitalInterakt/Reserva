  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _ModalDeleteAccount = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function DeleteAccountComponent(_ref) {
    var userId = _ref.userId;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showModalDeleteAccount = _useState2[0],
      setShowModalDeleteAccount = _useState2[1];
    var navigation = (0, _$$_REQUIRE(_dependencyMap[5]).useNavigation)();
    var _useRemoveUserMutatio = (0, _$$_REQUIRE(_dependencyMap[6]).useRemoveUserMutationMutation)({
        context: {
          clientName: 'gateway'
        }
      }),
      _useRemoveUserMutatio2 = (0, _slicedToArray2.default)(_useRemoveUserMutatio, 1),
      removeUserMutation = _useRemoveUserMutatio2[0];
    var handleDeleteAccount = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        var _yield$removeUserMuta = yield removeUserMutation({
            variables: {
              customerId: userId
            }
          }),
          data = _yield$removeUserMuta.data;
        if (data != null && data.removeCustomer) {
          setShowModalDeleteAccount(false);
          navigation.navigate('AccountDeletedSuccessfully');
        }
      } catch (error) {
        _$$_REQUIRE(_dependencyMap[7]).ExceptionProvider.captureException(error);
      }
    }), [userId]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
        flexDirection: "row",
        mb: 84,
        bg: "white",
        marginX: -1,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Button, {
          flexDirection: "row",
          onPress: function onPress() {
            return setShowModalDeleteAccount(true);
          },
          testID: "com.usereserva:id/deleteaccount_button_remove",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[8]).Fragment, {
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[11]).IconLegacy, {
              name: "Trash",
              color: "vermelhoAlerta",
              size: 24,
              marginRight: "quarck"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
              fontFamily: "nunitoRegular",
              fontSize: 15,
              color: "vermelhoAlerta",
              children: "Deletar minha conta"
            })]
          })
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_ModalDeleteAccount.default, {
        isVisible: showModalDeleteAccount,
        handleDeleteAccount: handleDeleteAccount,
        setIsVisible: function setIsVisible() {
          return setShowModalDeleteAccount(false);
        }
      })]
    });
  }
  var _default = exports.default = DeleteAccountComponent;
