  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var address = function address(_ref) {
    var street = _ref.street,
      number = _ref.number,
      complement = _ref.complement,
      neighborhood = _ref.neighborhood,
      city = _ref.city,
      state = _ref.state;
    if (!complement) {
      return `${street}, ${number}, ${neighborhood}, ${city} - ${state}`;
    }
    return `${street}, ${number}, ${complement}, ${neighborhood}, ${city} - ${state}`;
  };
  var _default = exports.default = {
    address: address
  };
