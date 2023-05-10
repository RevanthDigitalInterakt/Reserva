import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import type { DocumentNode } from 'graphql';
import {
  fireEvent,
  render, waitFor,
} from '@testing-library/react-native';
import { theme } from '@usereservaapp/reserva-ui';
import { ThemeProvider } from 'styled-components/native';
import { act } from '@testing-library/react-hooks';
import { InitialBagStoreDocument, InitialBagStoreQuery } from '../../../base/graphql/generated';
import { orderFormMock } from '../components/ProductList/__mocks__/productListMock';
import NewBag, { BagProps } from '../NewBag';
import 'react-native-gesture-handler/jestSetup';
import '../components/ProductList';
import * as useBagStore from '../../../zustand/useBagStore/useBagStore';
import CartContextProvider from '../../../context/CartContext';
import { mockCurrentOrderForm } from './__mocks__/mockCurrentOrderForm';

const mockNavigation: BagProps['navigation'] = {
  addListener: jest.fn(),
  canGoBack: jest.fn(),
  dangerouslyGetParent: jest.fn(),
  dangerouslyGetState: jest.fn(),
  dispatch: jest.fn(),
  goBack: jest.fn(),
  isFocused: jest.fn(),
  navigate: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  push: jest.fn(),
  removeListener: jest.fn(),
  replace: jest.fn(),
  reset: jest.fn(),
  setOptions: jest.fn(),
  setParams: jest.fn(),
  getParent: jest.fn(),
  getState: jest.fn(),
};

interface IApolloMock<T> {
  request: {
    query: DocumentNode,
    variables: object,
  },
  result: {
    data: T
  }
}

const apolloMocks: Array<IApolloMock<InitialBagStoreQuery>> = [
  {
    request: {
      query: InitialBagStoreDocument,
      variables: {},
    },
    result: {
      data: {
        orderForm: orderFormMock,
        __typename: 'Query',
      },
    },
  },
];

const mockedNavigate = jest.fn();
const mockGoBackFn = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockedNavigate, goBack: mockGoBackFn }),
}));

const Component = (
  <ThemeProvider theme={theme}>
    <MockedProvider mocks={apolloMocks} addTypename={false}>
      <CartContextProvider>
        <NewBag
          route={{
            name: 'BagScreen',
            params: { isProfileComplete: true, orderFormId: mockCurrentOrderForm.orderFormId },
            key: 'teste',
          }}
          navigation={mockNavigation}
        />
      </CartContextProvider>
    </MockedProvider>
  </ThemeProvider>
);

