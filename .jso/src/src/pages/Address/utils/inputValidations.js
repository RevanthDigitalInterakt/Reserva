  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.streetSchema = exports.postalCodeSchema = exports.passwordSchema = exports.neighborhoodSchema = exports.fullNameSchema = exports.emailSchema = exports.complementSchema = exports.citySchema = exports.addressSurnameSchema = exports.addressStateSchema = exports.addressNumberSchema = undefined;
  var Yup = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var FeedbackMessageEnum = /*#__PURE__*/function (FeedbackMessageEnum) {
    FeedbackMessageEnum["MIN_INPUT_SIZE_2"] = "Minimo de 2 caracterers para esse campo";
    FeedbackMessageEnum["MIN_INPUT_SIZE_4"] = "Minimo de 4 caracterers para esse campo";
    FeedbackMessageEnum["MIN_INPUT_SIZE_8"] = "M\xEDnimo de 8 caracterers para esse campo";
    FeedbackMessageEnum["MAX_INPUT_SIZE_6"] = "M\xE1ximo de 6 caracterers para esse campo";
    FeedbackMessageEnum["MAX_INPUT_SIZE_9"] = "M\xE1ximo de 9 caracterers para esse campo";
    FeedbackMessageEnum["MAX_INPUT_SIZE_30"] = "M\xE1ximo de 30 caracterers para esse campo";
    FeedbackMessageEnum["MAX_INPUT_SIZE_100"] = "M\xE1ximo de 100 caracterers para esse campo";
    FeedbackMessageEnum["REQUIRED_ADDRESS_SURNAME"] = "Insira um apelido";
    FeedbackMessageEnum["REQUIRED_FULLNAME"] = "Insira um nome";
    FeedbackMessageEnum["REQUIRED_POSTALCODE"] = "Insira um CEP";
    FeedbackMessageEnum["INVALID_POSTALCODE"] = "CEP Inv\xE1lido";
    FeedbackMessageEnum["REQUIRED_STREET"] = "Insira uma Rua";
    FeedbackMessageEnum["REQUIRED_NEIGHBORHOOD"] = "Insira um Bairro";
    FeedbackMessageEnum["REQUIRED_CITY"] = "Insira um Cidade";
    FeedbackMessageEnum["REQUIRED_NUMBER"] = "Insira um n\xFAmero";
    FeedbackMessageEnum["REQUIRED_STATE"] = "Insira um Estado";
    FeedbackMessageEnum["REQUIRED_EMAIL"] = "Insira seu e-mail";
    FeedbackMessageEnum["REQUIRED_PASSWORD"] = "Insira sua senha";
    FeedbackMessageEnum["VALID_EMAIL"] = "Insira um e-mail v\xE1lido";
    return FeedbackMessageEnum;
  }(FeedbackMessageEnum || {});
  var addressSurnameSchema = exports.addressSurnameSchema = Yup.string().min(4, FeedbackMessageEnum.MIN_INPUT_SIZE_4).max(30, FeedbackMessageEnum.MAX_INPUT_SIZE_30).required(FeedbackMessageEnum.REQUIRED_ADDRESS_SURNAME);
  var fullNameSchema = exports.fullNameSchema = Yup.string().min(4, FeedbackMessageEnum.MIN_INPUT_SIZE_4).max(30, FeedbackMessageEnum.MAX_INPUT_SIZE_30).required(FeedbackMessageEnum.REQUIRED_FULLNAME);
  var addressNumberSchema = exports.addressNumberSchema = Yup.number().integer().positive().required(FeedbackMessageEnum.REQUIRED_NUMBER);
  var postalCodeSchema = exports.postalCodeSchema = Yup.string().min(0, FeedbackMessageEnum.MIN_INPUT_SIZE_8).max(9, FeedbackMessageEnum.MAX_INPUT_SIZE_9).required(FeedbackMessageEnum.REQUIRED_POSTALCODE);
  var streetSchema = exports.streetSchema = Yup.string().min(4, FeedbackMessageEnum.MIN_INPUT_SIZE_4).max(100, FeedbackMessageEnum.MAX_INPUT_SIZE_100).required(FeedbackMessageEnum.REQUIRED_STREET);
  var neighborhoodSchema = exports.neighborhoodSchema = Yup.string().min(4, FeedbackMessageEnum.MIN_INPUT_SIZE_4).max(100, FeedbackMessageEnum.MAX_INPUT_SIZE_100).required(FeedbackMessageEnum.REQUIRED_NEIGHBORHOOD);
  var complementSchema = exports.complementSchema = Yup.string().max(30, FeedbackMessageEnum.MAX_INPUT_SIZE_30);
  var addressStateSchema = exports.addressStateSchema = Yup.string().min(2, FeedbackMessageEnum.MIN_INPUT_SIZE_2).max(30, FeedbackMessageEnum.MAX_INPUT_SIZE_30).required(FeedbackMessageEnum.REQUIRED_STATE);
  var citySchema = exports.citySchema = Yup.string().min(2, FeedbackMessageEnum.MIN_INPUT_SIZE_2).max(30, FeedbackMessageEnum.MAX_INPUT_SIZE_30).required(FeedbackMessageEnum.REQUIRED_CITY);
  var emailSchema = exports.emailSchema = Yup.string().email(FeedbackMessageEnum.VALID_EMAIL).required(FeedbackMessageEnum.REQUIRED_EMAIL);
  var passwordSchema = exports.passwordSchema = Yup.string().required(FeedbackMessageEnum.REQUIRED_PASSWORD);
