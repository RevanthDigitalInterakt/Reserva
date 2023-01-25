import { act } from 'react-test-renderer';
import axios from 'axios';
import Config from 'react-native-config';
import { getOrderFormIdByRon } from './RonRedirectToBag';

const orderFormId = '62731fbb53a84f08a8d228a3fbbbf088';

jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  get: jest.fn((url) => {
    if (url.includes('widu')) {
      return {
        data: { destinyLink: `https://www.usereserva.com/checkout/?orderFormId=${orderFormId}#/cart` },
      };
    }

    if (url.includes('usereserva.io')) {
      return {
        request: { responseURL: 'https://vercel.usereserva.io/7q999r6b5q7' },
      };
    }

    return null;
  }),
}));

describe('RonRedirectToBag', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('must load vercel response and retrieve orderFormId', async () => {
    await act(async () => {
      const result = await getOrderFormIdByRon('kzpOBLIWVKYE');

      expect(axios.get).toHaveBeenCalledWith('https://usereserva.io/kzpOBLIWVKYE');
      expect(axios.get).toHaveBeenCalledWith('https://widu-bot-api.usenow.com.br/link/7q999r6b5q7');
      expect(axios.get).toHaveBeenCalledWith(`${Config.URL_BASE3}checkout/pub/orderForm/${orderFormId}?sc=4`);

      expect(axios.get).toHaveBeenCalledTimes(3);

      expect(result).toBe(orderFormId);
    });
  });
});
