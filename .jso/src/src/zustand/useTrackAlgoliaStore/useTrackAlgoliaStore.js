  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useTrackClickAlgoliaStore = exports.trackClickAlgoliaStore = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var trackClickAlgoliaStore = exports.trackClickAlgoliaStore = (0, _$$_REQUIRE(_dependencyMap[3]).create)(function (_, getState) {
    return {
      sessionId: (0, _$$_REQUIRE(_dependencyMap[4]).v4)(),
      onTrack: function () {
        var _onTrack = (0, _asyncToGenerator2.default)(function* (_ref) {
          var typeEvent = _ref.typeEvent,
            nameEvent = _ref.nameEvent,
            sku = _ref.sku,
            subTypeEvent = _ref.subTypeEvent,
            dataObject = _ref.dataObject,
            totalPrice = _ref.totalPrice,
            queryID = _ref.queryID,
            positions = _ref.positions,
            price = _ref.price;
          var user = yield _asyncStorage.default.getItem('@Dito:anonymousID');
          var variables = {
            input: Object.assign({
              authenticatedUserToken: user || '',
              userToken: getState().sessionId,
              index: _$$_REQUIRE(_dependencyMap[5]).TrackEventIndexEnum.Default,
              eventType: typeEvent,
              eventName: nameEvent
            }, subTypeEvent && {
              eventSubtype: subTypeEvent
            }, dataObject && {
              currency: 'BRL',
              objectData: dataObject,
              value: totalPrice
            }, sku && {
              objectIDs: sku
            }, positions && {
              positions: positions
            }, queryID && {
              queryID: queryID
            }, price && {
              value: price
            })
          };
          try {
            yield (0, _$$_REQUIRE(_dependencyMap[6]).getApolloClient)().mutate({
              mutation: _$$_REQUIRE(_dependencyMap[5]).TrackingDocument,
              context: {
                clientName: 'gateway'
              },
              variables: variables
            });
          } catch (error) {
            _$$_REQUIRE(_dependencyMap[7]).ExceptionProvider.captureException(error);
          }
        });
        function onTrack(_x) {
          return _onTrack.apply(this, arguments);
        }
        return onTrack;
      }()
    };
  });
  var useTrackClickAlgoliaStore = exports.useTrackClickAlgoliaStore = (0, _$$_REQUIRE(_dependencyMap[8]).createZustandStoreWithSelectors)(trackClickAlgoliaStore);
