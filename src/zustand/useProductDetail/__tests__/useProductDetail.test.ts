import { renderHook } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import { useProductDetailStore } from '../useProductDetail';
import type { ProductQuery } from '../../../base/graphql/generated';

const PRODUCT_DETAIL_MOCK: ProductQuery['product'] = {
  initialColor: {
    colorId: '1',
    colorUrl: 'color',
    disabled: false,
    images: ['image'],
    sizes: [{
      availableQuantity: 999,
      currentPrice: 10,
      disabled: false,
      discountPercent: 0,
      ean: 'ean',
      hasDiscount: false,
      installment: {
        number: 1,
        value: 10,
      },
      listPrice: 10,
      itemId: '1',
      seller: 'seller',
      size: 'M',
    },
    {
      availableQuantity: 999,
      currentPrice: 20,
      disabled: false,
      discountPercent: 0,
      ean: 'ean',
      hasDiscount: false,
      installment: {
        number: 1,
        value: 20,
      },
      listPrice: 20,
      itemId: '2',
      seller: 'seller',
      size: 'G',
    },
    ],
  },
  initialSize: {
    availableQuantity: 999,
    currentPrice: 10,
    disabled: false,
    discountPercent: 0,
    ean: 'ean',
    hasDiscount: false,
    installment: {
      number: 1,
      value: 10,
    },
    listPrice: 10,
    itemId: '1',
    seller: 'seller',
    size: 'M',
  },
  categoryTree: ['category'],
  colorUrls: [{
    id: '1',
    url: 'color',
  },
  {
    id: '2',
    url: 'color',
  },
  ],
  disabledColors: [],
  priceRange: {
    listPrice: {
      highPrice: 10,
      lowPrice: 10,
    },
    sellingPrice: {
      highPrice: 10,
      lowPrice: 10,
    },
  },
  productId: '1',
  productName: 'name',
  properties: {

  },
  saleOff: true,
  share: {
    title: 'title',
    message: 'message',
    url: 'url',
  },
  colors: [{
    colorId: '1',
    colorUrl: 'color',
    disabled: false,
    images: ['image'],
    sizes: [{
      availableQuantity: 999,
      currentPrice: 10,
      disabled: false,
      discountPercent: 0,
      ean: 'ean',
      hasDiscount: false,
      installment: {
        number: 1,
        value: 10,
      },
      listPrice: 10,
      itemId: '1',
      seller: 'seller',
      size: 'M',
    },
    {
      availableQuantity: 999,
      currentPrice: 20,
      disabled: false,
      discountPercent: 0,
      ean: 'ean',
      hasDiscount: false,
      installment: {
        number: 1,
        value: 20,
      },
      listPrice: 20,
      itemId: '2',
      seller: 'seller',
      size: 'G',
    },
    ],
  },
  {
    colorId: '2',
    colorUrl: 'color',
    disabled: false,
    images: ['image'],
    sizes: [{
      availableQuantity: 999,
      currentPrice: 10,
      disabled: false,
      discountPercent: 0,
      ean: 'ean',
      hasDiscount: false,
      installment: {
        number: 1,
        value: 10,
      },
      listPrice: 10,
      itemId: '1',
      seller: 'seller',
      size: 'M',
    },
    {
      availableQuantity: 999,
      currentPrice: 20,
      disabled: false,
      discountPercent: 0,
      ean: 'ean',

      hasDiscount: false,
      installment: {
        number: 1,
        value: 20,
      },
      listPrice: 20,
      itemId: '2',
      seller: 'seller',
      size: 'G',
    },
    ],
  },
  ],
};

