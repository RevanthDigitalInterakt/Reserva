import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderHook } from '@testing-library/react-hooks';
import useAsyncStorageProvider from '../../hooks/useAsyncStorageProvider';
import EventProvider from '../EventProvider';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import { trackEventDitoStatusCart } from '../trackEventDitoStatusCart';
import { mockResponseItems } from '../../../__mocks__/mockResponseItem';
import type { OrderFormQuery } from '../../base/graphql/generated';

const spyAsyncStorage = jest.spyOn(AsyncStorage, 'getItem');
const spyEventProvider = jest.spyOn(EventProvider, 'sendTrackEvent');
const spyExceptionProvider = jest.spyOn(ExceptionProvider, 'captureException');

describe('trackEventDitoStatusCart', () => {
  beforeEach(() => {
    spyAsyncStorage.mockClear();
    spyEventProvider.mockClear();
    spyExceptionProvider.mockClear();
  });

  it('should send event with status "sim" when there are items in the cart', async () => {
    const { result } = renderHook(() => useAsyncStorageProvider());
    await result.current.setItem('@Dito:userRef', '03902d9c2961b437d2b6d247693b9cbe792ec5fc3216f');

    const items = mockResponseItems as OrderFormQuery['orderForm']['packageItems'][0]['items'];

    await trackEventDitoStatusCart({
      items,
      appTotalizers: {
        items: 0,
        discount: 0,
        delivery: 0,
        total: 100,
      },
      clientProfileData: { email: 'user@example.com' },
    });

    expect(EventProvider.sendTrackEvent).toHaveBeenCalledWith('status-carrinho', {
      id: '03902d9c2961b437d2b6d247693b9cbe792ec5fc3216f',
      action: 'status-carrinho',
      data: {
        origem: 'app',
        subtotal: 100,
        status: 'sim',
        id_produto: '41936,17201,38060',
        nome_categoria: 'Reserva,Bazar,Masculino,Camisas,Mini,Crianças,Coleção,Camisetas,Reversa,Feminino,Coleção,Blusas',
        nome_produto: 'CAMISA ML OFFICE ENXUTO LISTRA FINA ROSA CLARO - M,CAMISETA RESERVA MINI BRASA PICA-PAU BORDADO VERDE STONED - 02,BLUSA MALHA PENCE VERMELHO - P',
        marca: expect.any(String),
      },
    });
  });

  it('should send event with status "não" when there are no items in the cart', async () => {
    const { result } = renderHook(() => useAsyncStorageProvider());
    await result.current.setItem('@Dito:userRef', '03902d9c2961b437d2b6d247693b9cbe792ec5fc3216f');

    await trackEventDitoStatusCart({
      items: [],
      appTotalizers: {
        items: 0,
        discount: 0,
        delivery: 0,
        total: 0,
      },
      clientProfileData: { email: 'user@example.com' },
    });

    expect(EventProvider.sendTrackEvent).toHaveBeenCalledWith('status-carrinho', {
      id: '03902d9c2961b437d2b6d247693b9cbe792ec5fc3216f',
      action: 'status-carrinho',
      data: {
        origem: 'app',
        subtotal: 0,
        status: 'não',
      },
    });
  });

  it('should capture an exception and call ExceptionProvider.captureException in case of error', async () => {
    const captureExceptionSpy = spyExceptionProvider;

    ExceptionProvider.captureException(new Error('Something exception'), "Something Error");

    await trackEventDitoStatusCart({
      items: [],
      appTotalizers: {
        items: 0,
        discount: 0,
        delivery: 0,
        total: 0,
      },
      clientProfileData: {},
    });

    expect(captureExceptionSpy).toHaveBeenCalled();
    expect(ExceptionProvider.captureException).toHaveBeenCalledWith(expect.any(Error));
  });
});
