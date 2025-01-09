  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  function TitleFilter(_ref) {
    var title = _ref.title,
      showMore = _ref.showMore,
      setShowMore = _ref.setShowMore,
      showSeeMoreButton = _ref.showSeeMoreButton;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsxs)(_$$_REQUIRE(_dependencyMap[3]).Box, {
      paddingX: "micro",
      paddingY: "micro",
      justifyContent: "space-between",
      flexDirection: "row",
      testID: "com.usereserva:id/title_filter_modal_container",
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Typography, {
        testID: "com.usereserva:id/filter_modal_title",
        fontFamily: "reservaSerifRegular",
        fontSize: "16px",
        children: title
      }), !!showSeeMoreButton && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[5]).Button, {
        testID: "com.usereserva:id/title_filter_modal_button_ceeMore",
        onPress: function onPress() {
          return setShowMore(!showMore);
        },
        hitSlop: {
          left: 50,
          top: 15,
          bottom: 15
        },
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsxs)(_$$_REQUIRE(_dependencyMap[3]).Box, {
          testID: "com.usereserva:id/title_animation_filter_modal",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[4]).Typography, {
            fontFamily: "nunitoRegular",
            fontSize: "12px",
            children: "Ver mais"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[2]).jsx)(_$$_REQUIRE(_dependencyMap[6]).IconLegacy, {
            style: showMore ? {
              transform: [{
                rotate: '-90deg'
              }]
            } : {
              transform: [{
                translateY: 4
              }]
            },
            name: showMore ? 'ChevronRight' : 'ArrowDown',
            color: "preto",
            marginY: "quarck",
            marginX: "nano",
            size: 12
          })]
        })
      })]
    });
  }
  var _default = exports.default = TitleFilter;