describe('NewBag', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should match with the snapshot', async () => {
    jest.spyOn(useBagStore, 'default').mockReturnValue({
      topBarLoading: false,
      bagInfos: {
        totalBagItems: 0,
      },
      bagInitialLoad: false,
      currentBagItems: [],
      currentOrderForm: null,
      shippingBar: {
        loading: false,
        sumPriceShipping: 0,
        totalDelivery: 0,
      },
      productNotFound: [],
      dispatch: jest.fn(),
      selectableGift: {
        showSelectableGift: false,
      },
    });

    const root = await waitFor(() => render(Component));
    expect(root.toJSON()).toMatchSnapshot();
  });

  it('should render empty bag if current items has no length', async () => {
    jest.spyOn(useBagStore, 'default').mockReturnValue({
      topBarLoading: false,
      bagInfos: {
        totalBagItems: 0,
        totalBagItemsPrice: 0,
        totalBagDiscountPrice: 0,
        totalBagDeliveryPrice: 0,
      },
      bagInitialLoad: false,
      currentBagItems: [],
      currentOrderForm: null,
      shippingBar: {
        loading: false,
        sumPriceShipping: 0,
        totalDelivery: 0,
      },
      productNotFound: [],
      dispatch: jest.fn(),
      selectableGift: {
        showSelectableGift: false,
      },
    });

    const root = await waitFor(() => render(Component));
    const emptyBag = root.getByTestId('com.usereserva:id/EmptyBag');
    expect(emptyBag).toBeOnTheScreen();
  });

  it('should call handleNavigateToOffers when the EmptyBag button is pressed', async () => {
    jest.spyOn(useBagStore, 'default').mockReturnValue({
      topBarLoading: false,
      bagInfos: {
        totalBagItems: 0,
        totalBagItemsPrice: 0,
        totalBagDiscountPrice: 0,
        totalBagDeliveryPrice: 0,
      },
      bagInitialLoad: false,
      currentBagItems: [],
      currentOrderForm: mockCurrentOrderForm,
      shippingBar: {
        loading: false,
        sumPriceShipping: 0,
        totalDelivery: 0,
      },
      productNotFound: [],
      dispatch: jest.fn(),
      selectableGift: {
        showSelectableGift: false,
      },
    });

    const root = await waitFor(() => render(Component));

    const goToOffersButton = root.getByTestId('com.usereserva:id/button_going_shopping_empty_bag');

    await act(async () => {
      await fireEvent.press(goToOffersButton);
    });

    expect(mockedNavigate).toHaveBeenCalledWith('Offers');
  });

  it('should render new bag if has items', async () => {
    jest.spyOn(useBagStore, 'default').mockReturnValue({
      topBarLoading: false,
      bagInfos: {
        totalBagItems: 0,
        totalBagItemsPrice: 0,
        totalBagDiscountPrice: 0,
        totalBagDeliveryPrice: 0,
      },
      bagInitialLoad: false,
      currentBagItems: [{
        productTitle: 'CAMISA ML SAMOA BRANCO',
        itemColor: 'BRANCO',
        itemSize: 'P',
        isGift: false,
        isGiftable: true,
        imageSource: 'https://lojausereserva.vteximg.com.br/arquivos/ids/6413946/0054128014_01.jpg?v=637692018478770000',
        key: '90368-39900-19929-19929-19929-1-1-camisa-ml-samoa-branco-p-',
        isAssinaturaSimples: false,
        priceWithDiscount: 199.29,
        discountPercent: 50,
        discountApi: 0,
        showFirstPurchaseDiscountMessage: null,
        showTotalDiscountFirstPurchaseValue: null,
        price: 27900,
        productId: '3239',
        id: '90368',
        listPrice: 39900,
        giftOfferingId: '90310',
        seller: '1',
        skuName: 'BRANCO - P',
        uniqueId: '52D9B57139FA4292909748AE8ED11774',
        isAddedAsGift: false,
        name: 'CAMISA ML SAMOA BRANCO - P',
        quantity: 1,
        disableCounter: false,
        sellingPrice: 19929,
      }],
      currentOrderForm: mockCurrentOrderForm,
      shippingBar: {
        loading: false,
        sumPriceShipping: 0,
        totalDelivery: 0,
      },
      productNotFound: [],
      dispatch: jest.fn(),
      selectableGift: {
        showSelectableGift: false,
      },
      couponInfo: {
        seller: {
          sellerName: '',
          sellerCode: '',
          sellerCouponError: false,
        },
        discount: {
          discountCode: '',
          discountCouponError: false,
        },
        installmentInfo: {
          installmentPrice: 0,
          installmentsNumber: 0,
          totalPrice: 0,
        },
      },
      getPriceWithDiscount: jest.fn().mockReturnValue(199.29000000000002),
      deleteProductModal: {
        show: false,
        deleteInfo: {
          product: [],
          index: 1,
        },
      },
      showLoadingModal: false,
    });

    const root = await waitFor(() => render(Component));

    const newBag = root.getByTestId('com.usereserva:id/NewBag');
    expect(newBag).toBeOnTheScreen();
  });

  it('should call handleBackTopBarButtonPress when topBarBackButton is pressed', async () => {
    jest.spyOn(useBagStore, 'default').mockReturnValue({
      topBarLoading: false,
      bagInfos: {
        totalBagItems: 0,
        totalBagItemsPrice: 0,
        totalBagDiscountPrice: 0,
        totalBagDeliveryPrice: 0,
      },
      bagInitialLoad: false,
      currentBagItems: [{
        productTitle: 'CAMISA ML SAMOA BRANCO',
        itemColor: 'BRANCO',
        itemSize: 'P',
        isGift: false,
        isGiftable: true,
        imageSource: 'https://lojausereserva.vteximg.com.br/arquivos/ids/6413946/0054128014_01.jpg?v=637692018478770000',
        key: '90368-39900-19929-19929-19929-1-1-camisa-ml-samoa-branco-p-',
        isAssinaturaSimples: false,
        priceWithDiscount: 199.29,
        discountPercent: 50,
        discountApi: 0,
        showFirstPurchaseDiscountMessage: null,
        showTotalDiscountFirstPurchaseValue: null,
        price: 27900,
        productId: '3239',
        id: '90368',
        listPrice: 39900,
        giftOfferingId: '90310',
        seller: '1',
        skuName: 'BRANCO - P',
        uniqueId: '52D9B57139FA4292909748AE8ED11774',
        isAddedAsGift: false,
        name: 'CAMISA ML SAMOA BRANCO - P',
        quantity: 1,
        disableCounter: false,
        sellingPrice: 19929,
      }],
      currentOrderForm: mockCurrentOrderForm,
      shippingBar: {
        loading: false,
        sumPriceShipping: 0,
        totalDelivery: 0,
      },
      productNotFound: [],
      dispatch: jest.fn(),
      selectableGift: {
        showSelectableGift: false,
      },
      couponInfo: {
        seller: {
          sellerName: '',
          sellerCode: '',
          sellerCouponError: false,
        },
        discount: {
          discountCode: '',
          discountCouponError: false,
        },
        installmentInfo: {
          installmentPrice: 0,
          installmentsNumber: 0,
          totalPrice: 0,
        },
      },
      getPriceWithDiscount: jest.fn().mockReturnValue(199.29000000000002),
      deleteProductModal: {
        show: false,
        deleteInfo: {
          product: [],
          index: 1,
        },
      },
      showLoadingModal: false,
    });

    const root = await waitFor(() => render(Component));

    const topBarBackButton = root.getAllByTestId('com.usereserva:id/top_bar_button_go_back');

    await act(async () => {
      await topBarBackButton.forEach((button) => fireEvent.press(button));
    });

    await waitFor(() => expect(mockGoBackFn).toBeCalled());
  });

  it('should render BagSkeleton and SkeletonBagFooter if bagInitialLoad is true and bag has item', async () => {
    jest.spyOn(useBagStore, 'default').mockReturnValue({
      topBarLoading: false,
      bagInfos: {
        totalBagItems: 0,
        totalBagItemsPrice: 0,
        totalBagDiscountPrice: 0,
        totalBagDeliveryPrice: 0,
      },
      bagInitialLoad: true,
      currentBagItems: [{
        productTitle: 'CAMISA ML SAMOA BRANCO',
        itemColor: 'BRANCO',
        itemSize: 'P',
        isGift: false,
        isGiftable: true,
        imageSource: 'https://lojausereserva.vteximg.com.br/arquivos/ids/6413946/0054128014_01.jpg?v=637692018478770000',
        key: '90368-39900-19929-19929-19929-1-1-camisa-ml-samoa-branco-p-',
        isAssinaturaSimples: false,
        priceWithDiscount: 199.29,
        discountPercent: 50,
        discountApi: 0,
        showFirstPurchaseDiscountMessage: null,
        showTotalDiscountFirstPurchaseValue: null,
        price: 27900,
        productId: '3239',
        id: '90368',
        listPrice: 39900,
        giftOfferingId: '90310',
        seller: '1',
        skuName: 'BRANCO - P',
        uniqueId: '52D9B57139FA4292909748AE8ED11774',
        isAddedAsGift: false,
        name: 'CAMISA ML SAMOA BRANCO - P',
        quantity: 1,
        disableCounter: false,
        sellingPrice: 19929,
      }],
      currentOrderForm: null,
      shippingBar: {
        loading: false,
        sumPriceShipping: 0,
        totalDelivery: 0,
      },
      productNotFound: [],
      dispatch: jest.fn(),
      selectableGift: {
        showSelectableGift: false,
      },
      couponInfo: {
        seller: {
          sellerName: '',
          sellerCode: '',
          sellerCouponError: false,
        },
        discount: {
          discountCode: '',
          discountCouponError: false,
        },
        installmentInfo: {
          installmentPrice: 0,
          installmentsNumber: 0,
          totalPrice: 0,
        },
      },
      getPriceWithDiscount: jest.fn().mockReturnValue(199.29000000000002),
      deleteProductModal: {
        show: false,
        deleteInfo: {
          product: [],
          index: 1,
        },
      },
      showLoadingModal: false,
    });

    const root = await render(Component);

    const bagSkeleton = root.getByTestId('com.usereserva:id/BagSkeleton');
    const skeletonBagFooter = root.getByTestId('com.usereserva:id/skeletonBagFooter_bag');

    expect(bagSkeleton).toBeOnTheScreen();
    expect(skeletonBagFooter).toBeOnTheScreen();
  });

  it('should render NotFoundProduct if bagInitialLoad is false and productNotFound has a length', async () => {
    jest.spyOn(useBagStore, 'default').mockReturnValue({
      topBarLoading: false,
      bagInfos: {
        totalBagItems: 0,
        totalBagItemsPrice: 0,
        totalBagDiscountPrice: 0,
        totalBagDeliveryPrice: 0,
      },
      bagInitialLoad: false,
      currentBagItems: [{
        productTitle: 'CAMISA ML SAMOA BRANCO',
        itemColor: 'BRANCO',
        itemSize: 'P',
        isGift: false,
        isGiftable: true,
        imageSource: 'https://lojausereserva.vteximg.com.br/arquivos/ids/6413946/0054128014_01.jpg?v=637692018478770000',
        key: '90368-39900-19929-19929-19929-1-1-camisa-ml-samoa-branco-p-',
        isAssinaturaSimples: false,
        priceWithDiscount: 199.29,
        discountPercent: 50,
        discountApi: 0,
        showFirstPurchaseDiscountMessage: null,
        showTotalDiscountFirstPurchaseValue: null,
        price: 27900,
        productId: '3239',
        id: '90368',
        listPrice: 39900,
        giftOfferingId: '90310',
        seller: '1',
        skuName: 'BRANCO - P',
        uniqueId: '52D9B57139FA4292909748AE8ED11774',
        isAddedAsGift: false,
        name: 'CAMISA ML SAMOA BRANCO - P',
        quantity: 1,
        disableCounter: false,
        sellingPrice: 19929,
      }],
      currentOrderForm: mockCurrentOrderForm,
      shippingBar: {
        loading: false,
        sumPriceShipping: 0,
        totalDelivery: 0,
      },
      productNotFound: 'Produto não Encontrado',
      dispatch: jest.fn(),
      selectableGift: {
        showSelectableGift: false,
      },
      couponInfo: {
        seller: {
          sellerName: '',
          sellerCode: '',
          sellerCouponError: false,
        },
        discount: {
          discountCode: '',
          discountCouponError: false,
        },
        installmentInfo: {
          installmentPrice: 0,
          installmentsNumber: 0,
          totalPrice: 0,
        },
      },
      getPriceWithDiscount: jest.fn().mockReturnValue(199.29000000000002),
      deleteProductModal: {
        show: false,
        deleteInfo: {
          product: [],
          index: 1,
        },
      },
      showLoadingModal: false,
    });

    const root = await waitFor(() => render(Component));

    const notFoundProduct = root.getByTestId('com.usereserva:id/NotFoundProduct_container');
    expect(notFoundProduct).toBeOnTheScreen();
  });

  it('should render bag itens details if bagInitialLoad is false', async () => {
    jest.spyOn(useBagStore, 'default').mockReturnValue({
      topBarLoading: false,
      bagInfos: {
        totalBagItems: 0,
        totalBagItemsPrice: 0,
        totalBagDiscountPrice: 0,
        totalBagDeliveryPrice: 0,
      },
      bagInitialLoad: false,
      currentBagItems: [{
        productTitle: 'CAMISA ML SAMOA BRANCO',
        itemColor: 'BRANCO',
        itemSize: 'P',
        isGift: false,
        isGiftable: true,
        imageSource: 'https://lojausereserva.vteximg.com.br/arquivos/ids/6413946/0054128014_01.jpg?v=637692018478770000',
        key: '90368-39900-19929-19929-19929-1-1-camisa-ml-samoa-branco-p-',
        isAssinaturaSimples: false,
        priceWithDiscount: 199.29,
        discountPercent: 50,
        discountApi: 0,
        showFirstPurchaseDiscountMessage: null,
        showTotalDiscountFirstPurchaseValue: null,
        price: 27900,
        productId: '3239',
        id: '90368',
        listPrice: 39900,
        giftOfferingId: '90310',
        seller: '1',
        skuName: 'BRANCO - P',
        uniqueId: '52D9B57139FA4292909748AE8ED11774',
        isAddedAsGift: false,
        name: 'CAMISA ML SAMOA BRANCO - P',
        quantity: 1,
        disableCounter: false,
        sellingPrice: 19929,
      }],
      currentOrderForm: null,
      shippingBar: {
        loading: false,
        sumPriceShipping: 0,
        totalDelivery: 0,
      },
      productNotFound: [],
      dispatch: jest.fn(),
      selectableGift: {
        showSelectableGift: false,
      },
      couponInfo: {
        seller: {
          sellerName: '',
          sellerCode: '',
          sellerCouponError: false,
        },
        discount: {
          discountCode: '',
          discountCouponError: false,
        },
        installmentInfo: {
          installmentPrice: 0,
          installmentsNumber: 0,
          totalPrice: 0,
        },
      },
      getPriceWithDiscount: jest.fn().mockReturnValue(199.29000000000002),
      deleteProductModal: {
        show: false,
        deleteInfo: {
          product: [],
          index: 1,
        },
      },
      showLoadingModal: false,
    });

    const root = await waitFor(() => render(Component));

    const bagItensDetails = root.getByTestId('com.usereserva:id/BagItensDetails');

    expect(bagItensDetails).toBeOnTheScreen();
  });

  it('should render bagFooter if bagInitialLoad is false and currentBagItems has items',
    async () => {
      jest.spyOn(useBagStore, 'default').mockReturnValue({
        topBarLoading: false,
        bagInfos: {
          totalBagItems: 0,
          totalBagItemsPrice: 0,
          totalBagDiscountPrice: 0,
          totalBagDeliveryPrice: 0,
        },
        bagInitialLoad: false,
        currentBagItems: [{
          productTitle: 'CAMISA ML SAMOA BRANCO',
          itemColor: 'BRANCO',
          itemSize: 'P',
          isGift: false,
          isGiftable: true,
          imageSource: 'https://lojausereserva.vteximg.com.br/arquivos/ids/6413946/0054128014_01.jpg?v=637692018478770000',
          key: '90368-39900-19929-19929-19929-1-1-camisa-ml-samoa-branco-p-',
          isAssinaturaSimples: false,
          priceWithDiscount: 199.29,
          discountPercent: 50,
          discountApi: 0,
          showFirstPurchaseDiscountMessage: null,
          showTotalDiscountFirstPurchaseValue: null,
          price: 27900,
          productId: '3239',
          id: '90368',
          listPrice: 39900,
          giftOfferingId: '90310',
          seller: '1',
          skuName: 'BRANCO - P',
          uniqueId: '52D9B57139FA4292909748AE8ED11774',
          isAddedAsGift: false,
          name: 'CAMISA ML SAMOA BRANCO - P',
          quantity: 1,
          disableCounter: false,
          sellingPrice: 19929,
        }],
        currentOrderForm: mockCurrentOrderForm,
        shippingBar: {
          loading: false,
          sumPriceShipping: 0,
          totalDelivery: 0,
        },
        productNotFound: 'Produto não Encontrado',
        dispatch: jest.fn(),
        selectableGift: {
          showSelectableGift: false,
        },
        couponInfo: {
          seller: {
            sellerName: '',
            sellerCode: '',
            sellerCouponError: false,
          },
          discount: {
            discountCode: '',
            discountCouponError: false,
          },
          installmentInfo: {
            installmentPrice: 0,
            installmentsNumber: 0,
            totalPrice: 0,
          },
        },
        getPriceWithDiscount: jest.fn().mockReturnValue(199.29000000000002),
        deleteProductModal: {
          show: false,
          deleteInfo: {
            product: [],
            index: 1,
          },
        },
        showLoadingModal: false,
      });

      const root = await waitFor(() => render(Component));

      const bagFooterButton = root.getByTestId('com.usereserva:id/bag_button_go_to_delivery');
      expect(bagFooterButton).toBeOnTheScreen();
    });
});
