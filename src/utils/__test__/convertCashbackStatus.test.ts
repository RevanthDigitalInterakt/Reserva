import { convertCashbackStatus } from '../convertCashbackStatus'; // Substitua 'yourModule' pelo nome do seu módulo

describe('convertCashbackStatus', () => {
  it('Should return "Finished" for "fulfilled" status', () => {
    expect(convertCashbackStatus('fulfilled')).toBe('Finalizado');
  });

  it('Should return "Finished" for "available" status', () => {
    expect(convertCashbackStatus('available')).toBe('Finalizado');
  });

  it('Should return "Expired" for "expired" status', () => {
    expect(convertCashbackStatus('expired')).toBe('Expirado');
  });

  it('Should return "Canceled" for "canceled" status', () => {
    expect(convertCashbackStatus('canceled')).toBe('Cancelado');
  });

  it('Should return undefined for an unknown status', () => {
    expect(convertCashbackStatus('unknown')).toBeUndefined();
  });
});
