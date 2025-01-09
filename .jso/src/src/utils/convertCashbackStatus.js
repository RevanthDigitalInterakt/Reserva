  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.convertCashbackStatus = undefined;
  var convertCashbackStatus = exports.convertCashbackStatus = function convertCashbackStatus(status) {
    switch (status) {
      case 'fulfilled':
        return 'Finalizado';
      case 'available':
        return 'Finalizado';
      case 'expired':
        return 'Expirado';
      case 'canceled':
        return 'Cancelado';
    }
  };
