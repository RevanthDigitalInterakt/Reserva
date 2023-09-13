import { CepResponse, postalCode } from '../config/postalCode';
import {
  instance,
  instance2,
  instance3,
  instance4,
  instance5,
  instance7,
} from '../config/vtexConfig';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';

const vtexConfig = instance;
const vtexConfig2 = instance2;
const vtexConfig3 = instance3;
const vtexConfig4 = instance4;
const vtexConfig5 = instance5;
const vtexConfig7 = instance7;

const CreateCart = async () => {
  // cria o carrinho
  // retorna um payload gigante pra ser preenchido de acordo.
  const response = await vtexConfig.get('/checkout/pub/orderForm/?sc=4');
  return response;
};

const RestoreData = async (id: string) => {
  const response = await vtexConfig.get(`checkout/pub/orderform/${id}?sc=4`);
  return response;
};

const UpdateItemToCart = async (
  orderFormId: string | undefined,
  quantity: number,
  id: string,
  seller: string,
  index: number,
  hasBundleItems = false,
) => {
  const response = await vtexConfig.post(
    `/checkout/pub/orderForm/${orderFormId}/items/update?sc=4`,
    {
      noSplitItem: false,
      orderItems: [
        {
          hasBundleItems,
          index,
          quantity,
          id,
          seller,
        },
      ],
    },
  );

  // o retorno é o proprio carrinho com todos os itens
  return response;
};

const AddItemToCart = async (
  orderFormId: string | undefined,
  quantity: number,
  id: string,
  seller: string,
) => {
  const response = await vtexConfig.post(
    `/checkout/pub/orderForm/${orderFormId}/items?sc=4`,
    {
      // modificar esse item de acordo com o modelo do carrinho
      orderItems: [
        {
          quantity,
          id,
          seller,
        },
      ],
    },
  );

  // o retorno é o proprio carrinho com todos os itens
  return response;
};

const RestoreCart = async (orderFormId: string | undefined) => {
  try {
    const response = await vtexConfig.get(
      `/checkout/pub/orderForm/${orderFormId}?sc=4&${new Date().getTime()}=cache`,
    );

    return response;
  } catch (error) {
    ExceptionProvider.captureException(error);

    return null;
  }
};

const RemoveItemFromCart = async (
  orderFormId: string | undefined,
  id: string,
  index: number,
  seller: string,
  quantity: number,
) => {
  const response = await vtexConfig.post(
    `/checkout/pub/orderForm/${orderFormId}/items/update?sc=4`,
    {
      // modificar esse item de acordo com o modelo do carrinho
      orderItems: [
        {
          seller,
          id,
          quantity,
          index,
        },
      ],
    },
  );

  // o retorno é o proprio carrinho com todos os itens
  return response;
};

