import EventProvider from '../EventProvider';
import { defaultBrand } from '../defaultWBrand';

describe('trackingOrderFormAddItem', () => {
  const logEventSpy = jest.spyOn(EventProvider, 'logEvent');
  const trackEventSpy = jest.spyOn(EventProvider, 'sendTrackEvent');
  const productMock = {
    productTitle: 'POLO PIQUET PIMA ENXUTO PICA-PAU OURO BRANCO',
    itemColor: 'BRANCO',
    itemSize: 'GGG',
    isGift: false,
    isGiftable: true,
    imageSource: 'https://lojausereserva.vteximg.com.br/arquivos/ids/7620381/0072984014_01.jpg?v=638182011746130000',
    key: '433083-42900-42900-42900-42900-1-1-polo-piquet-pima-enxuto-pica-pau-ouro-branco-ggg-',
    isAssinaturaSimples: false,
    priceWithDiscount: 429,
    discountPercent: 0,
    discountApi: 0,
    showFirstPurchaseDiscountMessage: null,
    showTotalDiscountFirstPurchaseValue: null,
    productCategories: ['Reserva', 'Masculino', 'polos'],
    price: 42900,
    productId: '40909',
    id: '433083',
    listPrice: 42900,
    giftOfferingId: '424572',
    seller: '1',
    hasPrimeDiscount: false,
    skuName: 'BRANCO - GGG',
    uniqueId: 'AFD2FD50A56E4970B1DC28B112142738',
    isAddedAsGift: false,
    name: 'POLO PIQUET PIMA ENXUTO PICA-PAU OURO BRANCO - GGG',
    quantity: 1,
    disableCounter: false,
    sellingPrice: 42900,
    isPrimeSubscription: false,
    additionalInfo:
       {
         brandName: 'RESERVA',
         __typename: 'OrderformItemAdditionalInfoOutput',
       },
    __typename: 'OrderformItemOutput',
  };

  const idMock = '433083';

  const ditoIdMock = 'teste@usereserva.com';

  it('should call events with correct parameters', () => {
    EventProvider.logEvent('page_view', {
      item_brand: defaultBrand.picapau,
    });

    EventProvider.logEvent('add_to_cart', {
      item_id: idMock,
      item_price: (productMock?.price || 0) / 100,
      item_quantity: productMock?.quantity,
      item_category: 'product',
      currency: 'BRL',
      seller: productMock?.seller,
      item_brand: productMock?.additionalInfo.brandName,
    });

    EventProvider.sendTrackEvent('adicionou-produto-ao-carrinho', {
      id: ditoIdMock,
      action: 'adicionou-produto-ao-carrinho',
      data: {
        marca: productMock?.additionalInfo?.brandName || '',
        id_produto: idMock,
        nome_produto: productMock?.name || '',
        categorias_produto: Object.entries(productMock.productCategories)
          .map(([categoryId, categoryName]) => `${categoryId}: ${categoryName}`)
          .join(', '),
        tamanho: productMock.skuName.split(' - ')[1],
        cor: productMock.skuName.split(' - ')[0],
        preco_produto: (productMock.sellingPrice || 0) / 100,
        origem: 'app',
      },
    });
    expect(logEventSpy).toHaveBeenCalledTimes(2);
    expect(trackEventSpy).toHaveBeenCalled();
  });

  it('should call events with correct parameters', () => {
    expect(logEventSpy).toHaveBeenCalledWith('page_view', { item_brand: 'RESERVA,' });
    expect(logEventSpy).toHaveBeenCalledWith('add_to_cart', {
      currency: 'BRL', item_category: 'product', item_id: '433083', item_price: 429, item_quantity: 1, seller: '1', item_brand: 'RESERVA',
    });
    expect(trackEventSpy).toHaveBeenCalledWith('adicionou-produto-ao-carrinho', {
      action: 'adicionou-produto-ao-carrinho',
      data:
        {
          cor: 'BRANCO', id_produto: '433083', marca: 'RESERVA', categorias_produto: '0: Reserva, 1: Masculino, 2: polos', nome_produto: 'POLO PIQUET PIMA ENXUTO PICA-PAU OURO BRANCO - GGG', origem: 'app', preco_produto: 429, tamanho: 'GGG',
        },
      id: 'teste@usereserva.com',
    });
  });
});
