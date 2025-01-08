  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  function ProductDescription(_ref) {
    var title = _ref.title,
      description = _ref.description,
      testID = _ref.testID;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, Object.assign({}, (0, _testProps.default)(testID), {
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_$$_REQUIRE(_dependencyMap[4]).Box, {
        mt: "xxs",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
          fontFamily: "nunitoBold",
          fontSize: 15,
          children: title
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Box, {
          mt: "nano",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Typography, {
            fontFamily: "nunitoRegular",
            fontSize: 13,
            children: description
          })
        })]
      })
    }));
  }
  var _default = exports.default = ProductDescription;
