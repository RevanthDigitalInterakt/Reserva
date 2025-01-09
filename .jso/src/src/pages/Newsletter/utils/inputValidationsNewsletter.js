  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.phoneNumberSchema = exports.nameSchema = exports.emailSchema = undefined;
  var Yup = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var FeedbackMessageEnum = /*#__PURE__*/function (FeedbackMessageEnum) {
    FeedbackMessageEnum["MIN_INPUT_SIZE_2"] = "Minimo de 2 caracterers para esse campo";
    FeedbackMessageEnum["MIN_INPUT_SIZE_12"] = "O telefone deve ter mais ou igual a 11 n\xFAmeros";
    FeedbackMessageEnum["MAX_INPUT_SIZE_30"] = "M\xE1ximo de 30 caracterers para esse campo";
    FeedbackMessageEnum["REQUIRED_FULL_NAME"] = "Insira um nome";
    FeedbackMessageEnum["REQUIRED_EMAIL"] = "Insira seu e-mail";
    FeedbackMessageEnum["VALID_EMAIL"] = "Insira um e-mail v\xE1lido";
    FeedbackMessageEnum["PHONE_NUMBER"] = "Preencha seu telefone com: (DDD) telefone";
    return FeedbackMessageEnum;
  }(FeedbackMessageEnum || {});
  var nameSchema = exports.nameSchema = Yup.string().min(4, FeedbackMessageEnum.MIN_INPUT_SIZE_2).max(30, FeedbackMessageEnum.MAX_INPUT_SIZE_30).required(FeedbackMessageEnum.REQUIRED_FULL_NAME);
  var emailSchema = exports.emailSchema = Yup.string().email(FeedbackMessageEnum.VALID_EMAIL).required(FeedbackMessageEnum.REQUIRED_EMAIL);
  var phoneNumberSchema = exports.phoneNumberSchema = Yup.string().min(11, FeedbackMessageEnum.MIN_INPUT_SIZE_12).required(FeedbackMessageEnum.PHONE_NUMBER);
