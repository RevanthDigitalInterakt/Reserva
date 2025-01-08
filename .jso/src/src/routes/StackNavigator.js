  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MainStack = undefined;
  exports.MainStackScreen = MainStackScreen;
  var _toConsumableArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _CallCenter = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _NewBag = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _EditProfile = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _PrimeLP = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _PageOneP5P = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _RonRedirectToBag = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _Search = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _WebviewCheckout = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  var _ZipCodeDelivery = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[11]));
  var _WebViewDoris = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[12]));
  var _WebViewFacaVoce = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[13]));
  var _Newsletter = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[14]));
  var _PageHelpCenter = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[15]));
  var _Exchange = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[16]));
  var _HelpCenter = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[17]));
  var _PrivacyPolicy = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[18]));
  var flows = [].concat((0, _toConsumableArray2.default)(_$$_REQUIRE(_dependencyMap[19]).AddressFlow), (0, _toConsumableArray2.default)(_$$_REQUIRE(_dependencyMap[19]).ForgotFlow), (0, _toConsumableArray2.default)(_$$_REQUIRE(_dependencyMap[19]).OrderFlow), (0, _toConsumableArray2.default)(_$$_REQUIRE(_dependencyMap[19]).LoginFlow), (0, _toConsumableArray2.default)(_$$_REQUIRE(_dependencyMap[19]).ProductFlow), (0, _toConsumableArray2.default)(_$$_REQUIRE(_dependencyMap[20]).MyCreditsRoutes), (0, _toConsumableArray2.default)(_$$_REQUIRE(_dependencyMap[19]).RegisterFlow), (0, _toConsumableArray2.default)(_$$_REQUIRE(_dependencyMap[21]).MyCashbackRoutes));
  var MainStack = exports.MainStack = (0, _$$_REQUIRE(_dependencyMap[22]).createStackNavigator)();
  function MainStackScreen() {
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsxs)(MainStack.Navigator, {
      detachInactiveScreens: true,
      screenOptions: {
        headerShown: false
      },
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "HomeTabs",
        component: _$$_REQUIRE(_dependencyMap[24]).HomeTabs
      }), flows.map(function (flow) {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
          name: flow.name,
          component: flow.component,
          initialParams: flow.initialParams
        }, `${flow.name}`);
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "ChangeRegionalization",
        component: _$$_REQUIRE(_dependencyMap[25]).ChangeRegionalization
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "SearchMenu",
        component: _Search.default
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "CEPList",
        component: _$$_REQUIRE(_dependencyMap[26]).CEPList
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "RonRedirectToBag",
        component: _RonRedirectToBag.default
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "AsyncDeepLink",
        component: _$$_REQUIRE(_dependencyMap[27]).AsyncDeepLinkScreenLoading
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "BagScreen",
        component: _NewBag.default,
        initialParams: {
          isProfileComplete: false
        }
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "ZipCodeDelivery",
        component: _ZipCodeDelivery.default
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "Checkout",
        component: _WebviewCheckout.default
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "Doris",
        component: _WebViewDoris.default
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "FacaVc",
        component: _WebViewFacaVoce.default
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "Cashback",
        component: _$$_REQUIRE(_dependencyMap[28]).Cashback
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "Credits",
        component: _$$_REQUIRE(_dependencyMap[29]).Credits
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "EditProfile",
        component: _EditProfile.default
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "EditPassword",
        component: _$$_REQUIRE(_dependencyMap[30]).EditPassword
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "AccountDeletedSuccessfully",
        component: _$$_REQUIRE(_dependencyMap[31]).AccountDeletedSuccessfully
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "CallCenter",
        component: _CallCenter.default
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "WebviewZendesk",
        component: _$$_REQUIRE(_dependencyMap[32]).WebviewZendesk
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "PrimeLP",
        component: _PrimeLP.default
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "PageOneP5P",
        component: _PageOneP5P.default
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "Newsletter",
        component: _Newsletter.default
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "HelpCenter",
        component: _HelpCenter.default
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "PageHelpCenter",
        component: _PageHelpCenter.default
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "Exchange",
        component: _Exchange.default
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[23]).jsx)(MainStack.Screen, {
        name: "PrivacyPolicy",
        component: _PrivacyPolicy.default
      })]
    });
  }
