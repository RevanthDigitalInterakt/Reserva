  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createTokenExpireDate = createTokenExpireDate;
  function createTokenExpireDate() {
    var date = new Date();
    date.setHours(date.getHours() + 12);
    return date.getTime();
  }
