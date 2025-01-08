  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.textVariants = exports.Typography = undefined;
  var _native = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var textVariants = exports.textVariants = (0, _$$_REQUIRE(_dependencyMap[3]).variant)({
    variants: {
      descontoTag1: {
        fontFamily: 'reservaSerifBold',
        fontSize: 27
      },
      descontoTag2: {
        fontFamily: 'reservaSerifBold',
        fontSize: 15
      },
      descontoTag1AllCaps: {
        fontFamily: 'reservaSerifBold',
        fontSize: 14
      },
      descontoTag2AllCaps: {
        fontFamily: 'reservaSerifBold',
        fontSize: 8
      },
      descontoTag3AllCaps: {
        fontFamily: 'reservaSerifBold',
        fontSize: 8
      },
      tituloSessoes: {
        fontFamily: 'reservaSerifRegular',
        fontSize: 28
      },
      subtituloSessoes: {
        fontFamily: 'reservaSerifRegular',
        fontSize: 20
      },
      precoProduto1: {
        fontFamily: 'nunitoBold',
        fontSize: 22
      },
      precoTotal: {
        fontFamily: 'nunitoBold',
        fontSize: 20
      },
      precoPromocional1: {
        fontFamily: 'nunitoBold',
        fontSize: 18
      },
      precoPromocional2: {
        fontFamily: 'nunitoBold',
        fontSize: 14
      },
      tituloSessao: {
        fontFamily: 'nunitoRegular',
        fontSize: 15
      },
      precoAntigo3: {
        fontFamily: 'nunitoRegular',
        fontSize: 13
      },
      botaoFiltrarEOrdenarProdutos: {
        fontFamily: 'nunitoRegular',
        fontSize: 12
      },
      descricaoCampoDePreenchimento: {
        fontFamily: 'nunitoRegular',
        fontSize: 11
      },
      parcelas2: {
        fontFamily: 'nunitoRegular',
        fontSize: 10
      },
      tituloProdutosQueCombinam: {
        fontFamily: 'nunitoRegular',
        fontSize: 8
      }
    }
  });
  var Typography = exports.Typography = (0, _native.default)(_reactNative.Text)`
  ${_$$_REQUIRE(_dependencyMap[3]).color}
  ${_$$_REQUIRE(_dependencyMap[3]).typography}
  ${textVariants}
  ${_$$_REQUIRE(_dependencyMap[3]).fontSize}
`;
