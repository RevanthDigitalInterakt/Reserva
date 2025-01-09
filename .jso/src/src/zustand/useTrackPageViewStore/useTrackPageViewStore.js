  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.trackPageViewStore = undefined;
  var _toConsumableArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var isDuplicateNavigation = function isDuplicateNavigation(navigation, identifier) {
    var _navigation;
    return ((_navigation = navigation[navigation.length - 1]) == null ? undefined : _navigation.identifier) === identifier;
  };
  var calculateElapsedTime = function calculateElapsedTime(item, baseTime) {
    return (baseTime.getTime() - item.date.getTime()) / 1000;
  };
  var getLastIdentifier = function getLastIdentifier(navigation) {
    var _navigation2;
    return ((_navigation2 = navigation[navigation.length - 1]) == null ? undefined : _navigation2.identifier) || '';
  };
  var trackPageViewStore = exports.trackPageViewStore = (0, _$$_REQUIRE(_dependencyMap[4]).create)(function (set, getState) {
    return {
      sessionId: (0, _$$_REQUIRE(_dependencyMap[5]).v4)(),
      navigation: [],
      onSendTrack: function () {
        var _onSendTrack = (0, _asyncToGenerator2.default)(function* (navigation, elapsedTime) {
          try {
            var userEmail = yield _asyncStorage.default.getItem('@Dito:anonymousID');
            var input = {
              elapsedTime: parseInt(`${elapsedTime || 0}`, 10),
              pageIdentifier: navigation.identifier,
              pageType: navigation.type,
              providers: [_$$_REQUIRE(_dependencyMap[6]).TrackProvidersEnum.Smarthint],
              session: getState().sessionId,
              originIdentifier: navigation.origin,
              userEmail: userEmail || '' // Garantir que userEmail não seja null
            };
            yield (0, _$$_REQUIRE(_dependencyMap[7]).getApolloClient)().mutate({
              mutation: _$$_REQUIRE(_dependencyMap[6]).TrackPageViewDocument,
              context: {
                clientName: 'gateway'
              },
              variables: {
                input: input
              }
            });
          } catch (error) {
            _$$_REQUIRE(_dependencyMap[8]).ExceptionProvider.captureException(error);
          }
        });
        function onSendTrack(_x, _x2) {
          return _onSendTrack.apply(this, arguments);
        }
        return onSendTrack;
      }(),
      onUpdateNavigation: function onUpdateNavigation(identifier, type) {
        var date = new Date();
        var _getState = getState(),
          navigationItems = _getState.navigation;
        if (isDuplicateNavigation(navigationItems, identifier)) return [];
        var updatedNavigation = [].concat((0, _toConsumableArray2.default)(navigationItems), [{
          identifier: identifier,
          date: date,
          type: type,
          origin: getLastIdentifier(navigationItems)
        }]);
        set(function () {
          return {
            navigation: updatedNavigation
          };
        });
        return updatedNavigation;
      },
      onTrackPageView: function () {
        var _onTrackPageView = (0, _asyncToGenerator2.default)(function* (identifier, type) {
          var updatedNavigation = getState().onUpdateNavigation(identifier, type);
          if (updatedNavigation.length === 0) return;
          var lastNavigation = updatedNavigation[updatedNavigation.length - 1];
          var _getState2 = getState(),
            onSendTrack = _getState2.onSendTrack;
          if (updatedNavigation.length > 1) {
            var previousNavigation = updatedNavigation[updatedNavigation.length - 2];
            onSendTrack(previousNavigation, calculateElapsedTime(previousNavigation, lastNavigation.date));
          }
          onSendTrack(lastNavigation);
        });
        function onTrackPageView(_x3, _x4) {
          return _onTrackPageView.apply(this, arguments);
        }
        return onTrackPageView;
      }()
    };
  });
