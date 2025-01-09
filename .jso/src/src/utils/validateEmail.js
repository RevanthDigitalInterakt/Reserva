  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.validateEmail = validateEmail;
  var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;
  function validateEmail(email) {
    return (email || '').match(emailRegex);
  }
