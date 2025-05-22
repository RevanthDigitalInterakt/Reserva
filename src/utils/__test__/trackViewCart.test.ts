import EventProvider from '../EventProvider';

describe('tracking event view cart firebase', () => {
  const trackEventSpy = jest.spyOn(EventProvider, 'logEvent');

  const itemMock = [
    {
      item_id: '0123456',
      item_category: 'RESERVA',
      item_name: 'CAMISETA ESTAMPADA SURF',
      item_variant: 'WHITE',
      price: 134,
      quantity: 1,
    },
  ];

  it('should call event', () => {
    EventProvider.logEvent('view_cart', {
      currency: 'BRL',
      items: itemMock,
      value: 134,
    });

    expect(trackEventSpy).toHaveBeenCalled();
  });
});
