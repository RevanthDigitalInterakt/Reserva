  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useDorisVerify = useDorisVerify;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _$$_REQUIRE(_dependencyMap[3]);
  // import { useRemoteConfig } from './useRemoteConfig';

  function useDorisVerify() {
    // const { getBoolean } = useRemoteConfig();
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isValidProductDoris = _useState2[0],
      setIsValidProductDoris = _useState2[1];
    // const showDorisButton = useMemo(() => getBoolean('show_doris_button'), []);
    var _useVerifyDorisProduc = (0, _$$_REQUIRE(_dependencyMap[4]).useVerifyDorisProductLazyQuery)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: 'no-cache'
      }),
      _useVerifyDorisProduc2 = (0, _slicedToArray2.default)(_useVerifyDorisProduc, 1),
      verifyDoris = _useVerifyDorisProduc2[0];
    var verifyProductDoris = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* (ean) {
        try {
          // if (!showDorisButton) return;
          var _yield$verifyDoris = yield verifyDoris({
              variables: {
                ean: ean
              }
            }),
            data = _yield$verifyDoris.data;
          if (!data) return;
          var verifyDorisProduct = data.verifyDorisProduct;
          setIsValidProductDoris(verifyDorisProduct.valid);
        } catch (error) {
          _$$_REQUIRE(_dependencyMap[5]).ExceptionProvider.captureException(error);
        }
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }(), []);
    return {
      verifyProductDoris: verifyProductDoris,
      isValidProductDoris: isValidProductDoris
    };
  }
