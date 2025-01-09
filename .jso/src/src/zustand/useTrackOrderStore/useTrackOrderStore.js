  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useTrackOrderStore = exports.trackOrderStore = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var trackOrderStore = exports.trackOrderStore = (0, _$$_REQUIRE(_dependencyMap[2]).create)(function (_, getState) {
    return {
      sessionId: (0, _$$_REQUIRE(_dependencyMap[3]).v4)(),
      onTrack: function () {
        var _onTrack = (0, _asyncToGenerator2.default)(function* (orderData, userMail) {
          var variables = {
            input: {
              freight: orderData.paymentData[0].transactions[0].payments[0].installments,
              items: orderData.orderFormItems.map(function (item, index) {
                return {
                  name: item == null ? undefined : item.name,
                  productId: item == null ? undefined : item.productId,
                  quantity: item == null ? undefined : item.quantity,
                  sku: orderData.ids[index]
                };
              }),
              orderId: orderData == null ? undefined : orderData.orderId,
              session: getState().sessionId,
              providers: [_$$_REQUIRE(_dependencyMap[4]).TrackProvidersEnum.Smarthint],
              total: orderData == null ? undefined : orderData.orderValue,
              userEmail: userMail
            }
          };
          try {
            yield (0, _$$_REQUIRE(_dependencyMap[5]).getApolloClient)().mutate({
              mutation: _$$_REQUIRE(_dependencyMap[4]).TrackOrderDocument,
              context: {
                clientName: 'gateway'
              },
              variables: variables
            }).catch(function (err) {
              return _$$_REQUIRE(_dependencyMap[6]).ExceptionProvider.captureException(err);
            });
          } catch (error) {
            _$$_REQUIRE(_dependencyMap[6]).ExceptionProvider.captureException(error);
          }
        });
        function onTrack(_x, _x2) {
          return _onTrack.apply(this, arguments);
        }
        return onTrack;
      }()
    };
  });
  var useTrackOrderStore = exports.useTrackOrderStore = (0, _$$_REQUIRE(_dependencyMap[7]).createZustandStoreWithSelectors)(trackOrderStore);
