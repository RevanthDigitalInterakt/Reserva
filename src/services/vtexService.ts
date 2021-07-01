import vtexConfig from "../config/vtexConfig";

const CreateCart = async () => {
  // cria o carrinho
  // retorna um payload gigante pra ser preenchido de acordo.
  const response = await vtexConfig.get(`/checkout/pub/orderForm/?sc=3`);
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
  orderFormId: any,
  quantity: any,
  itemId: any,
  seller: any
) => {
  const response = await vtexConfig.post(
    `/checkout/pub/orderFom/${orderFormId}/items?sc=3
  `,
    {
      // modificar esse item de acordo com o modelo do carrinho
      orderItems: [
        {
          quantity: quantity,
          id: itemId,
          seller: seller,
        },
      ],
    }
  );

  // o retorno é o proprio carrinho com todos os itens
  return response;
};

const AddCouponToCart = async (orderFormId: any) => {
  const response = await vtexConfig.post(
    `/checkout/pub/orderForm/${orderFormId}/coupons
  `,
    {
      text: "testeapp",
      expectedOrderFormSections: [
        "items",
        "totalizers",
        "clientProfileData",
        "shippingData",
        "paymentData",
        "sellers",
        "messages",
        "marketingData",
        "clientPreferencesData",
        "storePreferencesData",
        "giftRegistryData",
        "ratesAndBenefitsData",
        "openTextField",
        "commercialConditionData",
        "customData",
      ],
    }
  );
  return response;
};

const RemoveCoupon = async (orderFormId: any) => {
  const response = await vtexConfig.post(
    `/checkout/pub/orderForm/${orderFormId}/coupons
  `,
    {
      text: "",
      expectedOrderFormSections: [
        "items",
        "totalizers",
        "clientProfileData",
        "shippingData",
        "paymentData",
        "sellers",
        "messages",
        "marketingData",
        "clientPreferencesData",
        "storePreferencesData",
        "giftRegistryData",
        "ratesAndBenefitsData",
        "openTextField",
        "commercialConditionData",
        "customData",
      ],
    }
  );
  return response;
};

const AddAddressToCart = async (orderFormId: any) => {
  //APENAS adiciona endereço ao carrinho(orderForm)
  const response = await vtexConfig.post(
    `/checkout/pub/orderFom/${orderFormId}/attachments/shippingData
  `,
    {
      selectedAddresses: [
        {
          // substituir pelos argumentos corretos
          addressType: "search",
          city: "São Paulo",
          country: "BRA",
          neighborhood: "Vila Tramontano",
          number: "213",
          postalCode: "05690-000",
          receiverName: "Vitor Hansen",
          state: "SP",
          street: "R. George Eastman",
        },
      ],
      clearAddressIfPostalCodeNotFound: false,
    }
  );

  // caso n tenha todos os dados apresentar apenas esses
  //   {
  //     "addressType": "search",
  //     "country": "BRA",
  //     "postalCode": "05690-000",
  //     "receiverName": "Vitor Hansen"
  // }

  return response;
};

const DeliveryType = async (orderFormId: any) => {
  // deve enviar o endereço junto do array de tipo de entrega de CADA produto. ai o vtex irá calcular as entregas possiveis.
  const response = await vtexConfig.post(
    `/checkout/pub/orderFom/${orderFormId}/attachments/shippingData
  `,
    {
      selectedAddresses: [
        {
          addressType: "search",
          receiverName: "Vitor Hansen",
          addressId: "6b55e28925b045fd8e967438f5413a2b",
          postalCode: "04571-011",
          city: "São Paulo",
          state: "SP",
          country: "BRA",
          street: "Avenida Engenheiro Luiz Carlos Berrini",
          number: "1493",
          neighborhood: "Itaim Bibi",
          complement: "",
          reference: null,
          geoCoordinates: [-46.694234, -23.609928],
        },
        // no caso da falta de todos os dados pode ser enviado apenas alguns igual no adc endereço acima.
      ],
      //logisticInfo é o tipo de entrega de CADA PRODUTO.
      logisticsInfo: [
        {
          itemIndex: 0,
          selectedDeliveryChannel: "pickup-in-point",
          selectedSla: "Scan & Go (XAR)",
        },
        {
          itemIndex: 1,
          selectedDeliveryChannel: "pickup-in-point",
          selectedSla: "Scan & Go (XAR)",
        },
      ],
    }
  );
  return response;
};

const GetPurchaseData = async (orderGroup: any) => {
  const response =
    await vtexConfig.get(`/checkout/pub/orders/order-group/${orderGroup}
  `);
  return response;
  // o orderGroup é pego quando chega na url orderPlaced(metodo checkURL na tela)
  // é retornado um array de pedidos. pq por padrão a vtex pode ter um mesmo place order para varias compras.
};

export {
  CreateCart,
  CreateSession,
  GetSession,
  AddItemToCart,
  AddCouponToCart,
  RemoveCoupon,
  AddAddressToCart,
  DeliveryType,
  GetPurchaseData,
};
