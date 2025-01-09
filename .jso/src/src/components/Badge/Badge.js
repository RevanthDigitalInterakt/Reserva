  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Badge = Badge;
  exports.BadgeRound = BadgeRound;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _native = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var BadgeRoundComponent = _native.default.View`
  background-color: rgb(237, 27, 36);
  border-radius: 13px;
  padding: 2px 7px;
  margin-left: 10px;
  `;
  var BadgeTextComponent = _native.default.Text`
  color: white;
  font-size: 12px;
  font-weight: bold;
`;
  function Badge(_ref) {
    var count = _ref.count;
    return count >= 0 ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
      borderRadius: "infinity",
      bg: "vermelhoAlerta",
      minWidth: 16,
      minHeight: 16,
      paddingX: 3,
      justifyContent: "center",
      alignItems: "center",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
        fontFamily: "reservaSerifBold",
        color: "white",
        fontSize: "12px",
        textAlign: "center",
        children: count
      })
    }) : null;
  }
  function BadgeRound(_ref2) {
    var text = _ref2.text;
    return text != null && text.length ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(BadgeRoundComponent, {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(BadgeTextComponent, {
        children: text
      })
    }) : null;
  }
