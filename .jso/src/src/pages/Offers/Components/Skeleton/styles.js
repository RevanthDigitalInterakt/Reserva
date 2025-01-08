  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _configDeviceSizes = _$$_REQUIRE(_dependencyMap[1])(_$$_REQUIRE(_dependencyMap[2]));
  var styles = _reactNative.StyleSheet.create({
    mainCarousel: {
      height: 400,
      backgroundColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.SUBTITLE_GRAY
    },
    categoryTitle: {
      width: 250,
      height: 30,
      marginTop: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(20),
      borderRadius: 4,
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(12),
      backgroundColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.SUBTITLE_GRAY
    },
    containerCards: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginTop: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(10),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(14)
    },
    categoryCard: {
      width: _configDeviceSizes.default.DEVICE_WIDTH * 0.20,
      height: _configDeviceSizes.default.DEVICE_WIDTH * 0.20,
      borderRadius: 8,
      backgroundColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.SUBTITLE_GRAY
    },
    shelfTitle: {
      width: 250,
      height: 25,
      borderRadius: 4,
      marginTop: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(10),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(14),
      backgroundColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.SUBTITLE_GRAY
    },
    shelfSubtitle: {
      width: _configDeviceSizes.default.DEVICE_WIDTH * 0.92,
      height: 20,
      borderRadius: 4,
      marginTop: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(8),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(14),
      backgroundColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.SUBTITLE_GRAY
    },
    shelfBottomSubtitle: {
      width: _configDeviceSizes.default.DEVICE_WIDTH * 0.92,
      height: 25,
      borderRadius: 4,
      marginTop: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(25),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(14),
      backgroundColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.SUBTITLE_GRAY
    },
    containerProducts: {
      flexDirection: 'row',
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(14),
      gap: 8,
      marginTop: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(8)
    },
    productCard: {
      borderRadius: 10,
      width: 165,
      height: 270,
      backgroundColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.SUBTITLE_GRAY
    },
    productTitle: {
      width: 165,
      height: 12,
      borderRadius: 4,
      marginTop: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(5),
      backgroundColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.SUBTITLE_GRAY
    },
    productPrice: {
      width: 165,
      height: 12,
      borderRadius: 4,
      marginTop: (0, _$$_REQUIRE(_dependencyMap[4]).scale)(5),
      backgroundColor: _$$_REQUIRE(_dependencyMap[3]).COLORS.SUBTITLE_GRAY
    }
  });
  var _default = exports.default = styles;
