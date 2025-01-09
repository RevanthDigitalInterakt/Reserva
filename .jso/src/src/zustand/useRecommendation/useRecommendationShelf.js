  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var useRecommendationShelf = (0, _$$_REQUIRE(_dependencyMap[2]).create)(function () {
    return {
      onSearchShelf: function () {
        var _onSearchShelf = (0, _asyncToGenerator2.default)(function* (user) {
          try {
            var client = (0, _$$_REQUIRE(_dependencyMap[3]).getApolloClient)();
            var _yield$client$query = yield client.query({
                context: {
                  clientName: 'gateway'
                },
                query: _$$_REQUIRE(_dependencyMap[4]).RecommendationShelfDocument,
                variables: {
                  input: {
                    providers: [_$$_REQUIRE(_dependencyMap[4]).TrackProvidersEnum.Smarthint],
                    userIdentifier: user,
                    channel: [_$$_REQUIRE(_dependencyMap[4]).SmarthintShelfChannelEnum.App],
                    pageType: _$$_REQUIRE(_dependencyMap[4]).TrackPageTypeEnum.Home,
                    position: 1
                  }
                },
                fetchPolicy: 'no-cache'
              }),
              data = _yield$client$query.data;
            return [data.recommendationShelf];
          } catch (e) {
            return [];
          }
        });
        function onSearchShelf(_x) {
          return _onSearchShelf.apply(this, arguments);
        }
        return onSearchShelf;
      }()
    };
  });
  var _default = exports.default = useRecommendationShelf;
