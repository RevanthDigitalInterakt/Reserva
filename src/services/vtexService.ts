import {
  instance,
  instance2,
  instance7,
} from '../config/vtexConfig';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';
import { IOrderId, type IOrder } from '../context/CartContext';

const vtexConfig = instance;
const vtexConfig7 = instance7;

const CreateCart = async () => {
  // cria o carrinho
  // retorna um payload gigante pra ser preenchido de acordo.
  const response = await vtexConfig.get('/checkout/pub/orderForm/?sc=4');
  return response;
};

const GetPurchaseData = async (orderGroup: any) => {
  try {
    const response = await vtexConfig7.get(
      `/checkout/pub/orders/order-group/${orderGroup}`,
    );
    return response;
  } catch (err) {
    ExceptionProvider.captureException(err);
  }
  // o orderGroup é pego quando chega na url orderPlaced(metodo checkURL na tela)
  // é retornado um array de pedidos. pq por padrão a vtex pode ter um mesmo
  // place order para varias compras.
};

const OrderDetail = async (orderId: string) => {
  const response = await instance2.get<IOrderId>(`/oms/user/orders/${orderId}`, {
    headers: {
      'X-VTEX-API-APPKEY': '',
    },
  });
  return response;
};

const SearchNewOrders = async (page: string, email: string, cookie: string) => {
  const response = await instance.get<{ list: IOrder[], paging: { total: number } }>(
    `oms/user/orders/?page=${page}&per_page=20&includeProfileLastPurchases=true`,
    {
      headers: {
        cookie,
      },
    },
  );
  return response;
};

export {
  CreateCart,
  GetPurchaseData,
  SearchNewOrders,
  OrderDetail,
};
