  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CEPList = CEPList;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _objectDestructuringEmpty2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  [];
  function CEPList(_ref) {
    var props = Object.assign({}, ((0, _objectDestructuringEmpty2.default)(_ref), _ref));
    var _props$route$params = props.route.params,
      list = _props$route$params.list,
      searchTerm = _props$route$params.searchTerm,
      isCepAddress = _props$route$params.isCepAddress,
      isCepProductDetail = _props$route$params.isCepProductDetail;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[5]).useNavigation)();
    var _useRegionalSearch = (0, _$$_REQUIRE(_dependencyMap[6]).useRegionalSearch)(),
      setSegmentToken = _useRegionalSearch.setSegmentToken,
      setRegionId = _useRegionalSearch.setRegionId,
      setCep = _useRegionalSearch.setCep;
    var _React$useState = _react.default.useState([]),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      ceps = _React$useState2[0],
      setCeps = _React$useState2[1];
    var selectCep = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (cep) {
        if (isCepAddress) {
          navigation.navigate('NewAddress', {
            hasCep: cep
          });
        } else if (isCepProductDetail) {
          navigation.navigate('ProductDetail', {
            hasCep: cep
          });
        } else {
          var _yield$instance$post = yield _$$_REQUIRE(_dependencyMap[7]).instance.post('/sessions', {
              public: {
                country: {
                  value: 'BRA'
                },
                postalCode: {
                  value: cep
                }
              }
            }),
            data = _yield$instance$post.data;
          var _yield$instance$get = yield _$$_REQUIRE(_dependencyMap[7]).instance.get(`/segments/${data.segmentToken}`),
            response = _yield$instance$get.data;
          setRegionId(response.regionId);
          setSegmentToken(data.segmentToken);
          navigation.navigate('Home');
        }
      });
      return function selectCep(_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      setCeps(list);
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).SafeAreaView, {
      style: {
        flex: 1,
        backgroundColor: '#FFF'
      },
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).TopBarBackButtonWithoutLogo, {
        loading: false,
        backButtonPress: function backButtonPress() {
          navigation.goBack();
        }
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Box, {
        paddingX: 22,
        paddingTop: 26,
        bg: "white",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
          fontFamily: "reservaSerifBold",
          fontSize: 26,
          children: "Resultados encontrados para"
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
          fontFamily: "reservaSansRegular",
          fontSize: 21,
          children: searchTerm
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[13]).FlatList, {
        style: {
          marginTop: 30,
          backgroundColor: 'white'
        },
        data: ceps,
        contentContainerStyle: {},
        keyExtractor: function keyExtractor(_, index) {
          return index.toString();
        },
        renderItem: function renderItem(_ref3) {
          var item = _ref3.item;
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[13]).TouchableOpacity, {
            onPress: function onPress() {
              return selectCep(item.cep);
            },
            containerStyle: {
              width: '100%'
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Box, {
              style: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 23,
                marginHorizontal: 22,
                marginTop: 3,
                paddingTop: 20,
                paddingBottom: 14,
                marginBottom: 22,
                borderRadius: 8,
                backgroundColor: '#FFF',
                shadowColor: '#000',
                shadowOffset: {
                  width: 2,
                  height: 6
                },
                shadowOpacity: 0.39,
                shadowRadius: 8.30,
                elevation: 6
              },
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Box, {
                flex: 1,
                children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
                  fontFamily: "reservaSansMedium",
                  fontSize: 19,
                  children: item.cep
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
                  fontFamily: "reservaSansBold",
                  fontSize: 18,
                  children: item.logradouro
                }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsxs)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
                  fontFamily: "reservaSansRegular",
                  fontSize: 18,
                  children: [item.bairro, ",", item.localidade, "/", item.uf]
                })]
              }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
                fontFamily: "reservaSansRegular",
                fontSize: 18,
                style: {
                  textDecorationLine: 'underline'
                },
                children: "Usar CEP"
              })]
            })
          });
        },
        ListFooterComponent: function ListFooterComponent() {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[14]).Button, {
            onPress: function onPress() {
              navigation.navigate('ChangeRegionalization');
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
              fontFamily: "reservaSansRegular",
              fontSize: 18,
              style: {
                textDecorationLine: 'underline',
                marginBottom: 230
              },
              children: "Buscar outro CEP"
            })
          });
        }
      })]
    });
  }
