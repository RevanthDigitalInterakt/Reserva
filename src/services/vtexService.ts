import { CepResponse } from './../config/brasilApi';
import { brasilApi } from '../config/brasilApi';
import { instance, instance2, instance3, instance4, instance5 } from '../config/vtexConfig';
import axios from 'axios';
const vtexConfig = instance;
const vtexConfig2 = instance2;
const vtexConfig3 = instance3;
const vtexConfig4 = instance4;
const vtexConfig5 = instance5;


const CreateCart = async () => {
  // cria o carrinho
  // retorna um payload gigante pra ser preenchido de acordo.
  const response = await vtexConfig.get(`/checkout/pub/orderForm/?sc=4`);
  return response;
};

const CreateSession = async (country: any, postalCode: any) => {
  // cria a sessao e retorna o token pra ser salvo e usado em outro canto.
  const response = await vtexConfig.post(`/sessions`, {
    Country: country,
    PostalCode: postalCode,
  });
  return response;
};

const GetSession = async () => {
  const response = await vtexConfig.get(`/sessions`);
  return response;
};

const AddItemToCart = async (
  orderFormId: string | undefined,
  quantity: number,
  id: string,
  seller: string
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
    }
  );

  // o retorno é o proprio carrinho com todos os itens
  return response;
};

const RemoveItemFromCart = async (
  orderFormId: string | undefined,
  id: string,
  index: number,
  seller: string,
  quantity: number
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
    }
  );

  // o retorno é o proprio carrinho com todos os itens
  return response;
};

const AddCouponToCart = async (orderFormId: any) => {
  const response = await vtexConfig.post(
    `/checkout/pub/orderForm/${orderFormId}/coupons?sc=4
  `,
    {
      text: 'testeapp',
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
    }
  );
  return response;
};

const RemoveCoupon = async (orderFormId: any) => {
  const response = await vtexConfig.post(
    `/checkout/pub/orderForm/${orderFormId}/coupons?sc=4
    `,
    {
      text: '',
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
    }
  );
  return response;
};

const AddAddressToCart = async (orderFormId: any, address: any) => {
  //APENAS adiciona endereço ao carrinho(orderForm)
  const { data } = await vtexConfig.post(
    `/checkout/pub/orderForm/${orderFormId}/attachments/shippingData?sc=4`,
    address
  );

  return data;
};

const DeliveryType = async (orderFormId: any) => {
  // deve enviar o endereço junto do array de tipo de entrega de CADA produto. ai o vtex irá calcular as entregas possiveis.
  const response = await vtexConfig.post(
    `/checkout/pub/orderFom/${orderFormId}/attachments/shippingData?sc=4
        `,
    {
      selectedAddresses: [
        {
          addressType: 'search',
          receiverName: 'Vitor Hansen',
          addressId: '6b55e28925b045fd8e967438f5413a2b',
          postalCode: '04571-011',
          city: 'São Paulo',
          state: 'SP',
          country: 'BRA',
          street: 'Avenida Engenheiro Luiz Carlos Berrini',
          number: '1493',
          neighborhood: 'Itaim Bibi',
          complement: '',
          reference: null,
          geoCoordinates: [-46.694234, -23.609928],
        },
        // no caso da falta de todos os dados pode ser enviado apenas alguns igual no adc endereço acima.
      ],
      //logisticInfo é o tipo de entrega de CADA PRODUTO.
      logisticsInfo: [
        {
          itemIndex: 0,
          selectedDeliveryChannel: 'pickup-in-point',
          selectedSla: 'Scan & Go (XAR)',
        },
        {
          itemIndex: 1,
          selectedDeliveryChannel: 'pickup-in-point',
          selectedSla: 'Scan & Go (XAR)',
        },
      ],
    }
  );
  return response;
};

const GetPurchaseData = async (orderGroup: any) => {
  const response = await vtexConfig.get(
    `/checkout/pub/orders/order-group/${orderGroup}?sc=4`
  );
  return response;
  // o orderGroup é pego quando chega na url orderPlaced(metodo checkURL na tela)
  // é retornado um array de pedidos. pq por padrão a vtex pode ter um mesmo place order para varias compras.
};

const ValidateProfile = async (
  email: string
) => {
  try {
    const { data } = await vtexConfig.get(`/checkout/pub/profiles/?email=${email}&sc=4`);
    return data;
  } catch (err) {
    console.log(err);
  }
}

