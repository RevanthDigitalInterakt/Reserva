  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useRemoteConfig = exports.syncRemoteConfig = exports.defaults = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var defaults = exports.defaults = {
    call_center_number: 552136092550,
    show_new_bag: false,
    pdp_show_gift_card: false,
    show_new_bag_tester: true,
    pdp_button_add_bag: '#11AB6B',
    show_roulet: false,
    sale_off_tag: false,
    show_pdc_thumb_color: false,
    cashback_in_store: false,
    balance_cashback_in_app: false,
    should_redirect_to_checkout: false,
    EMAIL_TESTERS: [],
    appName: 'My App',
    appVersion: '1.0.0',
    primelp_terms_search: 'prime',
    show_prime: false,
    show_prime_tester: false,
    show_new_header: false,
    show_new_header_tester: true,
    show_price_prime_pdp: false,
    show_price_prime_pdc: false,
    pdp_show_video: false,
    pdp_show_video_tester: false,
    regionalization: false,
    installments_prime: 'show_prime_installments',
    show_new_address: false,
    show_new_address_tester: true,
    show_new_address_list: false,
    show_new_address_list_tester: true,
    show_new_login: false,
    show_new_login_tester: true,
    show_new_home: false,
    show_on_smart_hint: false,
    show_item_price: false,
    show_item_price_tester: true,
    show_add_zip_code_delivery: false,
    show_add_zip_code_delivery_tester: true,
    show_user_feedback_form: 'none',
    show_shelf: false,
    show_home_commercial_banner: false,
    show_onep5p_bag: false,
    show_onep5p_home: false,
    show_onep5p_menu: false,
    show_onep5p_pdp: false,
    show_kitlook: false,
    add_to_bag_button_is_fixed: false,
    count_down_position: 'A',
    creditCardPaymentDescription: '10x sem juros no cartão, comparcela mínima de R$ 60',
    giftCardPaymentDescription: 'Cartões de Presente Pré-pagos',
    nubankPaymentDescription: 'Em até 24x',
    pixPaymentDescription: 'Pague à vista ou até em 4x sem juros.',
    show_button_see_bag: false,
    show_abandoned_cart: false,
    show_prime_discount: false,
    show_return_policy: false,
    show_doris_button: false,
    show_webview_facavc: false,
    show_buttons_pdp_facavc: false,
    show_label_facavc: false,
    new_offers_page: false,
    new_offers_page_tester: false,
    show_pdc_kit_look: false
  };
  var FIVE_MINUTES_IN_MS = 300000;
  var FIVE_SECONDS_IN_MS = 5000;
  var useRemoteConfig = exports.useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[2]).create)(function (set, getState) {
    return {
      initialized: false,
      instance: undefined,
      fetchInitialData: function () {
        var _fetchInitialData = (0, _asyncToGenerator2.default)(function* (remoteConfig) {
          try {
            var state = getState();
            if (state.initialized) return set(state);
            yield remoteConfig.setDefaults(defaults);
            yield remoteConfig.setConfigSettings({
              minimumFetchIntervalMillis: FIVE_MINUTES_IN_MS,
              fetchTimeMillis: FIVE_SECONDS_IN_MS
            });
            yield remoteConfig.fetchAndActivate();
            return set({
              initialized: true,
              instance: remoteConfig
            });
          } catch (err) {
            _$$_REQUIRE(_dependencyMap[3]).ExceptionProvider.captureException(err, {
              message: 'Error useRemoteConfig()'
            });
            return set({
              initialized: true,
              instance: remoteConfig
            });
          }
        });
        function fetchInitialData(_x) {
          return _fetchInitialData.apply(this, arguments);
        }
        return fetchInitialData;
      }(),
      getBoolean: function getBoolean(key) {
        var _getState$instance;
        return ((_getState$instance = getState().instance) == null ? undefined : _getState$instance.getBoolean(key)) || defaults[key];
      },
      getString: function getString(key) {
        var _getState$instance2;
        return ((_getState$instance2 = getState().instance) == null ? undefined : _getState$instance2.getString(key)) || defaults[key];
      },
      getNumber: function getNumber(key) {
        var _getState$instance3;
        return ((_getState$instance3 = getState().instance) == null ? undefined : _getState$instance3.getNumber(key)) || defaults[key];
      },
      getObject: function getObject(key) {
        try {
          var _getState$instance4;
          var value = ((_getState$instance4 = getState().instance) == null ? undefined : _getState$instance4.getString(key)) || defaults[key];
          return typeof value === 'string' ? JSON.parse(value) : value;
        } catch (err) {
          return defaults[key];
        }
      }
    };
  });
  var syncRemoteConfig = exports.syncRemoteConfig = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)(function* () {
      if (!useRemoteConfig.getState().initialized) {
        yield new Promise(function (res, _) {
          useRemoteConfig.subscribe(function (cb) {
            return res(cb.initialized);
          });
          setTimeout(function () {
            return res(null);
          }, FIVE_MINUTES_IN_MS);
        });
      }
    });
    return function syncRemoteConfig() {
      return _ref.apply(this, arguments);
    };
  }();