describe('useProductDetail', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useProductDetailStore([
      'assinaturaSimples',
      'initialCep',
      'productDetail',
      'resetProduct',
      'selectedColor',
      'selectedSize',
      'setProduct',
      'setSelectedColor',
      'setSelectedSize',
    ]));
    expect(result.current.productDetail).toEqual(null);
    expect(result.current.selectedColor).toEqual(null);
    expect(result.current.selectedSize).toEqual(null);
    expect(result.current.initialCep).toEqual('');
    expect(result.current.assinaturaSimples).toEqual({
      accepted: true,
      onToggleAccept: expect.any(Function),
    });
    expect(result.current.resetProduct).toEqual(expect.any(Function));
    expect(result.current.setProduct).toEqual(expect.any(Function));
    expect(result.current.setSelectedColor).toEqual(expect.any(Function));
    expect(result.current.setSelectedSize).toEqual(expect.any(Function));
  });
  it('should update productDetail when setProduct is called', () => {
    const { result } = renderHook(() => useProductDetailStore(['productDetail', 'setProduct']));
    act(() => { result.current.setProduct(PRODUCT_DETAIL_MOCK); });
    expect(result.current.productDetail).toEqual(PRODUCT_DETAIL_MOCK);
  });
  it('should update selectedColor when setSelectedColor is called', () => {
    const { result } = renderHook(() => useProductDetailStore(['selectedColor', 'setSelectedColor', 'setProduct']));
    act(() => result.current.setProduct(PRODUCT_DETAIL_MOCK));
    act(() => result.current.setSelectedColor('2'));
    expect(result.current.selectedColor?.colorId).toEqual('2');
  });
  it('should update selectedSize when setSelectedSize is called', () => {
    const { result } = renderHook(() => useProductDetailStore(['selectedSize', 'setSelectedSize', 'setProduct', 'sizeIsSelected']));
    act(() => result.current.setProduct(PRODUCT_DETAIL_MOCK));
    act(() => result.current.setSelectedSize('G'));
    expect(result.current.selectedSize?.size).toEqual('G');
    expect(result.current.sizeIsSelected).toEqual(true);
  });
  it('should update initialCep when a cep is passed to setProduct', () => {
    const { result } = renderHook(() => useProductDetailStore(['initialCep', 'setProduct']));
    act(() => result.current.setProduct(PRODUCT_DETAIL_MOCK, { colorSelected: '1', sizeSelected: 'M', hasCep: '12345678' }));
    expect(result.current.initialCep).toEqual('12345678');
  });
  it('should reset productDetail when resetProduct is called', () => {
    const { result } = renderHook(() => useProductDetailStore(['productDetail', 'resetProduct', 'setProduct']));
    act(() => result.current.setProduct(PRODUCT_DETAIL_MOCK));
    act(() => result.current.resetProduct());
    expect(result.current.productDetail).toEqual(null);
  });
  it('should return a accepted assinaturaSimples onToggleAccept', () => {
    const { result } = renderHook(() => useProductDetailStore(['assinaturaSimples']));
    act(() => result.current.assinaturaSimples.onToggleAccept());
    expect(result.current.assinaturaSimples.accepted).toEqual(false);
  });
  it('should set drawer when setDrawerIsOpen is called', () => {
    const { result } = renderHook(() => useProductDetailStore(['drawerIsOpen', 'setDrawerIsOpen']));
    act(() => result.current.setDrawerIsOpen(true));
    expect(result.current.drawerIsOpen).toEqual(true);
  });
  it('should get disabled sizes when getDisabledSizes is called', () => {
    const { result } = renderHook(() => useProductDetailStore(['productDetail', 'getDisabledSizes', 'setProduct']));
    act(() => result.current.setProduct(PRODUCT_DETAIL_MOCK));
    const disabledSizes = result.current.getDisabledSizes();
    expect(disabledSizes).toEqual([]);
  });
  it('should get sizes when getSizes is called', () => {
    const { result } = renderHook(() => useProductDetailStore(['productDetail', 'getSizes', 'setProduct']));
    act(() => result.current.setProduct(PRODUCT_DETAIL_MOCK));
    const sizes = result.current.getSizes();
    expect(sizes).toEqual(['M', 'G']);
  });
});
