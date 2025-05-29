export const convertCashbackStatus = (status: string) => {
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
