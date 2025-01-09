  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.trackClickStore = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var trackClickStore = exports.trackClickStore = (0, _$$_REQUIRE(_dependencyMap[3]).create)(function (_, getState) {
    return {
      sessionId: (0, _$$_REQUIRE(_dependencyMap[4]).v4)(),
      onSendTrackClick: function () {
        var _onSendTrackClick = (0, _asyncToGenerator2.default)(function* (data, navigation) {
          var variables = {
            input: {
              providers: [_$$_REQUIRE(_dependencyMap[5]).TrackProvidersEnum.Smarthint],
              userEmail: yield _asyncStorage.default.getItem('@Dito:anonymousID'),
              originIdentifier: navigation,
              pageIdentifier: data.identifier,
              pageType: navigation,
              session: getState().sessionId,
              locationRecs: 1,
              position: 1,
              productId: data.productId
            }
          };
          yield (0, _$$_REQUIRE(_dependencyMap[6]).getApolloClient)().mutate({
            mutation: _$$_REQUIRE(_dependencyMap[5]).TrackClickV2Document,
            context: {
              clientName: 'gateway'
            },
            variables: variables
          });
        });
        function onSendTrackClick(_x, _x2) {
          return _onSendTrackClick.apply(this, arguments);
        }
        return onSendTrackClick;
      }(),
      onTrackClick: function onTrackClick(data, identifier, type) {
        var trackStore = _$$_REQUIRE(_dependencyMap[7]).trackPageViewStore.getState();
        var updatedNavigation = trackStore.onUpdateNavigation(identifier, type);
        if (updatedNavigation.length === 0) return;
        var lastNavigation = updatedNavigation[updatedNavigation.length - 1];
        var _getState = getState(),
          onSendTrackClick = _getState.onSendTrackClick;
        if (updatedNavigation.length > 1) {
          var previousNavigation = updatedNavigation[updatedNavigation.length - 2];
          onSendTrackClick(data, previousNavigation);
        }
        onSendTrackClick(data, lastNavigation);
      }
    };
  });
