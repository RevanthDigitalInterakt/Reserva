  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getBrandByUrl = exports.BRANDS = undefined;
  var BRANDS = exports.BRANDS = {
    RESERVA: 'RESERVA,',
    RESERVA_GO: 'RESERVA GO,',
    RESERVA_MINI: 'RESERVA MINI,',
    REVERSA: 'REVERSA,',
    REVERSA_GO: 'REVERSA GO,',
    RESERVA_GO_MINI: 'RESERVA GO MINI,'
  };
  var getBrandByUrl = exports.getBrandByUrl = function getBrandByUrl(items) {
    var getCategoryUrl = function getCategoryUrl(item) {
      var _item$categoryTree, _item$categoryTree$;
      return item == null ? undefined : (_item$categoryTree = item.categoryTree) == null ? undefined : (_item$categoryTree$ = _item$categoryTree[0]) == null ? undefined : _item$categoryTree$.href;
    };
    var isReserva = function isReserva(url) {
      return !!url && url.includes('/reserva');
    };
    var isGoOrCalcados = function isGoOrCalcados(url) {
      return !!url && (url.includes('/go-reserva') || url.includes('/colecao-reserva/calcados'));
    };
    var isMiniOrCalcadosMini = function isMiniOrCalcadosMini(url) {
      return !!url && (url.includes('/mini') || url.includes('/colecao-mini/calcados'));
    };
    var isReversaOrFeminino = function isReversaOrFeminino(url) {
      return !!url && (url.includes('/reversa') || url.includes('/colecao-reversa') || url.includes('/Feminino'));
    };
    if ((0, _$$_REQUIRE(_dependencyMap[0]).isArray)(items)) {
      var _ref = items[0] || {},
        _categoryTree = _ref.categoryTree;
      var _url = getCategoryUrl({
        categoryTree: _categoryTree
      });
      switch (true) {
        case isReserva(_url):
          return BRANDS.RESERVA;
        case isGoOrCalcados(_url):
          return BRANDS.RESERVA_GO;
        case isMiniOrCalcadosMini(_url):
          return BRANDS.RESERVA_MINI;
        case isReversaOrFeminino(_url):
          return BRANDS.REVERSA;
        default:
          return BRANDS.RESERVA;
      }
    }
    var _ref2 = items || {},
      categoryTree = _ref2.categoryTree;
    var url = getCategoryUrl({
      categoryTree: categoryTree
    });
    switch (true) {
      case isReserva(url):
        return BRANDS.RESERVA;
      case isGoOrCalcados(url):
        return BRANDS.RESERVA_GO;
      case isMiniOrCalcadosMini(url):
        return BRANDS.RESERVA_MINI;
      case isReversaOrFeminino(url):
        return BRANDS.REVERSA;
      default:
        return BRANDS.RESERVA;
    }
  };
