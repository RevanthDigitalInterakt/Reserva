  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BlockedRouletDescription = BlockedRouletDescription;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _styles = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function BlockedRouletDescription(_ref) {
    var onPress = _ref.onPress;
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[4]).useBagStore)(['rouletCoupon']),
      rouletCoupon = _useBagStore.rouletCoupon;
    var dateFromTimestamp = (0, _$$_REQUIRE(_dependencyMap[5]).parseISO)(rouletCoupon.timestamp);
    var dateAfter30Minutes = (0, _$$_REQUIRE(_dependencyMap[5]).addMinutes)(dateFromTimestamp, 30);
    var nowUTC = (0, _$$_REQUIRE(_dependencyMap[6]).utcToZonedTime)(new Date(), 'America/Sao_Paulo');
    var timeToUnblockInMinutes = Math.floor((dateAfter30Minutes.getTime() - nowUTC.getTime()) / 1000 / 30);
    var timeToUnblockInSeconds = Math.floor((dateAfter30Minutes.getTime() - nowUTC.getTime()) / 1000) % 30;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.Text, {
        style: _styles.default.normalDescription,
        children: ["Quer outra rodada na roleta de benef\xEDcios da Reserva? Contagem regressiva:", /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.Text, {
          style: _styles.default.boldDescription,
          children: [' ', timeToUnblockInMinutes.toString().padStart(2, '0'), ":", timeToUnblockInSeconds.toString().padStart(2, '0'), ' ', timeToUnblockInMinutes < 1 ? 'segundos' : 'minutos', "!"]
        }), ' ', "Depois disso, \xE9 s\xF3 usar um novo e-mail e voc\xEA estar\xE1 pronto para girar novamente. A sorte est\xE1 a caminho!"]
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.TouchableOpacity, {
        style: _styles.default.button,
        onPress: onPress,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.Text, {
          style: _styles.default.buttonText,
          children: "CONTINUAR COMPRANDO"
        })
      })]
    });
  }
