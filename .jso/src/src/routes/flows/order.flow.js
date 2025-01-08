  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.OrderFlow = undefined;
  var _OrderCancel = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _OrderDetail = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _OrderList = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var OrderFlow = exports.OrderFlow = [{
    component: _OrderList.default,
    name: 'OrderList'
  }, {
    component: _OrderDetail.default,
    name: 'OrderDetail'
  }, {
    component: _OrderCancel.default,
    name: 'OrderCancel'
  }];
