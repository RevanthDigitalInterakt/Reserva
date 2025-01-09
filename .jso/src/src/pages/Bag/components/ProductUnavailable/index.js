  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ProductUnavailable;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _IconComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function ProductUnavailable(_ref) {
    var showCard = _ref.showCard,
      _ref$type = _ref.type,
      type = _ref$type === undefined ? 'UNAVAILABLE' : _ref$type;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      closedCard = _useState2[0],
      setClosedCard = _useState2[1];
    var title = (0, _react.useMemo)(function () {
      if (type === 'UNAVAILABLE') {
        return 'Produto indisponível no momento';
      }
      if (type === 'SOME_UNAVAILABLE') {
        return 'Produto indisponível para retirada em loja';
      }
      return 'Atenção';
    }, [type]);
    var description = (0, _react.useMemo)(function () {
      if (type === 'UNAVAILABLE') {
        return 'No momento, este produto não esta disponível para envio ou retirada no CEP atual e será removido automaticamente na próxima etapa, mas não se preocupe, te notificaremos quando houver disponibilidade.';
      }
      if (type === 'SOME_UNAVAILABLE') {
        return 'No momento, este produto não esta disponível para retirada, por favor, escolha outra forma de entrega na próxima etapa.';
      }
      return 'Não encontramos nenhuma opção de frete para o CEP informado! ';
    }, [type]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
      children: showCard && !closedCard && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[6]).productUnavailableStyles.container,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[6]).productUnavailableStyles.cardContainer,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_IconComponent.default, {
            icon: "info"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsxs)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[6]).productUnavailableStyles.textWrap,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[6]).productUnavailableStyles.title,
              children: title
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.Text, {
              style: _$$_REQUIRE(_dependencyMap[6]).productUnavailableStyles.description,
              children: description
            })]
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.TouchableOpacity, {
            onPress: function onPress() {
              return setClosedCard(true);
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_reactNative.View, {
              style: _$$_REQUIRE(_dependencyMap[6]).productUnavailableStyles.iconContainer,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[5]).jsx)(_IconComponent.default, {
                icon: "closeIcon"
              })
            })
          })]
        })
      })
    });
  }
