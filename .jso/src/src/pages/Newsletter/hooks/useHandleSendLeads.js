  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useHandleSendLeads;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _$$_REQUIRE(_dependencyMap[3]);
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _useAsyncStorageProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  function useHandleSendLeads() {
    var _useAsyncStorageProvi = (0, _useAsyncStorageProvider.default)(),
      getItem = _useAsyncStorageProvi.getItem,
      removeItem = _useAsyncStorageProvi.removeItem;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[7]).useAuthStore)(['profile']),
      profile = _useAuthStore.profile;
    var _useSendLeadsMutation = (0, _$$_REQUIRE(_dependencyMap[8]).useSendLeadsMutation)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: 'no-cache'
      }),
      _useSendLeadsMutation2 = (0, _slicedToArray2.default)(_useSendLeadsMutation, 1),
      sendLead = _useSendLeadsMutation2[0];
    var handleSendLeads = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (_ref) {
        var name = _ref.name,
          email = _ref.email,
          phone = _ref.phone;
        try {
          var _yield$getItem;
          var idCampaignStorage = (_yield$getItem = yield getItem('@Newsletter:IdCampaign')) != null ? _yield$getItem : 'Não informado';
          var _yield$sendLead = yield sendLead({
              variables: {
                idCampanha: idCampaignStorage,
                email: email,
                name: name,
                phone: phone
              }
            }),
            data = _yield$sendLead.data;
          if (data != null && data.sendLead) {
            var ditoId = profile != null && profile.email ? yield getItem('@Dito:userRef') : yield _asyncStorage.default.getItem('@Dito:anonymousID');
            _EventProvider.default.sendTrackEvent('newsletter', {
              id: ditoId,
              action: 'newsletter',
              data: {
                origem: 'app',
                id_campanha: idCampaignStorage,
                nome: name,
                email: email,
                telefone: phone
              }
            });
          }
        } catch (error) {
          _$$_REQUIRE(_dependencyMap[9]).ExceptionProvider.captureException(error);
        } finally {
          yield removeItem('@Newsletter:IdCampaign');
        }
      });
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), []);
    return {
      handleSendLeads: handleSendLeads
    };
  }
