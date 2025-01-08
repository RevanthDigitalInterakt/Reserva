  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function UserProfilePictureComponent(_ref) {
    var file = _ref.file,
      toogleModalChangeFile = _ref.toogleModalChangeFile,
      userEmail = _ref.userEmail;
    var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      currentPath = _useState2[0],
      setCurrentPath = _useState2[1];
    var navigation = (0, _$$_REQUIRE(_dependencyMap[4]).useNavigation)();
    var _FirebaseService = new (_$$_REQUIRE(_dependencyMap[5]).FirebaseService)(),
      getUrlFS = _FirebaseService.getUrlFS;
    var handleNavigationEditPassword = (0, _react.useCallback)(function () {
      navigation.navigate('EditPassword', {
        email: userEmail
      });
    }, [userEmail]);
    var handleSetCurrentPathImage = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (uri) {
        if (uri) {
          if (!uri.includes('https://') && !uri.includes('file://')) {
            setCurrentPath(yield getUrlFS(uri));
            return;
          }
          setCurrentPath(uri);
          return;
        }
        setCurrentPath(undefined);
      });
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), []);
    (0, _react.useEffect)(function () {
      (0, _asyncToGenerator2.default)(function* () {
        yield handleSetCurrentPathImage(file.uri);
      })();
    }, [file]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Box, {
      alignItems: "center",
      children: [!!currentPath && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Avatar, {
        imageSource: {
          uri: currentPath
        },
        onPress: toogleModalChangeFile,
        buttonEdit: true,
        imageStyle: {
          width: 60,
          height: 60,
          borderRadius: 60
        }
      }), !currentPath && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Avatar, {
        onPress: toogleModalChangeFile,
        imageStyle: {
          width: 60,
          height: 60,
          borderRadius: 60
        },
        buttonEdit: true
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Box, {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginTop: "micro",
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Button, {
          inline: true,
          onPress: handleNavigationEditPassword,
          title: "Alterar senha",
          testID: "com.usereserva:id/userprofilepicture_button_edit_password",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[10]).Typography, {
            style: {
              textDecorationLine: 'underline'
            },
            fontSize: 13,
            fontFamily: "nunitoRegular",
            children: "Alterar senha"
          })
        })
      })]
    });
  }
  var _default = exports.default = UserProfilePictureComponent;