const AddAddressToCart = async (orderFormId: any, address: any) => {
  // APENAS adiciona endereço ao carrinho(orderForm)
  const { data } = await vtexConfig.post(
    `/checkout/pub/orderForm/${orderFormId}/attachments/shippingData?sc=4`,
    address,
  );

  return data;
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

const AddCustomerToOrder = async (
  orderFormId: string | undefined,
  customer: any,
) => {
  try {
    const { data } = await vtexConfig.post(
      `/checkout/pub/orderForm/${orderFormId}/attachments/clientProfileData`,
      { ...customer },
    );

    return data;
  } catch (err) {
    ExceptionProvider.captureException(err);
  }
};

const CepVerifyPostalCode = async (cep: string) => {
  try {
    const { data } = await postalCode.get(cep);
    return data;
  } catch (err) {
    ExceptionProvider.captureException(err);
    return { errors: err } as CepResponse;
  }
};

const addToCoupon = async (orderFormId: string | undefined, coupon: string) => {
  const response = await vtexConfig2.post(
    `/checkout/pub/orderForm/${orderFormId}/coupons`,
    {
      text: coupon,
    },
  );
  return response;
};

const removeCouponToOder = async (
  orderFormId: string | undefined,
  coupon: string,
) => {
  const response = await vtexConfig2.post(
    `/checkout/pub/orderForm/${orderFormId}/coupons`,
    {
      text: coupon,
    },
  );
  return response;
};

const removeSellerCouponToOder = async (
  orderFormId: string | undefined,
  marketingData: any,
) => {
  const response = await vtexConfig2.post(
    `/checkout/pub/orderForm/${orderFormId}/attachments/marketingData`,
    marketingData,
  );
  return response;
};

// reset user checkout
const ResetUserCheckout = async (orderFormId?: string) => {
  const response = await vtexConfig3.get(
    `/checkout/changeToAnonymousUser/${orderFormId}`,
  );
  return response;
};

const SendUserEmail = async (email?: string) => {
  const response = await vtexConfig4.get(
    `/contactlist/${email}/true/newsletter/reserva`,
  );
  return response;
};
const ConvertZipCode = async (postalCode?: string) => {
  const response = await vtexConfig3.get(
    `/api/checkout/pub/postal-code/BRA/${postalCode}`,
  );
  return response;
};

const Tracking = async (cookie: string, order?: string) => {
  const response = await vtexConfig5.get(`/oms/user/orders/${order}`, {
    headers: {
      Cookie: cookie,
    },
  });
  return response;
};
const PickupPoint = async (longitude: string, latitude: string) => {
  const response = await instance2.get(
    `/checkout/pub/pickup-points?geoCoordinates=${longitude};${latitude}`,
  );
  return response;
};

const Orders = async (page: string) => {
  const response = await instance2.get(`/oms/user/orders/?page=${page}`, {
    headers: {
      'X-VTEX-API-APPKEY': '',
    },
  });
  return response;
};

const OrderDetail = async (orderId: string) => {
  const response = await instance2.get(`/oms/user/orders/${orderId}`, {
    headers: {
      'X-VTEX-API-APPKEY': '',
    },
  });
  return response;
};

const SearchNewOrders = async (page: string, email: string, cookie: string) => {
  const response = await instance.get(
    `oms/user/orders/?page=${page}&per_page=20&includeProfileLastPurchases=true`,
    {
      headers: {
        cookie,
      },
    },
  );
  return response;
};

const SearchNewOrderDetail = async (
  orderId: string,
  email: string,
  cookie: string,
) => {
  const response = await instance7.get(
    `/oms/user/orders/${orderId}?clientEmail=${email}`,
    {
      headers: {
        cookie,
      },
    },
  );
  return response;
};

const SetGiftSize = async (
  orderFormId?: string | undefined,
  giftId?: string | undefined,
  id?: string | undefined,
  seller?: string | undefined,
) => {
  const response = await instance7.post(
    `/checkout/pub/orderForm/${orderFormId}/selectable-gifts/${giftId}`,
    {
      id: giftId,
      selectedGifts: [
        {
          id,
          seller,
          index: 0,
        },
      ],
      expectedOrderFormSections: [
        'items',
        'totalizers',
        'clientProfileData',
        'shippingData',
        'paymentData',
        'sellers',
        'messages',
        'marketingData',
        'clientPreferencesData',
        'storePreferencesData',
        'giftRegistryData',
        'ratesAndBenefitsData',
        'openTextField',
        'commercialConditionData',
        'customData',
      ],
    },
  );
  return response;
};

export {
  CreateCart,
  RestoreData,
  CepVerifyPostalCode,
  UpdateItemToCart,
  AddItemToCart,
  AddAddressToCart,
  GetPurchaseData,
  AddCustomerToOrder,
  RemoveItemFromCart,
  addToCoupon,
  removeCouponToOder,
  removeSellerCouponToOder,
  ResetUserCheckout,
  SendUserEmail,
  ConvertZipCode,
  Tracking,
  PickupPoint,
  Orders,
  SearchNewOrders,
  SearchNewOrderDetail,
  OrderDetail,
  SetGiftSize,
  RestoreCart,
};
