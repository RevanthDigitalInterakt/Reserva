import EventProvider from '../EventProvider';

describe('trackingOrderFormAddItem', () => {
  const trackEventSpy = jest.spyOn(EventProvider, 'sendTrackEvent');

  const quantityMock = 2;

  const priceMock = 250;

  const brandsMock = 'RESERVA';

  const ditoIdMock = '13292922780';

  it('should call event', () => {
    EventProvider.sendTrackEvent('acessou-carrinho', {
      id: ditoIdMock,
      action: 'acessou-carrinho',
      data: {
        quantidade: quantityMock,
        total: priceMock,
        marca: brandsMock,
        origem: 'app',
      },
    });
    expect(trackEventSpy).toHaveBeenCalled();
  });

  it('should call event with correct parameters', () => {
    expect(trackEventSpy).toHaveBeenCalledWith('acessou-carrinho', {
      action: 'acessou-carrinho',
      data:
        {
          marca: 'RESERVA', origem: 'app', quantidade: 2, total: 250,
        },
      id: '13292922780',
    });
  });
});
