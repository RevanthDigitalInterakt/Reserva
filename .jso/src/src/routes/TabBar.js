  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TabBar = TabBar;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function TabBar(_ref) {
    var state = _ref.state,
      navigation = _ref.navigation;
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[5]).useBagStore)(['actions', 'rouletCoupon']),
      actions = _useBagStore.actions,
      rouletCoupon = _useBagStore.rouletCoupon;
    var _onPress = /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* (_ref2, isFocused) {
        var key = _ref2.key,
          name = _ref2.name;
        if (name === 'Roulet') {
          _EventProvider.default.logEvent('click_na_roleta', {});
          if (rouletCoupon.timestamp) {
            var dateFromTimestamp = (0, _$$_REQUIRE(_dependencyMap[6]).parseISO)(rouletCoupon.timestamp);
            var dateAfter60Minutes = (0, _$$_REQUIRE(_dependencyMap[6]).addMinutes)(dateFromTimestamp, 60);
            var nowUTC = (0, _$$_REQUIRE(_dependencyMap[7]).utcToZonedTime)(new Date(), 'America/Sao_Paulo');
            var isBlocked = !(0, _$$_REQUIRE(_dependencyMap[6]).isAfter)(nowUTC, dateAfter60Minutes);
            if (isBlocked) {
              return actions.BLOCK_ROULET_COUPON();
            }
            actions.UNBLOCK_ROULET_COUPON();
          }
          actions.SET_ROULET_LOADING(true);
          actions.OPEN_ROULET();
        } else {
          actions.SET_ROULET_LOADING(false);
          actions.CLOSE_ROULET();
        }
        var event = navigation.emit({
          type: 'tabPress',
          target: key,
          canPreventDefault: true
        });
        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(name);
        }
      });
      return function onPress(_x, _x2) {
        return _ref3.apply(this, arguments);
      };
    }();
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[9]).Box, {
      flexDirection: "row",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[8]).jsx)(_$$_REQUIRE(_dependencyMap[10]).BottomBar, {
        children: state.routes.map(function (route, index) {
          var isFocused = state.index === index;
          var params = route.params;
          if (route.name === 'NewOffersPage') {
            return /*#__PURE__*/(0, _react.createElement)(_$$_REQUIRE(_dependencyMap[10]).BottomBarButton, Object.assign({}, (0, _testProps.default)(`com.usereserva:id/bottom-tab-perfil${(0, _$$_REQUIRE(_dependencyMap[11]).slugify)(params == null ? undefined : params.label)}`), {
              key: route.key,
              isSlected: isFocused,
              hidden: true,
              onPress: function onPress() {
                return _onPress(route, isFocused);
              },
              iconName: route.name === 'WishList' ? 'Heart' : route.name,
              label: (params == null ? undefined : params.label) || ''
            }));
          }
          return /*#__PURE__*/(0, _react.createElement)(_$$_REQUIRE(_dependencyMap[10]).BottomBarButton, Object.assign({}, (0, _testProps.default)(`com.usereserva:id/bottom-tab-perfil${(0, _$$_REQUIRE(_dependencyMap[11]).slugify)(params == null ? undefined : params.label)}`), {
            key: route.key,
            isSlected: isFocused,
            onPress: function onPress() {
              return _onPress(route, isFocused);
            },
            iconName: route.name === 'WishList' ? 'Heart' : route.name,
            label: (params == null ? undefined : params.label) || ''
          }));
        })
      })
    });
  }
