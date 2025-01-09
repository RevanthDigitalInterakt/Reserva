  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var prefix = 'com.usereserva:id/';
  var testProps = function testProps(value) {
    var testID = (value || '').startsWith(prefix) ? value : `${prefix}${value}`;
    return {
      testID: testID,
      accessibilityLabel: testID
    };
  };
  var _default = exports.default = testProps;
