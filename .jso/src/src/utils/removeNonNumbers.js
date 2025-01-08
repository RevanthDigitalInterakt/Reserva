  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.removeNonNumbers = removeNonNumbers;
  function removeNonNumbers(str) {
    return (str || '').replace(/[^0-9]/gi, '');
  }
