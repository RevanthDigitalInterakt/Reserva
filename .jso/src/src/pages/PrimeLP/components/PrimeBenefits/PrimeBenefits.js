  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _IconPrimeDiscount = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _IconPrimeFreeShipping = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  var _IconPrimeCashback = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[5]));
  var _IconPrimePartners = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function PrimeBenefits(_ref) {
    var data = _ref.data;
    var benefits = (0, _react.useMemo)(function () {
      return [{
        Icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconPrimeDiscount.default, {
          style: _$$_REQUIRE(_dependencyMap[8]).styles.icon
        }),
        title: 'Descontos Especiais',
        text: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
          variant: "tituloSessao",
          style: _$$_REQUIRE(_dependencyMap[8]).styles.itemDescription,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
            variant: "precoTotal",
            style: _$$_REQUIRE(_dependencyMap[8]).styles.itemDescriptionBold,
            children: "15% OFF* "
          }), "em todas as pe\xE7as das marcas Reserva."]
        })
      }, {
        Icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconPrimeFreeShipping.default, {
          style: _$$_REQUIRE(_dependencyMap[8]).styles.icon
        }),
        title: 'Frete Grátis',
        text: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
          variant: "tituloSessao",
          style: _$$_REQUIRE(_dependencyMap[8]).styles.itemDescription,
          children: "Em toda compra*, sem valor m\xEDnimo e v\xE1lido em todo o Brasil."
        })
      }, {
        Icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconPrimeCashback.default, {
          style: _$$_REQUIRE(_dependencyMap[8]).styles.icon
        }),
        title: `R$ ${data.monthlyCashback} de Cashback Mensal`,
        text: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
          variant: "tituloSessao",
          style: _$$_REQUIRE(_dependencyMap[8]).styles.itemDescription,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
            variant: "precoTotal",
            style: _$$_REQUIRE(_dependencyMap[8]).styles.itemDescriptionBold,
            children: "Acumule mais*"
          }), "pra comprar o que voc\xEA quiser, quando preferir."]
        })
      }, {
        Icon: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_IconPrimePartners.default, {
          style: _$$_REQUIRE(_dependencyMap[8]).styles.icon
        }),
        title: 'Programa de Parcerias',
        text: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
          variant: "tituloSessao",
          style: _$$_REQUIRE(_dependencyMap[8]).styles.itemDescription,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
            variant: "precoTotal",
            style: _$$_REQUIRE(_dependencyMap[8]).styles.itemDescriptionBold,
            children: "Acesso exclusivo"
          }), ' ', "a benef\xEDcios com marcas parceiras de variados segmentos."]
        })
      }];
    }, [data]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
      style: _$$_REQUIRE(_dependencyMap[8]).styles.wrapper,
      testID: "com.usereserva:id/PrimeBenefits_wrapper",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
        variant: "tituloSessoes",
        style: _$$_REQUIRE(_dependencyMap[8]).styles.title,
        children: ["Vantagens em ser", /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
          variant: "descontoTag2",
          style: _$$_REQUIRE(_dependencyMap[8]).styles.titleBold,
          children: ' Prime'
        })]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
        variant: "tituloSessao",
        style: _$$_REQUIRE(_dependencyMap[8]).styles.subtitle,
        children: "Ganhe um infinito de comodidades pra aproveitar no site, App, lojas f\xEDsicas e at\xE9 fora da Reserva. Al\xE9m de acesso a pr\xE9-lan\xE7amentos e produtos exclusivos, voc\xEA tamb\xE9m garante:"
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[8]).styles.listWrapper,
        children: benefits.map(function (item) {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[8]).styles.itemContainer,
            children: [item.Icon, /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Typography, {
              variant: "descontoTag2",
              style: _$$_REQUIRE(_dependencyMap[8]).styles.itemTitle,
              children: item.title
            }), item.text]
          }, `prime-benefit-${item.title}`);
        })
      })]
    });
  }
  var _default = exports.default = PrimeBenefits;
