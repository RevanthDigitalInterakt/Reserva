  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function MostSearchedWords(_ref) {
    var _data$mostSearchedWor;
    var onSelectTerm = _ref.onSelectTerm;
    var _useApolloFetchPolicy = (0, _$$_REQUIRE(_dependencyMap[2]).useApolloFetchPolicyStore)(['getFetchPolicyPerKey']),
      getFetchPolicyPerKey = _useApolloFetchPolicy.getFetchPolicyPerKey;
    var _useMostSearchedWords = (0, _$$_REQUIRE(_dependencyMap[3]).useMostSearchedWordsQuery)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: getFetchPolicyPerKey('mostSearchedWords')
      }),
      data = _useMostSearchedWords.data;
    if (!(data != null && (_data$mostSearchedWor = data.mostSearchedWords) != null && _data$mostSearchedWor.length)) return null;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsxs)(_$$_REQUIRE(_dependencyMap[5]).Box, {
      marginX: "nano",
      mt: "micro",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
          fontFamily: "nunitoBold",
          fontSize: 13,
          color: "neutroFrio2",
          children: "OS MAIS PROCURADOS"
        })
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
        flexDirection: "row",
        flexWrap: "wrap",
        children: data.mostSearchedWords.map(function (item) {
          return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Button, {
            onPress: function onPress() {
              return onSelectTerm(item);
            },
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Box, {
              bg: "divider",
              justifyContent: "center",
              px: "micro",
              height: 26,
              borderRadius: "pico",
              marginTop: "micro",
              mr: "micro",
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[4]).jsx)(_$$_REQUIRE(_dependencyMap[6]).Typography, {
                fontFamily: "nunitoRegular",
                fontSize: 13,
                children: item
              })
            })
          }, `search-suggestion-${item}`);
        })
      })]
    });
  }
  var _default = exports.default = MostSearchedWords;