const IdentifyCustomer = async (
  orderFormId: string | undefined,
  email: string
) => {
  try {
    const { data } = await vtexConfig.post(
      `/checkout/pub/orderForm/${orderFormId}/attachments/clientProfileData?sc=4`,
      { email }
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};

const AddCustomerToOrder = async (
  orderFormId: string | undefined,
  customer: any
) => {
  try {
    const { data } = await vtexConfig.post(
      `/checkout/pub/orderForm/${orderFormId}/attachments/clientProfileData`,
      { ...customer }
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};
const CepVerify = async (cep: string) => {
  try {
    const { data } = await brasilApi.get(`/cep/v2/${cep}`);
    return data;
  } catch (err) {
    console.log(err);
    return { errors: err } as CepResponse;
  }
};

const addToCoupon = async (
  orderFormId: string | undefined,
  coupon: string,
) => {
  const response = await vtexConfig2.post(
    `/checkout/pub/orderForm/${orderFormId}/coupons`,
    {
      text: coupon
    }
  );
  return response;
}

const removeCouponToOder = async (
  orderFormId: string | undefined,
  coupon: string,
) => {
  const response = await vtexConfig2.post(
    `/checkout/pub/orderForm/${orderFormId}/coupons`,
    {
      text: coupon
    }
  );
  return response;
}

const validateSellerCoupon = async (
  coupon: string,
) => {
  const response = await vtexConfig2.get(
    `/dataentities/VE/search?_fields=id,coupon,ativo,vendedor_apelido&_where=((coupon=${coupon}) AND (ativo=true))`);
  return response;
}

const addToSellerCoupon = async (
  orderFormId: string | undefined,
  marketingData: any,
) => {
  const response = await vtexConfig2.post(
    `/checkout/pub/orderForm/${orderFormId}/attachments/marketingData`, marketingData);
  return response;
}
const removeSellerCouponToOder = async (
  orderFormId: string | undefined,
  marketingData: any,
) => {
  const response = await vtexConfig2.post(
    `/checkout/pub/orderForm/${orderFormId}/attachments/marketingData`, marketingData);
  return response;
}


//reset user checkout
const ResetUserCheckout = async (
  orderFormId?: string,
) => {
  const response = await vtexConfig3.get(
    `/checkout/changeToAnonymousUser/${orderFormId}`);
  return response;
}

const SendUserEmail = async (
  email?: string,
) => {
  const response = await vtexConfig4.get(`/contactlist/${email}/true/newsletter/reserva`);
  return response;
}
const ConvertZipCode = async (
  postalCode?: string,
) => {
  const response = await vtexConfig3.get(`/api/checkout/pub/postal-code/BRA/${postalCode}`);
  return response;
}

const Tracking = async (
  cookie: string,
  order?: string,
) => {
  const response = await vtexConfig5.get(`/oms/user/orders/${order}`, {
    headers: {
      Cookie: cookie,
    }
  });
  return response;
}
const PickupPoint = async (
  longitude: string,
  latitude: string
) => {
  const response = await instance2.get(`/checkout/pub/pickup-points?geoCoordinates=${longitude};${latitude}`);
  return response;
}

const Orders = async (
  page: string
) => {
  const response = await instance2.get(`/oms/user/orders/?page=${page}`, {
    headers: {
      'X-VTEX-API-APPKEY': '',
    }
  });
  return response;
}
const OrderDetail = async (
  orderId: string
) => {
  const response = await instance2.get(`/oms/user/orders/${orderId}`, {
    headers: {
      'X-VTEX-API-APPKEY': '',
    }
  });
  return response;
}

export {
  CreateCart,
  CreateSession,
  GetSession,
  CepVerify,
  AddItemToCart,
  AddCouponToCart,
  RemoveCoupon,
  AddAddressToCart,
  DeliveryType,
  GetPurchaseData,
  ValidateProfile,
  IdentifyCustomer,
  AddCustomerToOrder,
  RemoveItemFromCart,
  addToCoupon,
  removeCouponToOder,
  validateSellerCoupon,
  addToSellerCoupon,
  removeSellerCouponToOder,
  ResetUserCheckout,
  SendUserEmail,
  ConvertZipCode,
  Tracking,
  PickupPoint,
  Orders,
  OrderDetail
};
